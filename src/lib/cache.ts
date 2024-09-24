import { createClient } from 'redis';

import * as dotenv from 'dotenv'
import { CourseInfoSchema, ProfessorSchema, type CourseInfoType, type ProfInfoType } from './api/data';
dotenv.config()

export const cachingEnabled = Boolean(process.env.REDIS_PASSWORD && process.env.REDIS_PASSWORD.trim().length > 0);

if(!cachingEnabled) {
    console.error("CACHING IS DISABLED")
}

const client = createClient({
    password: process.env.REDIS_PASSWORD
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
    client.set('course:22f:' + course.subject_prefix + course.course_number, JSON.stringify(course)).then(() => {});
    // sets expiration date for one week 
    client.expireAt('course:22f:' + course.subject_prefix + course.course_number, Math.floor(Date.now() / 1000) + (86400 * 7));
    return course;
} 

export async function getCacheCourse(courseID: string): Promise<CourseInfoType | null> {
    let courseStr = await client.get('course:22f:' + courseID);
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
    // sets expiration date for one week
    client.expireAt('professors:22f:' + courseID, Math.floor(Date.now() / 1000) + (86400 * 7));
    client.set('professors:22f:' + courseID, JSON.stringify(professors)).then(() => {});
    return professors;
} 

export async function getCacheProfs(courseID: string): Promise<ProfInfoType[] | null> {
    let profStr = await client.get('professors:22f:' + courseID);
    if(!profStr) {
        return null;
    }
    return ProfessorSchema.array().parse(JSON.parse(profStr));
}

await client.connect();