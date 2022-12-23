import { error, json } from '@sveltejs/kit';
import { getProfessorRating } from './index'
import headers from '$lib/headers'
import { validate_each_argument } from 'svelte/internal';

import { getProfessorAvg } from './grades'


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
    let [profRMP, profGrades] = await Promise.all([
        await Promise.all(profData.map(data => getProfessorRating(data.full_name))),
        await Promise.all(profData.map(data => getProfessorAvg(data.first_name, data.last_name)))
    ]);
    profRMP.forEach((rmp, i) => profData[i].rmp = rmp);
    profGrades.forEach((avg, i) => profData[i].avgGrade = avg);
    // profData = profData.filter((prof) => (prof.rmp.avgRatingRounded));
    // console.log(profData)
    // console.log(profData.map(prof => prof?.rmp?.avgRatingRounded));
    profData = profData.sort((prof1, prof2) => {
        const prof1r = prof1?.rmp?.avgRatingRounded ? Number(prof1.rmp.avgRatingRounded) : -100;
        const prof2r = prof2?.rmp?.avgRatingRounded ? Number(prof2.rmp.avgRatingRounded) : -100;
        // console.log(prof1.full_name, prof1?.rmp?.avgRatingRounded, prof2.full_name, prof2?.rmp?.avgRatingRounded, prof2r - prof1r);
        return prof2r - prof1r;
    });
    // profData.forEach(prof => console.log(prof.full_name))
    // console.log(profData.map(prof => prof?.rmp?.avgRatingRounded));
    return profData;
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const id = params.id;
    try {
        // const [course, professors] = await Promise.all([getCourseData(cid), getProfessorData(cid)]);
        // return new Response(JSON.stringify({course, professors}));
        const professors = await getProfessorData(id);
        return json(professors, { status: 200, headers: { 'cache-control': 'public, max-age=2592000' } });
    } catch (e) {
        console.error(e)
        throw error(404, 'Not found');
    }
}