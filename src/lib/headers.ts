import * as dotenv from 'dotenv'
import Professors from '../routes/app/Professors.svelte'

dotenv.config()

export default {
    method: "GET",
    headers: {
        "x-api-key": process.env.API_KEY,
        "Accept": 'application/json',
    },
    // mode: "no-cors"
}