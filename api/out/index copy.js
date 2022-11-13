import { request, gql } from 'graphql-request';
import prompt from 'prompt';
const cookie = ".AspNet.Cookies=ARCs-87EOMVLE2jqZcIqYkPjhNCXt2C2ipg57rKYu-QachBWQYOXf-F2qi_B1In5HrYNnBdvut0226sM1x2iAKWjmad8U9MWaXHJKyNWz3irIXeONKKcsFB0naGCcK94kLibavjeUu70qM0r7BfrTHZju0kZb9ptdD9CFrdggPnBdrRe8UuzuOE79PE0Y5vF-vIKh4ncTQu1MUSsSmhd-bZVOjBoFlFmfvG0lI6mbiwDtf4gu1-o1f85JgGGm_-V4XOXiLL8nMXSK9vLd1iuCGZaUx4X5bjsxDDetl6qzX36Y7VkOkEepO-dJw2eYwMz0Gp5SCa06nBrYnkXNs8-KitlfoGxyN_cWld5lcGMV0-_XGA7srVmCZKcp3_YBWrMUBe8fJxWWekW-oinJBHjloC3XHuF4y6lsdw7q-p0uPE4cb9RZufguKliTN3mowAmptZ29eZzDqy4hMFE9DrETIpvWMt2cro03DVbZHn4_RRUQexPcEHOjxCckHzMqXqafyfZNC-ZRczsFhl8-sVW1q8OCgLdFhm3E9Q5U6qmoxeuesstDItkoXdzSuDJv0Gd3Pta2zekJ3vCeWKeuMMWrlpfDeubnJEDHYNr8uxrymHZW9YGyWC2EEp2f_PXMtqssXTcyXEqcCWMIIRNBq_Mh-pGHv0ve7iXyBCyuK_iJLa4l8UqPKBVdt8dQy4IRlcJERmtqfs2cRAjz7Vd5wlLU0kUkkWtS-Jb9HqccpMTwwVy8hsLKRMZuMmpHVtmfDoQdwpyZkxj5cY193pYWlxLCh_chmWIN7M8szm-baUgdRGglrvuVIhfW-9dfT-iGgsRERaDDfbded2NHtqMYLcrmPjX73oCNKi7TKdVuTDpJwN5X7dUGiEJJa1gi2vnPK61p1FGdFMj8Hxc_7B3wSQYuFBhx-VXyQNKnnKTa6dZaV5cn--JNWbR6sDeH58J8QL1fIaYYv73afazpE54ttmRUYw4ed4MTw5prcu9OmqqcQrAchCvGN6CgezCCgojObkzvsDd5hTu8BuKMto0eQ9zx4XGQP3YKi1-Oe_L0uUUAzLca0HZlj4_rkBHU7hlLJ3r8unXvk14z65hn7Lbybsk2Sh13qNM7HDaxCVa9TC30fdbTESWJK5TJUsmxZbEzy6k-XHexSTmYS6-x6nM2mKf9vtzFMCvZ6MtxsArHj4ckXQrQdLUJ-IZzr1YYUuFPVz_CQsQcsSsTvp_kpfsrkuSGo1gROzNn2a8HZMglSg7iaGRt7krsj3ySLTf7kg4vUcIQZWBY0XO1-FWY6dqtXGN5QWxzBVmGVeRTcgFfCsbC0Y4TnfNb0oLXuTEvnUO5P8FZr-rKgV53PU9bZobj6UOp88PjuuY3BUi6p4pFA5i3dYOj9egMjV9_TGvgZauPUS-8KmfpGu52qHVDCWChFbImJBDotPpb4_TEGIRL_LCC8NHSseWg7YpJ6yk2VaFQxaBlIHTN90GPHRoJ73Tf2KKYl4sSqKhfF9zaQwyZV-bMc5faoEte2pPadXbLdIYMiEKrAcjW56gfEMIBCSYd8oM7_bNafvh55UaQe83d38d6aCN4_u2BbzxjjCT3Hnd2-KY-2T5voZ8Z3jaYXAPPxjXT3kADTYf1EN9GFx6f910QuQ_Wg7ZsjpFey_LENDLQzjxJxGtirdStiXKOueN0yq5xTs3hAPeP4uA0e5PapG6mNO2ZjE7EqutwfzR5yzeDxatkUfINZY98zfoVyyN6guZKkuxw7nXWZKuwhU_Acmz-8RVoju14kRqHKtNvj-QVF38TvZLUkn4HhU0KpXjDlXoFw15P7nFB6zUgZioUQd9Ut3zzld6JTgS4-Pd8ECXn1i_CZipsypIeR1onMSy-7DzBLFLE1m6S2-e3LfrMDsBu1suR5ag6OK58qQFpOlc14bvnvTz2w";
const headers = {
    "accept": "*/*",
    "accept-Encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9,und;q=0.8",
    "authority": "utdallas.collegescheduler.com",
    cookie
};
async function getClassData(section, number) {
    const res = await fetch(`https://utdallas.collegescheduler.com/api/terms/2023%20Spring/subjects/${section}/courses/${number}/regblocks`, { headers });
    const json = await res.json();
}
function parseProfessors(classData) {
    // Get the sections and map each section to the first instructors name. Then split that name to first name, middle (optional), and last.
    // @ts-ignore
    const professors = [...new Set(classData.sections.map((s) => s.instructor[0].name))].map(name => name.split(' '));
    return professors;
}
const queryName = gql `
{
    newSearch {
        teachers(query:{text:"Jason Smith", schoolID:"U2Nob29sLTEyNzM="}) {
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
`;
const queryID = gql `
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
`;
const rmpHeaders = {
    "Authorization": "Basic dGVzdDp0ZXN0"
};
export async function getProfessorRating({ name, id }) {
    if (name) {
        const [firstname, lastname] = name.split(' ');
        const data = await request("https://www.ratemyprofessors.com/graphql", queryName, { name }, rmpHeaders);
        const count = data.newSearch.teachers.resultCount;
        if (count == 0) {
            console.log("Professor does not exist.");
            return null;
        }
        const profData = data.newSearch.teachers.edges[0];
        if (profData.firstName.toLowerCase() != firstname.toLowerCase() && profData.lastname.toLowerCase() != lastname.toLowerCase()) {
            console.log("Professor name doesn't match");
            return null;
        }
        return profData;
    }
    else if (id) {
        const data = await request("https://www.ratemyprofessors.com/graphql", queryID, { id }, rmpHeaders);
        return data.node;
    }
    throw new Error("Name or ID not specified.");
}
const idre = /https:\/\/www\.ratemyprofessors\.com\/professor\?tid=(.+)/;
function idFromUrl(url) {
    const res = idre.exec(url);
    if (!res) {
        return null;
    }
    else {
        return res[1];
    }
}
async function main() {
    prompt.start();
    while (true) {
        console.log("Please provide the class section and number you want to add to your schedule.");
        const { section, number } = await prompt.get(["section", "number"]);
        try {
            const classData = await getClassData(section, number);
            const professors = parseProfessors(classData);
            for (const prof of professors) {
                const name = prof[0] + " " + prof[prof.length - 1];
                try {
                    let data = await getProfessorRating({ name });
                    if (!data) {
                        console.log("Please give the url for professor: " + name);
                        const { url } = await prompt.get(["url"]);
                        const id = idFromUrl(url);
                        if (!id) {
                            throw new Error("Invalid Url");
                        }
                        data = getProfessorRating({ id });
                    }
                    // Add data to notion.
                    // return data to api
                }
                catch (e) {
                    console.error("Skipping professor", e);
                }
            }
        }
        catch (e) {
            console.error("Error getting class data", e);
        }
    }
}
main();
//# sourceMappingURL=index%20copy.js.map