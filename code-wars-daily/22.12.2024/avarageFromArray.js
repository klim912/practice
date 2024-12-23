/*Find Mean
Find the mean (average) of a list of numbers in an array.
*/
const findAverage = (nums) => {
    let result = nums.reduce((prev, curr) => prev + curr) / nums.length;
    return result;
}
console.log(findAverage([1, 3, 5, 7])); 