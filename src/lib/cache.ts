import { createClient } from 'redis';

import * as dotenv from 'dotenv'
import { CourseInfoSchema, ProfessorSchema, type CourseInfoType, type ProfInfoType } from './api/data';
dotenv.config()

export let cachingEnabled = Boolean(process.env.REDIS_URL && process.env.REDIS_URL.trim().length > 0);

if(!cachingEnabled) {
    console.error("CACHING IS DISABLED")
}

export const client = createClient({
    url: process.env.REDIS_URL
});

client.on('connect', () => {
    console.log('Connected to Redis...');
});

client.on('error', err => {
    console.log('Redis Client Error', err);
});

// This system is designed to not cache null values, as caching every course request that comes in can easily lead to memory exhaustin/DOS. 
// This system can be further improved by implenting a client-side whitelist, and maintaining a list of all available utd courses.  

export function cacheCourse(course: CourseInfoType) : CourseInfoType {
    if(CourseInfoSchema.safeParse(course).success == false) {
        console.error("Course does not match schema, not cached.", course)
        return course;
    }
    client.set('course:24F:' + course.subject_prefix + course.course_number, JSON.stringify(course)).then(() => {});
    // sets expiration date for one week 
    // Disabled for demo purposes
    // client.expireAt('course:24F:' + course.subject_prefix + course.course_number, Math.floor(Date.now() / 1000) + (86400 * 7));
    return course;
} 

export async function getCacheCourse(courseID: string): Promise<CourseInfoType | null> {
    let courseStr = await client.get('course:24F:' + courseID);
    if(!courseStr) {
        return null;
    }
    return CourseInfoSchema.parse(JSON.parse(courseStr));
}


export function cacheProfessors(courseID: string, professors: ProfInfoType[]) : ProfInfoType[] {
    if(ProfessorSchema.array().safeParse(professors).success == false) {
        console.error("Professors does not match schema, not cached.", professors)
        return professors;
    }
    client.set('professors:24F:' + courseID, JSON.stringify(professors)).then(() => {});
    // sets expiration date for one week
    // Disabled for demo purposes
    // client.expireAt('professors:24F:' + courseID, Math.floor(Date.now() / 1000) + (86400 * 7));
    return professors;
} 

export async function getCacheProfs(courseID: string): Promise<ProfInfoType[] | null> {
    let profStr = await client.get('professors:24F:' + courseID);
    if(!profStr) {
        return null;
    }
    return ProfessorSchema.array().parse(JSON.parse(profStr));
}

if(cachingEnabled) {
    client.connect().catch(e => {
        console.error(e);
        cachingEnabled = false;
    });
}