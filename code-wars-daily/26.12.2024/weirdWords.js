/* Change every letter in a given string to the next letter in the alphabet. The function takes a single parameter s (string).

Notes:

Spaces and special characters should remain the same.
Capital letters should transfer in the same way but remain capitilized.
Examples
"Hello"               -->  "Ifmmp"
"What is your name?"  -->  "Xibu jt zpvs obnf?"
"zoo"                 -->  "app"
"zzZAaa"              -->  "aaABbb" */

const nextLetter = (s) => {
    let newString = '';
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ' ') {
            newString += ' ';
        } else if (s[i] === 'z') {
            newString += 'a';
        } else if (s[i] === 'Z') {
            newString += 'A';
        } else if (/[a-zA-Z]/.test(s[i])) {
            newString += String.fromCharCode(s.charCodeAt(i) + 1);
        } else {
            newString += s[i];
        }
    }
    return newString;
}

console.log(nextLetter('Hello'));