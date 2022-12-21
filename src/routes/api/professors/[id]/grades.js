import Database from 'better-sqlite3'
import fs from "node:fs";

// import { fileURLToPath } from 'url';
// import { dirname, resolve } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const dbfile = resolve(__dirname, './grades.db')

console.log("grades.db is " + fs.existsSync("grades.db") ? "" : " NOT " + "found")

// const db = new Database(dbfile)
const db = new Database("grades.db")
// db.pragma('journal_mode = WAL'); // No need for WAL since we do all reads and no writes.

const query = "SELECT SUM(average) / count(average) AS average FROM classes JOIN class_professor ON classes.id = class_professor.class_id where professor_id = (SELECT id FROM professors WHERE first_name LIKE ? AND last_name Like ?) AND count != 0;"

export function getProfessorAvg(first, last) {
    const rows = db.prepare(query).all([first, last]);

    // if (err) {
    //     console.error(err)
    //     throw new Error("Can't get grade data.")
    // }
    if (rows.length != 0)
        return rows[0].average
    return rows[0]
}

// console.log(getProfessorAvg("Jason", "Smith"))
