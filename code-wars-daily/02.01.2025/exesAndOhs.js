/* Check to see if a string has the same amount of 'x's and 'o's. The method must return a boolean and be case insensitive. The string can contain any char.

Examples input/output:

XO("ooxx") => true
XO("xooxx") => false
XO("ooxXm") => true
XO("zpzpzpp") => true // when no 'x' and 'o' is present should return true
XO("zzoo") => false */

const XO = (str) => {
    const strSymbolsArr = str.toLowerCase().split('');
    const xCount = strSymbolsArr.filter(symbol => symbol === 'x').length;
    const oCount = strSymbolsArr.filter(symbol => symbol === 'o').length;
    return xCount === oCount;
}

console.log(XO('xxooo')); 