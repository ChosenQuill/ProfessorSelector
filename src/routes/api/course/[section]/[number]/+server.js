import { error, json } from '@sveltejs/kit';
import { getCourseInfo } from '$lib/api/data';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const { section, number } = params;
    try {
        const res = await getCourseInfo(section, number);
        if (res === undefined) {
            return json("Nebula Error", { status: 500 });
        }
        if(res === null) {
            return json("Content Not Found", { status: 404 });
        }
        return json(res, { status: 200, headers: { 'cache-control': 'public, max-age=2592000' } });
    } catch (e) {
        console.error(e)
        throw error(500, 'Internal Server Error');
    }
}