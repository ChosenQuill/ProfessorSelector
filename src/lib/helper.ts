import { semester as storedSemester, courses as storedCourses } from "./storage";
import { get } from 'svelte/store';
import { addToast } from "./toasts";
import type { CourseInfoType } from "./api/data";

export function getNextSemester() : string {
    return '24F';
}

export function getCourseId(subject: string, number: string, semester?: string): string | null {
    semester ??= get(storedSemester);
    const courses = get(storedCourses);
    const filtered = Object.values(courses[semester]).filter(course => course.info.subject_prefix === subject && course.info.course_number === number)
    if(filtered.length >= 1) {
        return filtered[0].info._id;
    }
    return null;
    // TODO complete function. It should check our storage to see if the class exists, else, it will fetch the course info. 
}

export async function fetchCourseId(subject: string, number: string, semester?: string): Promise<string | null> {
    const id = getCourseId(subject, number, semester);
    if(id !== null) {
        return id;
    }
    const res = await fetch(`/api/course/${subject}/${number}?semester=${semester}`);
    // NOTE semester functionality isn't working anyways
    
    if(res.status !== 200) {
        if (res.status == 400) {
            addToast({ type: 'error', text: "The course you entered doesn't exist." });
        } else {
            addToast({ type: 'error', text: "Can't get course data. (UTD Nebula might be down)" });
        }
        return null;
    }
    const course : CourseInfoType = await res.json();
    return course._id;
}