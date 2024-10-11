import { error, json } from '@sveltejs/kit';
import { getProfessors } from '$lib/api/data';


/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    const id = params.id;
    try {
        const professors = await getProfessors(id, "24F");
        if(professors === undefined) {
            return json("Nebula Error", { status: 500 });
        }
        if(professors === null) {
            return json("Data Not Found", { status: 404 });
        }
        return json(professors, { status: 200, headers: { 'cache-control': 'public, max-age=2592000' } });
    } catch (e) {
        console.error(e)
        throw error(500, 'Internal Server Error');
    }
}