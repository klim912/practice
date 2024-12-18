/* To solve this Kata, complete the function, calculateHypotenuse(a,b), which will return the length of the hyptenuse for a right angled triangle with the other two sides having a length equal to the inputs. More details:

The returned value should be a number rounded to three decimal places
An error (ArgumentException in C#) should be thrown if an invalid input is provided (inputs should both be numbers that are above zero)*/

const calculateHypotenuse = (a, b) => {
    if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        throw new Error("Both inputs must be numbers greater than zero.");
    }

    const hypotenuse = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
 
    return Math.round(hypotenuse * 1000) / 1000;
}

console.log(calculateHypotenuse(3,4)); 

