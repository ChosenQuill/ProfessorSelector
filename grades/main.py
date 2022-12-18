import csv
import os
import re
import sqlite3

# gradeNames = [x for x in [[it + "+", it, it + "-"] for it in "ABCD".split('')]]]
# gradeNames = []
# for x in "ABCD".split(''):
#     gradeNames.extend([[it + "+", it, it + "-"] for it in "ABCD".split('')])

letters = "ABCD"
suffixes = "+", "", "-"
# Number Grade Names
ngNames = [letter + suffix for letter in letters for suffix in suffixes]
ngNames.append('F')
gradeNames = [*ngNames, *"NF,CR,NC,P,I,W".split(',')]

gradeMap : dict = {}
g = [100, 90, 80, 70]
s = [1.5, 5, 8.5]
gradeMap : list = [x - y for x in g for y in s]
gradeMap.append(0)

filePtrn = "(Fall|Spring|Summer) (\d{4}).csv"
namePtrn = "(\w+), (\w+) ?(\w?)"

def sem2num(name):
    match name:
        case "Fall":
            return 0
        case "Spring":
            return 1
        case "Summer":
            return 2

con = sqlite3.connect(":memory:")

with open("./db_schema.sql") as file:
    cur = con.cursor()
    for query in file.read().split(';'):
        query += ';'
        cur.execute(query)
con.commit()

    # I know you hate me plz don't hate me

for fileName in os.listdir("./raw_data"):
    cur = con.cursor()
    print("Scanning File: " + fileName)
    with open("./raw_data/" + fileName) as file:
        csv_reader = csv.reader(file, delimiter=",")
        
        first = False
        colMaps : dict = {}

        for row in csv_reader:
            if not first:
                first = True
                # Sets positions for various variables.
                insts = []
                for i, colName in enumerate(row):
                    if "instructor" in colName.lower():
                        insts.append(i)
                    elif "w" in colName.lower():
                        colMaps["W"] = i
                    elif "catalog" in colName.lower():
                        colMaps["Number"] = i
                    else:
                        colMaps[colName] = i

                    rex = re.search(filePtrn, fileName)
                    colMaps['year'] = rex.group(2)
                    colMaps['season'] = sem2num(rex.group(1))

                colMaps["instructors"] = insts
            
            else:
                cur.execute("INSERT OR IGNORE INTO courses (subject, number) VALUES (?, ?);", (row[colMaps["Subject"]], row[colMaps["Number"]])).lastrowid
                gradeCount = [int(row[colMaps[name]] if row[colMaps[name]] else '0') for name in ngNames]
                count = sum(gradeCount)
                avg = sum([c * gradeMap[i] for i, c in enumerate(gradeCount)]) / count if count != 0 else 0
                classID = cur.execute("INSERT INTO classes (course_id, section, season, year, ap, a, am, bp, b, bm, cp, c, cm, dp, d, dm, f, nf, cr, nc, p, i, w, average, count) VALUES ((SELECT id FROM courses where subject = ? and number = ?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", (*[row[colMaps[n]] for n in ["Subject", "Number", "Section"]], colMaps["season"], colMaps["year"], *[row[colMaps[name]] if name in colMaps else 0 for name in gradeNames], avg, count)).lastrowid

                for inst in colMaps["instructors"]:
                    if row[inst]:
                        rex = re.search(namePtrn, row[inst])
                        if rex:
                            cur.execute("INSERT OR IGNORE INTO professors (first_name, middle_initial, last_name) VALUES (?, ?, ?);", (rex.group(2), rex.group(3), rex.group(1)))
                            cur.execute("INSERT INTO class_professor (professor_id, class_id) VALUES ((SELECT id FROM professors WHERE first_name = ? AND middle_initial = ? AND last_name = ?), ?);", (rex.group(2), rex.group(3), rex.group(1), classID))
                        # else:
                            # print("Skipping " + str(row[inst]))

                        
con.commit()
if os.path.exists("./grades.db"):
    os.remove("./grades.db")
with sqlite3.connect("grades.db") as dbFile:
    con.backup(dbFile)
con.close()
print("Database Created!")