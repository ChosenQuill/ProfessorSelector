# Grades
For grade data, we build a small sqlite db that compiles together all csvs into one simple db. 

Data is taken from [UTD Grades](https://github.com/acmutd/utd-grades).

# Building
Run `poetry run python3 ./main.py` to build the grades.db file.

# Format

The data is split into three tables.

professors
- id: int
- first_name: string
- middle_intial: string (default "")
- last_name: string (default "")
courses
- id: int
- subject: string
- number: int

classes
- id: int
- course_id: int
- section: string
- year: int
- season: int 0 - Fall, 1 - Spring, 2 - Summer
- ap, a, am, bp, b, bm, cp, c, cm, dp, d, dm, f, nf, cr, nc, p, i, w: int
- average: float
- count: int

class_professor
- professor_id
- class_id