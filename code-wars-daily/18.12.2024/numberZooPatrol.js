/* Background:
You're working in a number zoo, and it seems that one of the numbers has gone missing!

Zoo workers have no idea what number is missing, and are too incompetent to figure it out, so they're hiring you to do it for them.

In case the zoo loses another number, they want your program to work regardless of how many numbers there are in total.

Task:
Write a function that takes a shuffled list of unique numbers from 1 to n with one element missing (which can be any number including n). Return this missing number.

Note: huge lists will be tested.*/
const findNumber = (array) => {
    const n = array.length + 1; 
    const totalSum = (n * (n + 1)) / 2; 
    let currentSum = 0; 

    for (let i = 0; i < array.length; i++) {
        currentSum += array[i];
    }
    
    return totalSum - currentSum; 
}

console.log(findNumber([1,2,4,5]));