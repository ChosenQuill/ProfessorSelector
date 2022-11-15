import { error } from '@sveltejs/kit';
import { getProfessorRating } from './index'
import headers from '$lib/headers'
import { validate_each_argument } from 'svelte/internal';


async function getProfessorData(cid) {
    const res = await fetch(`https://api.utdnebula.com/section?course_reference=${cid}&academic_session.name=22S`, headers);
    const json = await res.json();
    const profIds = json.data.map(el => el.professors[0]);
    let profData = await Promise.all(profIds.map(id => fetch("https://api.utdnebula.com/professor/" + id, headers).then(res => res.json())));
    profData = profData.map(json => json.data);
    profData = profData.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t._id == value._id
        ))).map(data => {
            data.full_name = data.first_name + " " + data.last_name;
            return data
        })
    let profRMP = await Promise.all(profData.map(data => getProfessorRating(data.full_name)));
    profRMP.forEach((rmp, i) => profData[i].rmp = rmp);
    // profData = profData.filter((prof) => (prof.rmp.avgRatingRounded));
    profData = profData.sort((prof1, prof2) => {
        const prof1r = prof1.rmp ? Number(prof1.rmp.avgRatingRounded) : -1
        const prof2r = prof2.rmp ? Number(prof2.rmp.avgRatingRounded) : -1
        return prof2r - prof1r;
    });
    return profData;
}

// async function getCourseData(cid) {
//     const res = await fetch(`https://api.utdnebula.com/course/${cid}`, headers);
//     const json = await res.json();
//     return json.data;
// }

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const cid = url.searchParams.get('cid');

    try{
        // const [course, professors] = await Promise.all([getCourseData(cid), getProfessorData(cid)]);
        // return new Response(JSON.stringify({course, professors}));
        const professors = await getProfessorData(cid);
        return new Response(JSON.stringify(professors));
    } catch (e) {
        console.error(e)
        throw error(404, 'Not found');
    }


    // const min = Number( ?? '0');
    // const max = Number(url.searchParams.get('max') ?? '1');

    // const d = max - min;

    // if (isNaN(d) || d < 0) {
    //     throw error(400, 'min and max must be numbers, and min must be less than max');
    // }

    // const random = min + Math.random() * d;
}