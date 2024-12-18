/*You have to search all numbers from inclusive 1 to inclusive a given number x, that have the given digit d in it.
The value of d will always be 0 - 9.
The value of x will always be greater than 0.

You have to return as an array

the count of these numbers,
their sum
and their product.

If there are no numbers, which include the digit, return [0,0,0].*/

const numbersWithDigitInside = (x, d) => {
    const countOfNumbers = []; 
    const strD = d.toString(); 

    for (let i = 1; i <= x; i++) {
        const strI = i.toString(); 
            if (strI.includes(strD)) {
            countOfNumbers.push(i); 
        }
    }

    if (countOfNumbers.length === 0) {
        return [0, 0, 0];
    }

    let sum = 0;
    countOfNumbers.map(num => sum += num);

    let product = 1;
    countOfNumbers.map(num => product *= num);

    return [countOfNumbers.length, sum, product];
}

console.log(numbersWithDigitInside(11, 1)); 

