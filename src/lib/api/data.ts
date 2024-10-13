import { z } from "zod"
import { request, gql } from 'graphql-request'

import sqlite3 from 'sqlite3'
import fs from "node:fs";

import * as dotenv from 'dotenv'
import { cacheCourse, cacheProfessors, cachingEnabled, client, getCacheCourse, getCacheProfs } from "$lib/cache";
dotenv.config()

// RateMyProfessor Data

export const ProfRatingsSchema = z.object({
  avgDifficulty: z.number(),
  avgRatingRounded: z.number(),
  firstName: z.string(),
  id: z.string(),
  lastName: z.string(),
  legacyId: z.number(),
  numRatings: z.number(),
  ratingsDistribution: z.object({ total: z.number() }),
  wouldTakeAgainPercentRounded: z.number()
});

export type ProfRatingsType = z.infer<typeof ProfRatingsSchema>;

const rmpHeaders = {
    "Authorization": "Basic dGVzdDp0ZXN0"
}

export async function getProfessorRating(name: string): Promise<ProfRatingsType | undefined> {
    const query = gql` 
        query searchByName($name: String!) {
            newSearch {
                teachers(query:{text: $name, schoolID:"U2Nob29sLTEyNzM="}) {
                    resultCount
                    edges {
                        node {
                            id
                            firstName
                            lastName
                            avgDifficulty
                            avgRatingRounded
                            wouldTakeAgainPercentRounded
                            numRatings
                            legacyId

                            ratingsDistribution {
                                total
                            }
                        }
                    }
                }
            }
        }
    `
    const data : any = await request("https://www.ratemyprofessors.com/graphql", query, { name }, rmpHeaders);
    const count = data?.newSearch?.teachers?.resultCount ?? 0;
    if (count == 0) {
        console.log("Professor does not exist.");
        return undefined;
    }
    const profData = data.newSearch.teachers.edges[0];
    return ProfRatingsSchema.parse(profData.node);
}

// getProfessorData("Jason Smith")

// Local Grades Data
console.log("Does the grades db exist? ", fs.existsSync("./grades/grades.db"))

// better-sqlite3
// const file = fs.readFileSync("./grades/grades.db");
// const db = new sqlite3.Database(file);
const db = new sqlite3.Database("./grades/grades.db");
// db.pragma('journal_mode = WAL'); // No need for WAL since we do all reads and no writes.

// Promisify the db.all method for easier async/await usage
import { promisify } from 'util';
const dbAll = promisify(db.all).bind(db);

const query = "SELECT SUM(average) / count(average) AS average FROM classes JOIN class_professor ON classes.id = class_professor.class_id where professor_id = (SELECT id FROM professors WHERE first_name LIKE ? AND last_name Like ?) AND count != 0;"

// Fixes a bug where it uses last and first word to get professor grades.
function getLastWord(str: string): string {
    const words = str.trim().split(/\s+/);
    return words[words.length - 1];
}

function getFirstWord(str: string): string {
    const words = str.trim().split(/\s+/);
    return words[0];
}

export async function getProfessorAvg(first: string, last: string): Promise<number | null> {
    console.log(first, last)
    try {
        const rows: Array<{ average: number }> = await dbAll(query, [getFirstWord(first), getLastWord(last)]);
        if (rows.length !== 0 && rows[0].average !== null) {
            return rows[0].average;
        }
        return null;
    } catch (error) {
        console.error("Error fetching professor average:", error);
        return null;
    }
}

// console.log(getProfessorAvg("Jason", "Smith"))

// UTD Nebula Data

if(!process.env.API_KEY) {
    throw new Error("Missing Api Key!")
}

const nebulaHeaders : RequestInit = {
    method: "GET",
    headers: {
        "x-api-key": process.env.API_KEY,
        "Accept": 'application/json',
    },
    // mode: "no-cors"
}

export const CourseInfoSchema = z.object({
    _id: z.string(),
    subject_prefix: z.string(),
    course_number: z.string(),
    title: z.string(),
    credit_hours: z.string(),
    class_level: z.string().nullish(),
    activity_type: z.string().nullish(),
    description: z.string(),
    offering_frequency: z.string().nullish()
});

export type CourseInfoType = z.infer<typeof CourseInfoSchema>;

export async function getCourseInfo(section: string, number: string) : Promise<undefined | null | CourseInfoType> {
    const res = await fetch(`https://api.utdnebula.com/course?subject_prefix=${section}&course_number=${number}&catalog_year=24`, nebulaHeaders);
    const json = await res.json();
    if(json.status === 200) {
        if(json.data && json.data.length > 0) {
            return CourseInfoSchema.parse(json.data[0]);
        } else {
            return null;
        }
    } else {
        console.error(json);
        return undefined;
    }
}

export async function fetchCourse(section: string, number: string): Promise<CourseInfoType | null | undefined> {
    if(!cachingEnabled || !client.isReady) {
        console.warn("Caching Disabled")
        return await getCourseInfo(section, number);
    }
    const cache = await getCacheCourse(section + number);
    if(!cache) {
        const res = await getCourseInfo(section, number);
        if(res == null) {
            return null;
        } 
        cacheCourse(res);
        return res;
    }
    return cache;
}


// Likely should zod safe parse the data here to ensure we are either returning profIntoType array, or null. 
export async function getProfessors(courseID: string, season: string): Promise<undefined | null | ProfInfoType[]> {
    // https://www.utdnebula.com/docs/maintainers/Nebula%20API/Endpoints/section#example-response
    // TODO session is hardcoded, might be better to dynamically figure out what is the next season based off of date. 
    const res = await fetch(`https://api.utdnebula.com/section?course_reference=${courseID}&academic_session.name=${season}`, nebulaHeaders);
    const json = await res.json(); 
    if(json.status !== 200) {
        console.error(json);
        return undefined;
    }
    if(json.data === null) {
        return null;
    }
    let profIds : string[] = json.data.map((section: any) => section.professors[0]);
    // Remove duplicate professors from each section
    profIds = [...new Set(profIds)];
    // Filter empty professors.
    profIds = profIds.filter(id => !!id);

    const profsData = await Promise.all(profIds.map(id => getProfessorData(id)));
    const profsDataFiltered = profsData.filter(data => !!data) as ProfInfoType[];
    const [profRMP, profGrades] = await Promise.all([
        await Promise.all(profsData.map(data => data ? getProfessorRating(`${data.first_name} ${data.last_name}`) : undefined)),
        await Promise.all(profsData.map(data => data ? getProfessorAvg(data.first_name, data.last_name) : null))
    ]);
    const resData = profsDataFiltered.map((data, i) => {return {...data, rmp: profRMP[i], avgGrade: profGrades[i]}});
    return resData.sort((prof1, prof2) => {
        const prof1r = prof1?.rmp?.avgRatingRounded ? Number(prof1.rmp.avgRatingRounded) : -100;
        const prof2r = prof2?.rmp?.avgRatingRounded ? Number(prof2.rmp.avgRatingRounded) : -100;
        // console.log(prof1.full_name, prof1?.rmp?.avgRatingRounded, prof2.full_name, prof2?.rmp?.avgRatingRounded, prof2r - prof1r);
        return prof2r - prof1r;
    });
}

export async function fetchProfs(courseID: string): Promise<ProfInfoType[] | null | undefined> {
    if(!cachingEnabled || !client.isReady) {
        console.warn("Caching Disabled")
        return await getProfessors(courseID, '24F');
    }
    const cache = await getCacheProfs(courseID);
    if(!cache) {
        const res = await getProfessors(courseID, '24F');
        // console.log(res)
        if(res == null) {
            return null;
        } 
        cacheProfessors(courseID, res);
        return res;
    }
    return cache;
}


export const ProfessorSchema = z.object({
    _id: z.string(),
    email: z.string(),
    first_name: z.string(),
    image_uri: z.string().nullish(),
    last_name: z.string(),
    office: z.object({
      building: z.string().nullish(),
      room: z.string().nullish(),
      map_uri: z.string().nullish()
    }).nullish(),
    office_hours: z.array(
      z.object({
        start_date: z.string().nullish(),
        end_date: z.string().nullish(),
        meeting_days: z.array(z.string()).nullish(),
        start_time: z.string().nullish(),
        end_time: z.string().nullish(),
        modality: z.string().nullish(),
        location: z.object({
          building: z.string().nullish(),
          room: z.string().nullish(),
          map_uri: z.string().nullish()
        }).nullish()
      }).nullish()
    ).nullish(),
    phone_number: z.string().nullish(),
    profile_uri: z.string().nullish(),
    sections: z.array(z.string()).nullish(),
    titles: z.array(z.string()).nullish(),
    // Additional
    rmp: ProfRatingsSchema.optional(),
    avgGrade: z.number().nullish()
});

export type ProfInfoType = z.infer<typeof ProfessorSchema>;

export async function getProfessorData(profID: string): Promise<ProfInfoType | null | undefined> {
    // console.log(profID)
    const res = await fetch(`https://api.utdnebula.com/professor/${profID}`, nebulaHeaders);
    const json = await res.json();
    // console.log(json)
    if(json.status === 200) {
        if(json.data === null) {
            return null;
        }
        return ProfessorSchema.parse(json.data);
    } else {
        console.error(profID, json);
        return undefined;
    }
}

