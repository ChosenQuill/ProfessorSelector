import { request, gql } from 'graphql-request'

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
                        legacyId

                        ratingsDistribution {
                            total
                        }
                    }
                }
            }
        }
    }
    `
    const data = await request("https://www.ratemyprofessors.com/graphql", queryName, { name }, rmpHeaders);
    const count = data.newSearch.teachers.resultCount
    if (count == 0) {
        console.log("Professor does not exist.")
        return {}
    }
    const profData = data.newSearch.teachers.edges[0]
    return profData.node;
}

async function main() {
    console.log(await getProfessorRating("Jason Smith"))
}
// main()