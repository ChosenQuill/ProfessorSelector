import { error, json } from '@sveltejs/kit';
import headers from '$lib/headers'

// async function getCourseData(cid) {
//     const res = await fetch(`https://api.utdnebula.com/course/${cid}`, headers);
//     const json = await res.json();
//     return json.data;
// }

// async function getCourseData(section, number) {
//     const res = await fetch(`https://api.utdnebula.com/course?subject_prefix=${section}&course_number=${number}`, headers);
//     const json = await res.json();
//     return json.data;
// }


/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const { section, number } = params;
    try {
        // const [course, professors] = await Promise.all([getCourseData(cid), getProfessorData(cid)]);
        // return new Response(JSON.stringify({course, professors}));
        const res = await fetch(`https://api.utdnebula.com/course?subject_prefix=${section}&course_number=${number}`, headers);
        const rjson = await res.json();
        if (!rjson?.data || rjson.data.length == 0) {
            return json(null, { status: rjson.status })
        }
        console.log("call to course data")
        return json(rjson.data[0], { status: rjson.status, headers: { 'cache-control': 'public, max-age=2592000' } });
    } catch (e) {
        console.error(e)
        throw error(500, 'Internal Server Error');
    }
}