/* Description:
You are going to be given a non-empty string. Your job is to return the middle character(s) of the string.

If the string's length is odd, return the middle character.
If the string's length is even, return the middle 2 characters.
Examples:
"test" --> "es"
"testing" --> "t"
"middle" --> "dd"
"A" --> "A"*/

const getMiddle = (s) => {
    let middle = Math.floor(s.length / 2);
    let ifOddAmount = s.slice(middle, middle + 1);
    let ifEvenAmount = s.slice(middle - 1, middle + 1);
    return s.length % 2 === 0 ? ifEvenAmount : ifOddAmount;
}

console.log(getMiddle("testing")); 