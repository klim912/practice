/* Description:
Steps

Square the numbers that are greater than zero.
Multiply by 3 every third number.
Multiply by -1 every fifth number.
Return the sum of the sequence.
Example
{ -2, -1, 0, 1, 2 } returns -6

1. { -2, -1, 0, 1 * 1, 2 * 2 }
2. { -2, -1, 0 * 3, 1, 4 }
3. { -2, -1, 0, 1, -1 * 4 }
4. -6
P.S.: The sequence consists only of integers. And try not to use "for", "while" or "loop" statements.*/
const calc = (a) => {
    let result = a.map((x, i) => {
        if (x > 0) {
            x = x * x;
        } 
        if ((i + 1) % 3 === 0) {
            x = x * 3;
        }
        if ((i + 1) % 5 === 0) {
            x = x * -1;
        }
        return x;
    });
    return result.reduce((a, b) => a + b);
}

console.log(calc([-2, -1, 0, 1, 2])); 
