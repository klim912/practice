/* He needs you to create a method that can determine how many letters (both uppercase and lowercase ASCII letters) and digits are in a given string.*/

const countLettersAndDigits = (input) => {
    let count=0;
    for(let i=0;i<input.length;i++){
        if ((input[i] >= 'a' && input[i] <= 'z') || (input[i] >= 'A' && input[i] <= 'Z') || (input[i] >= '0' && input[i] <= '9')) {
            count++;
        }
    }

    return count;
  }

  console.log(countLettersAndDigits("wicked .. !"));

/* Second variant

function countLettersAndDigits(input) {
    let count=0;
    for(let i=0;i<input.length;i++){
        if(/[a-zA-z0-9]/.test(input[i])){
            count++;
        }
    }

    return count;
  }

  console.log(countLettersAndDigits("wicked .. !"));
*/
  