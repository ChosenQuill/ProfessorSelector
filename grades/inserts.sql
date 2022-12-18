-- SQLite
INSERT OR IGNORE INTO courses (subject, number) VALUES (?, ?);

INSERT INTO classes (course_id, section, season, year, ap, a, am, bp, b, bm, cp, c, cm, dp, d, dm, f, nf, cr, nc, p, i, w) VALUES ((SELECT id FROM courses where subject = ? and number = ?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

INSERT OR IGNORE INTO professors (first_name, middle_initial, last_name) VALUES (?, ?, ?);

INSERT INTO class_professor (professor_id, class_id) VALUES (
    (SELECT id FROM professors WHERE first_name = ? AND middle_initial = ? AND last_name = ?), 
    (SELECT id from classes WHERE course_id = (SELECT id from courses WHERE subject = ?, number = ?), section = ?, season = ?, year = ?)
);