import { parse } from "csv-parse/sync";
import * as fs from "fs";
import path from "path";
import sqlite3 from 'sqlite3'
const sql = sqlite3.verbose();
import type { GradesRow } from "./types/GradesRow";


const db = new sql.Database(":memory:", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

function createDb() {
    for (const [i, query] of fs.readFileSync("./db_schema.sql", "utf8").replaceAll("\n", " ").split(";").map(q => q.trim() + ";").filter(q => q !== ';').entries()) {
        db.run(query, (err) => {
            console.log(`Running query ${i}`);
            if (err)
                throw err;
        });
    }
}

async function scanFiles() {
    for (const filename of fs.readdirSync("./raw_data")) {
        const fileRE = /(Fall|Spring|Summer) (\d{4}).csv/g
        const fRes = fileRE.exec(filename);
        const year = fRes[2];
        let season = 0;
        if (fRes[1] == "Spring") {
            season = 1;
        } else if (fRes[1] == "Summer") {
            season = 2;
        }

        const csv = fs.readFileSync('./raw_data/' + filename, { encoding: 'utf-8' });
        console.log("Scanning file " + filename);
        const data = parse(csv, { columns: true, skip_empty_lines: true })
        const iKeyNames = [];
        for (const key in data[0]) {
            if (key.toLowerCase().includes("instructor")) {
                iKeyNames.push(key);
            }
        }

        // Instructor Statement
        const profStmnt = db.prepare("INSERT OR IGNORE INTO professors (first_name, middle_initial, last_name) VALUES (?, ?, ?);")
        for (const row of data) {
            for (const key of iKeyNames) {
                if (row[key]) {
                    const nameRE = /(\w+), (\w+) ?(\w?)/g;
                    const nRes = nameRE.exec(row[key]);
                    if (nRes) {
                        const first = nRes[1], last = nRes[2], middle = nRes[3];
                        profStmnt.run(first, middle, last);
                    } else {
                        console.log("Ignoring professor " + row[key]);
                    }
                }
            }
        }
        profStmnt.finalize((err) => {
            console.log("Inserting profStmnt");
            if (err) {
                console.log("Error inserting professors");
                throw err;
            }
        });

        const courseStmt = db.prepare("INSERT OR IGNORE INTO courses (subject, number) VALUES (?, ?);")
        const nbrKeyName = Object.keys(data[0]).find((val) => val.toLowerCase().includes("catalog"));
        for (const row of data) {
            courseStmt.run(row["Subject"], row[nbrKeyName]);
        }
        courseStmt.finalize((err) => {
            console.log("Inserting courseStmnt");
            if (err) {
                console.log("Error inserting courses.");
                throw err;
            }
        });


        const wKey = Object.keys(data[0]).find(r => r.toLowerCase().includes("w"));
        const classStmnt = db.prepare("INSERT INTO classes (course_id, section, season, year, ap, a, am, bp, b, bm, cp, c, cm, dp, d, dm, f, nf, cr, nc, p, i, w) VALUES ((SELECT id FROM courses where subject = ? and number = ?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");
        for (const row of data) {
            const set1 = "ABCD".split("").flatMap((c) => [c + "+", c, c + "-"]).map(key => row[key])
            const set2 = "F,NF,CR,NC,P,I".split(",").map(key => row[key]);
            classStmnt.run(row["Subject"], row[nbrKeyName], row["Section"], season, year, ...set1, ...set2, row[wKey]);
        }
        classStmnt.finalize((err) => {
            console.log("Inserting classStmnt");
            if (err) {
                console.log("Error inserting classes.");
                throw err;
            }
        });
        /*
                const cpStmt = db.prepare("INSERT INTO class_professor (professor_id, class_id) VALUES ((SELECT id FROM professors WHERE first_name = ?, middle_initial = ?, last_name = ?), (SELECT id from classes WHERE course_id = (SELECT id from courses WHERE subject = ?, number = ?), section = ?, season = ?, year = ?));");
                for (const row of data) {
                    for (const key of iKeyNames) {
                        if (row[key]) {
                            const nameRE = /(\w+), (\w+) ?(\w?)/g;
                            const nRes = nameRE.exec(row[key]);
                            if (nRes) {
                                const first = nRes[1], last = nRes[2], middle = nRes[3];
                                cpStmt.run(first, middle, last, row["Subject"], row[nbrKeyName], row["Section"], season, year);
                            }
                        }
                    }
                }
                cpStmt.finalize((err) => {
                    console.log("Inserting cpStmnt");
                    if (err) {
                        console.log("Error inserting class_professors.");
                        throw err;
                    }
                });
                */

        /*
        fs.createReadStream('./raw_data/' + filename)
            .pipe(parse())
            .on('error', error => console.error(error))
            .on('data', row => {
                if (!row1) {
                    row1 = true;
                    for (let [i, el] of row.entries()) {
                        el = el.toLowerCase();
                        if (el.contains("instructor")) {
                            map.set(i, "instructor");
                        } else if (el.contains("subject")) {
                            map.set(i, "subject");
                        } else if (el.contains("catalog")) {
                            map.set(i, "number");
                        } else {
                            map.set(i, el);
                        }
                    };
                    return;
                }
                const instructors = [];
                const map2 = new Map();
                for (let [i, el] of row.entries()) {
                    const curr = map.get(i);
                    if (curr == "instructor") {
                        instructors.push(el);
                    }
                    map2.set(map.get(i), el)
                };

            })
            .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows in ${fileName}`));
            */
    }
    console.log("Completed Scanning Files")
}

db.serialize(async () => {
    if (fs.existsSync("./grades.db")) {
        fs.unlinkSync("./grades.db")
    }
    createDb();

    try {
        await scanFiles();
    } catch (e) {
        console.error(e);
    }
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
db.backup("./grades.db", () => {
    console.log("File copied to db.")
});
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Closed the database.")
});




// OLD CODE

/*
function reorderName(name: string): string {
    const parts = name.split(", ");
    const first = parts[1]?.trim() ?? null;
    const last = parts[0]!.trim();
    if (first) {
        return `${first} ${last}`;
    }
    return last;
}

function gradesRow(
    id: number,
    csvRow: Record<string, string>,
    semester: string,
    strings: Map<string, number>
): GradesRow {
    function getStringIdForColumn(...columnCandidates: string[]): number {
        const rowValue = columnCandidates
            .map((column) => csvRow[column])
            .find((rowValue) => rowValue !== undefined);
        if (!rowValue) {
            throw new Error(`Value for all columns was undefined: ${columnCandidates}`);
        }

        const string = strings.get(rowValue);
        if (!string) {
            throw new Error(`Unknown string: ${rowValue}`);
        }

        return string;
    }

    function parseNum(s?: string): number {
        if (s) return parseInt(s, 10);
        return 0;
    }

    function parseProf(s?: string): number | null {
        if (s) {
            s = reorderName(s);
            return strings.get(s) ?? null;
        }
        return null;
    }

    return {
        id,
        semester: strings.get(semester)!,
        subject: getStringIdForColumn("Subject"),
        catalogNumber: getStringIdForColumn("Catalog Number", "Catalog Nbr"), // some semesters have "Catalog Number", some have "Catalog Nbr"
        section: getStringIdForColumn("Section"),
        ap: parseNum(csvRow["A+"]),
        a: parseNum(csvRow["A"]),
        am: parseNum(csvRow["A-"]),
        bp: parseNum(csvRow["B+"]),
        b: parseNum(csvRow["B"]),
        bm: parseNum(csvRow["B-"]),
        cp: parseNum(csvRow["C+"]),
        c: parseNum(csvRow["C"]),
        cm: parseNum(csvRow["C-"]),
        dp: parseNum(csvRow["D+"]),
        d: parseNum(csvRow["D"]),
        dm: parseNum(csvRow["D-"]),
        f: parseNum(csvRow["F"]),
        cr: parseNum(csvRow["CR"]),
        nc: parseNum(csvRow["NC"]),
        p: parseNum(csvRow["P"]),
        w: parseNum(csvRow["W"] ?? csvRow["Total W"]), // TODO: some semesters have "W" and some have "Total W". Are they the same?
        i: parseNum(csvRow["I"]),
        nf: parseNum(csvRow["NF"]),
        instructor1: parseProf(csvRow["Instructor 1"]),
        instructor2: parseProf(csvRow["Instructor 2"]),
        instructor3: parseProf(csvRow["Instructor 3"]),
        instructor4: parseProf(csvRow["Instructor 4"]),
        instructor5: parseProf(csvRow["Instructor 5"]),
        instructor6: parseProf(csvRow["Instructor 6"]),
    };
}

async function parseCsv(filePath: string): Promise<Record<string, string>[]> {
    console.log(`Parsing ${filePath}`);
    const fileContents = await fs.readFile(filePath);
    return csv.parse(fileContents, {
        columns: true, // detect column names from header
    }) as Record<string, string>[]; // csv.parse returns `any` for some reason. This should be safe
}

async function parseDataDir(dataDir: string): Promise<[Map<string, number>, GradesRow[]]> {
    const strings = new Map<string, number>();

    function add(s: string | undefined, modify?: (s: string) => string) {
        if (s) {
            if (modify) {
                s = modify(s);
            }
            if (!strings.has(s)) {
                strings.set(s, strings.size);
            }
        }
    }

    const grades: GradesRow[] = [];

    for (const fileName of await fs.readdir(dataDir)) {
        const semester = path.parse(fileName).name;
        add(semester);

        for (const csvRow of await parseCsv(path.join(dataDir, fileName))) {
            add(csvRow["Instructor 1"], reorderName);
            add(csvRow["Instructor 2"], reorderName);
            add(csvRow["Instructor 3"], reorderName);
            add(csvRow["Instructor 4"], reorderName);
            add(csvRow["Instructor 5"], reorderName);
            add(csvRow["Instructor 6"], reorderName);

            add(csvRow["Subject"]);
            add(csvRow["Catalog Number"] ?? csvRow["Catalog Nbr"]);
            add(csvRow["Section"]);

            grades.push(gradesRow(grades.length, csvRow, semester, strings));
        }
    }

    return [strings, grades];
}

// function insertStrings(db: Database, strings: Map<string, number>) {
//   const stmt = db.prepare(`INSERT INTO strings(id, string) VALUES (?, ?)`);
//   for (const [string, id] of strings.entries()) {
//     stmt.run([id, string]);
//   }
//   stmt.free();
// }

async function createDb(): Promise<Uint8Array> {
    const db = new sql.Database("./grades.db");

    const initScript = await fs.readFile("db_schema.sql");
    db.run(initScript.toString());

    const [strings, allGrades] = await parseDataDir("./raw_data");

    db.exec("BEGIN");

    insertStrings(db, strings);

    const stmt = db.prepare(`
    INSERT INTO grades(id, ap, a, am, bp, b, bm, cp, c, cm, dp, d, dm, f, cr, nc, p, w, i, nf, semesterId, subjectId, catalogNumberId, sectionId, instructor1Id, instructor2Id, instructor3Id, instructor4Id, instructor5Id, instructor6Id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    for (const grades of allGrades) {
        stmt.getAsObject([
            grades.id,
            grades.ap,
            grades.a,
            grades.am,
            grades.bp,
            grades.b,
            grades.bm,
            grades.cp,
            grades.c,
            grades.cm,
            grades.dp,
            grades.d,
            grades.dm,
            grades.f,
            grades.cr,
            grades.nc,
            grades.p,
            grades.w,
            grades.i,
            grades.nf,
            grades.semester,
            grades.subject,
            grades.catalogNumber,
            grades.section,
            grades.instructor1,
            grades.instructor2,
            grades.instructor3,
            grades.instructor4,
            grades.instructor5,
            grades.instructor6,
        ]);
    }

    stmt.free();

    db.exec("COMMIT");

    const data = db.export();
    db.close();

    return data;
}

const DB_PATH = "utdgrades.sqlite3";

const data = await createDb();
await fs.writeFile(DB_PATH, Buffer.from(data));

console.log(`\nDatabase successfully written to ${DB_PATH}`);
*/