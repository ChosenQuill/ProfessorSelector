import l3 from 'sqlite3'
import { open } from 'sqlite'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db;

const query = "SELECT SUM(average) / count(average) AS average FROM classes JOIN class_professor ON classes.id = class_professor.class_id where professor_id = (SELECT id FROM professors WHERE first_name LIKE ? AND last_name Like ?) AND count != 0;"

export async function getProfessorAvg(first, last) {
    const rows = await db.all(query, [first, last]);
    // if (err) {
    //     console.error(err)
    //     throw new Error("Can't get grade data.")
    // }
    if (rows.length != 0)
        return rows[0].average
    return rows[0]
}

export async function loadDB() {
    db = await open({ filename: __dirname + "/grades.db", driver: l3.Database });
}

// getProfessorAvg("Jason", "Smith")