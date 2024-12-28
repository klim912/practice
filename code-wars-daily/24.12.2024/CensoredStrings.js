/* My PC got infected by a strange virus. It only infects my text files and replaces random letters by *, li*e th*s (like this).

Fortunately, I discovered that the virus hides my censored letters inside root directory.

It will be very tedious to recover all these files manually, so your goal is to implement uncensor function that does the hard work automatically.*/
const uncensor = (infected, discovered) => {
    if (discovered === '') return infected;
    let discoveredArr = discovered.split('');
    let infectedArr = infected.split('');
    for (let i = 0; i < infectedArr.length; i++) {
        if (infectedArr[i] === '*') {
            infectedArr[i] = discoveredArr.shift();
        }
    }
    return infectedArr.join('');
}

console.log(uncensor("*h*s *s v*ry *tr*ng*", "Tiiesae"));