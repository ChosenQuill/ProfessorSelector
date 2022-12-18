import sqlite3 from 'sqlite3'
const sql = sqlite3.verbose();

const db = new sql.Database("Test.db");

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS professors
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        first_name TEXT NOT NULL,
        middle_initial TEXT NOT NULL DEFAULT '',
        last_name TEXT NOT NULL,
        UNIQUE(first_name, middle_initial, last_name)
    );
    `);

});

db.close();

export { }