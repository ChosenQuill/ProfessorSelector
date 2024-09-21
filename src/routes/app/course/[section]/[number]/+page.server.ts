// import { dev } from '$app/environment';

// // we don't need any JS on this page, though we'll load
// // it in dev so that we get hot module replacement
// export const csr = dev;

// // since there's no dynamic data here, we can prerender
// // it so that it gets served as a static asset in production
// export const prerender = true;

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { getCourseInfo, getProfessors } from '$lib/api/data';
import { getNextSemester } from '$lib/helper';

// Simple memory caching, should use a redis database or sql server in production. 
const cache = {}

export const load: PageServerLoad = async ({ params, url }) => {
    if(!Number.isInteger(params.number)) {
        error(404, 'Not Found')
    }

    const courseStr = String(params.section + params.number);
	const course = !Object.hasOwn(cache, courseStr) ? await getCourseInfo(params.section, params.number) : cache[courseStr];
    console.log("COURSE" + course)

	if (course == null) {
        error(404, 'Not found');
        console.log("Errored")
        return;
	}

    return {
        course,
        professors: getProfessors(course?._id, url.searchParams.get('semester') || getNextSemester())
    }

};


export { }