import type { ProfInfoType, CourseInfoType } from './api/data';
import { persisted } from 'svelte-persisted-store'
import { getNextSemester } from './helper';

interface Roster {
    [semester: string]: {
        [courseId: string]: string[] // array of professor ids
    }
}

export const Router = persisted<Roster>('roster', {});


// Using Svelte Persisted Store Removes this boilerplate, and it also adds cross tab support. 
// const initialRoster = browser ? JSON.parse(window.localStorage.getItem('roster') || '{}') : {};
// export const roster = writable<Roster>(initialRoster);
// roster.subscribe((val) => {
//   if (browser) {
//     window.localStorage.setItem('roster', JSON.stringify(val));
//   }
// });

interface Courses {
    [semester: string]: {
        [courseId: string] : {
            info: CourseInfoType
            professors: ProfInfoType[]
            roster: boolean
        }
    }
}

export const courses = persisted<Courses>('courses', {'22F': {}});

export const semester = persisted<string>('semester', '22F');
