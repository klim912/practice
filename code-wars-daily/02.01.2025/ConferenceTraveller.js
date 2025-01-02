/*Lucy loves to travel. Luckily she is a renowned computer scientist and gets to travel to international conferences using her department's budget.

Each year, Society for Exciting Computer Science Research (SECSR) organizes several conferences around the world. Lucy always picks one conference from that list that is hosted in a city she hasn't been to before, and if that leaves her with more than one option, she picks the conference that she thinks would be most relevant for her field of research.

Write a conference picker function that takes in two arguments:

Cities visited, a list of cities that Lucy has visited before, given as an array of strings.
Cities offered, a list of cities that will host SECSR conferences this year, given as an array of strings. Cities offered will already be ordered in terms of the relevance of the conferences for Lucy's research (from the most to the least relevant).
The function should return the city that Lucy should visit, as a string.

Also note:

You should allow for the possibility that Lucy hasn't visited any city before.
SECSR organizes at least two conferences each year.
If all of the offered conferences are hosted in cities that Lucy has visited before, the function should return "No worthwhile conferences this year!" (Nothing in Haskell)*/

const conferencePicker = (citiesVisited, citiesOffered) => {
    let resultCity = [];
    citiesOffered.forEach(element => {
        if (!citiesVisited.includes(element)) {
            resultCity.push(element);
        }
    });
    return resultCity.length === 0 ? 'No worthwhile conferences this year!' : resultCity[0];
}

console.log(conferencePicker(["Mexico City","Johannesburg","Stockholm","Osaka","Saint Petersburg","London"],["Stockholm","Paris","Melbourne"]))