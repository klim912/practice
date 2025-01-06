/*You love pizza, but you also love getting bang for your buck. One thing that irks you when you go to your local pizza place is that although they list the diameter and price of each pizza, they don't list the cost per square inch. (Unbelievable, I know!)

Write a function that takes two arguments - diameter, in inches, and price - and returns the price per square inch to two decimal places. (as a number, not a string)

function pizzaPrice (diameter, price) {
  // ... your code
}

pizzaPrice(7, 4.30) // should return 0.11
Assume that the pizza is a circular pizza of uniform diameter, and use Math.PI as the value of pi.

If you are given too few arguments, or if they aren't numbers, then return 0. In C# you will be given only numbers.*/

const pizzaPrice = (diameter, price) => {
    if (typeof diameter !== 'number' || typeof price !== 'number' || diameter <= 0 || price <= 0) {
        return 0;
    }
    let radius = diameter / 2;
    let area = Math.PI * radius * radius;
    let finalPrice = price / area;

    return parseFloat(finalPrice.toFixed(2));
}

console.log(pizzaPrice(7, 4.3));