const longestWord = (stringOfWords) => {
    // Give me back the longest word!
    let string = stringOfWords.split(" ");
    let result= "";
   for(let word of string){
    if(word.length >= result.length){
        result = word;
    }
   }
   return result;
  }

  console.log(longestWord("red blue gold"));