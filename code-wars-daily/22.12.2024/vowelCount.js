/*Return the number (count) of vowels in the given string.

We will consider a, e, i, o, u as vowels for this Kata (but not y).

The input string will only consist of lower case letters and/or spaces.*/

const getCount = (str) => {
    const vowels= 'aeiou';
    let count = 0;
    if (str.length === 0){
        return 0;
    }else{
        for(let i = 0; i < str.length; i++){
            if(vowels.includes(str[i])){
                count++;
            }
        }
        return count;
    }
}

console.log(getCount("abrac adabr a"));