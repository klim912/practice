/*Welcome. In this kata, you are asked to square every digit of a number and concatenate them.
For example, if we run 9119 through the function, 811181 will come out, because pow(9,2) is 81 and pow(1,2) is 1. (81-1-1-81)
Example #2: An input of 765 will/should return 493625 because pow(7,2) is 49, pow(6,2) is 36, and pow(5,2) is 25. (49-36-25)
Note: The function accepts an integer and returns an integer.
Happy Coding!*/

const squareDigits = (num) => {
    const arr = num.toString().split('').map(Number);
    for(let i=0; i<arr.length; i++){
        arr[i] = Math.pow(arr[i],2);
    }
    const result = Number(arr.join(''));
    return result
}

console.log(squareDigits(765));