/* An array is called zero-balanced if its elements sum to 0 and for each positive element n, there exists another element that is the negative of n. Write a function named ìsZeroBalanced that returns true if its argument is zero-balanced array, else return false. Note that an empty array will not sum to zero. */
const ìsZeroBalanced = (n) => {
    if (n.length === 0) return false;
    let sum = n.reduce((a, b) => a + b);
    if (sum !== 0) return false;
    for (let i = 0; i < n.length; i++) {
        if (!n.includes(-n[i])) {
            return false;
        }
    }    
    return true;
}

console.log(ìsZeroBalanced([1, 2, 3, -1, -2, -3]));