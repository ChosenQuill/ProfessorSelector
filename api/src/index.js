import { promises as fs } from 'fs'
import { request, gql } from 'graphql-request'

function parseProfessors(classData) {
    // Get the sections and map each section to the first instructors name. Then split that name to first name, middle (optional), and last.
    const professors = [...new Set(classData.sections.map((s) => s.instructor[0].name))].map(name => name.split(' '));
    return professors
}


const queryID = gql`
{
    node(id: "VGVhY2hlci0xODMzMDU4") {
        ... on Teacher {
            id
            firstName
            lastName
            avgDifficulty
            avgRatingRounded
            wouldTakeAgainPercentRounded
            numRatings
        }
    }
}
`

const rmpHeaders = {
    "Authorization": "Basic dGVzdDp0ZXN0"
}
export async function getProfessorRating(name) {
    const queryName = gql`
    {   
        newSearch {
            teachers(query:{text: "${name}", schoolID:"U2Nob29sLTEyNzM="}) {
                resultCount
                edges {
                    node {
                        id
                        firstName
                        lastName
                        avgDifficulty
                        avgRatingRounded
                        wouldTakeAgainPercentRounded
                        numRatings
                        
                    }
                }
            }
        }
    }
    `
    const [firstname, lastname] = name.split(' ')
    const data = await request("https://www.ratemyprofessors.com/graphql", queryName, { name }, rmpHeaders);
    const count = data.newSearch.teachers.resultCount
    if (count == 0) {
        console.log("Professor does not exist.")
        return null
    }
    const profData = data.newSearch.teachers.edges[0]
    return profData.node;
}

const idre = /https:\/\/www\.ratemyprofessors\.com\/professor\?tid=(.+)/
function idFromUrl(url) {
    const res = idre.exec(url)
    if (!res) {
        return null
    } else {
        return res[1]
    }
}

async function main() {
    console.log(await getProfessorRating("Jason Smith"))
}

main()