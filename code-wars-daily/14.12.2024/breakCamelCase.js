const solution = (string) => {
    let result = "";
    let arr = string.split("");
    arr.forEach(letter=>{
      if(letter.toUpperCase() == letter)
        result+=" "+letter
      else
        result+=letter
    })
    return result
}
  console.log(solution("camelCasingTest"))