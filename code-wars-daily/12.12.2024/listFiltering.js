//У цьому ката ви створите функцію, яка приймає список невід'ємних цілих чисел і рядків і повертає новий список, з якого відфільтровано рядки.
function filter_list(l) {
    // Return a new array with the strings filtered out
    for(let i=0;i<l.length;i++){
        if(typeof l[i]==="string"){
           l.splice(i,1);
           i--;
        }
    }
    return l;
  }
  
  console.log(filter_list([1,2,'aasf','1','123',123]));