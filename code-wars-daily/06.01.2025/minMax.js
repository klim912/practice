/* Implement a function that returns the minimal and the maximal value of a list (in this order).*/

const getMinMax = (arr) => {
   let min = Math.min(...arr);
   let max = Math.max(...arr);
   return [min, max];
}

console.log(getMinMax([1,2,3]));