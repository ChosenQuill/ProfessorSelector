// import { dev } from '$app/environment';

// // we don't need any JS on this page, though we'll load
// // it in dev so that we get hot module replacement
// export const csr = dev;

// // since there's no dynamic data here, we can prerender
// // it so that it gets served as a static asset in production
// export const prerender = true;

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { fetchCourse, fetchProfs} from '$lib/api/data';
import { getNextSemester } from '$lib/helper';


export const load: PageServerLoad = async ({ params, url }) => {
    if(!/\d+/g.test(params.number)) {
        console.log("Invalid Course Param");
        error(404, 'Not Found');
    }

	const course = await fetchCourse(params.section, params.number);

	if (course == null) {
        error(404, 'Not found');
	}

    // Removed check for semester. 
    return {
        course,
        professors: fetchProfs(course?._id)
    }

};


export { }