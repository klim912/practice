/*Description:
Your job is to build a function which determines whether or not there are double characters in a string (including whitespace characters). For example aa, !! or   .

You want the function to return true if the string contains double characters and false if not. The test should not be case sensitive; for example both aa & aA return true.

Examples:

  doubleCheck("abca")
  //returns false
  
  doubleCheck("aabc")
  //returns true */

const doubleCheck = (str) => {
  str = str.toLowerCase();

  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      return true;
    }
  }
  return false;
}

console.log(doubleCheck("aabc"))
