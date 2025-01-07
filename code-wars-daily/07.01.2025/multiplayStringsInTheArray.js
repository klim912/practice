/* You received an array with two strings.
Create a function that will return their product as a string.
E.g.

input: ['3', '5'] => output: '15'
input: ['2', '-3'] => output: '-6'
input: ['9', '0'] => output: '0' */

const arrMultiply = (arr) => {
    let product = Number(arr[0]) * Number(arr[1]);

    return product.toString();
}

console.log(arrMultiply(['3', '5']))