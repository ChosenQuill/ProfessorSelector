import { error } from '@sveltejs/kit';
import headers from '$lib/headers.js'

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    try {
        const res = await fetch(`https://api.utdnebula.com/course/${params.class}`, headers);
        const json = await res.json();
        const res2 = await fetch(`https://chosenquill-didactic-guide-5vw6xg779rpc7qq5-5173.preview.app.github.dev/api/professor?cid=${params.class}`);
        const json2 = await res2.json();
        return {course: json.data, professors: json2}
    } catch (e) {
        console.error(e)
        throw error(404, 'Not found');
    }

}