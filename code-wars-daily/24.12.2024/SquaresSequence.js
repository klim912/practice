/* Complete the function that returns an array of length n, starting with the given number x and the squares of the previous number. If n is negative or zero, return an empty array/list.*/
const squares = (x, n) => {
    if(n <= 0) return [];
    let result = [];
    for(let i = 0; i < n; i++) {
        result.push(x);
        x *= x;
    }
    return result;
}

console.log(squares(2, 5));
