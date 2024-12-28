/* You will get an array of numbers.

Every preceding number is smaller than the one following it.

Some numbers will be missing, for instance:

[-3,-2,1,5] //missing numbers are: -1,0,2,3,4
Your task is to return an array of those missing numbers:

[-1,0,2,3,4]*/

const findMissingNumbers = (arr) => {
    let result = [];
    for(let i = 0; i < arr.length - 1; i++) {
        if(arr[i] + 1 !== arr[i + 1]) {
            for(let j = arr[i] + 1; j < arr[i + 1]; j++) {
                result.push(j);
            }
        }
    }
    return result;
}

console.log(findMissingNumbers([-3,-2,1,5]));