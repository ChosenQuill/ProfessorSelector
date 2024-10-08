CREATE TABLE professors
(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    first_name TEXT NOT NULL,
    middle_initial TEXT NOT NULL,
    last_name TEXT NOT NULL,
    UNIQUE(first_name, middle_initial, last_name)
);

CREATE TABLE courses
(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    subject TEXT NOT NULL,
    number INTEGER NOT NULL,
    UNIQUE(subject, number)
);

CREATE TABLE classes
(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    course_id INTEGER NOT NULL,
    section INTEGER NOT NULL,    
    year INTEGER NOT NULL,
    season INTEGER NOT NULL,
    ap INTEGER NOT NULL DEFAULT 0,
    a INTEGER NOT NULL DEFAULT 0,
    am INTEGER NOT NULL DEFAULT 0,
    bp INTEGER NOT NULL DEFAULT 0,
    b INTEGER NOT NULL DEFAULT 0,
    bm INTEGER NOT NULL DEFAULT 0,
    cp INTEGER NOT NULL DEFAULT 0,
    c INTEGER NOT NULL DEFAULT 0,
    cm INTEGER NOT NULL DEFAULT 0,
    dp INTEGER NOT NULL DEFAULT 0,
    d INTEGER NOT NULL DEFAULT 0,
    dm INTEGER NOT NULL DEFAULT 0,
    f INTEGER NOT NULL DEFAULT 0,
    nf INTEGER NOT NULL DEFAULT 0,
    cr INTEGER NOT NULL DEFAULT 0,
    nc INTEGER NOT NULL DEFAULT 0,
    p INTEGER NOT NULL DEFAULT 0,
    i INTEGER NOT NULL DEFAULT 0,
    w INTEGER NOT NULL DEFAULT 0,
    average REAL NOT NULL DEFAULT 0,
    count INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY(course_id) REFERENCES courses(id),
    UNIQUE(course_id, section, year, season)
);

CREATE TABLE class_professor
(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    professor_id INTEGER NOT NULL,
    class_id INTEGER NOT NULL,
    FOREIGN KEY(professor_id) REFERENCES professors(id),
    FOREIGN KEY(class_id) REFERENCES classes(id),
    UNIQUE(professor_id, class_id)
);

CREATE INDEX index_name ON professors(first_name, last_name);