/*Тролі атакують ваш розділ коментарів!
Звичайний спосіб вирішення цієї ситуації - видалити всі голосні з коментарів тролів, нейтралізуючи загрозу.
Ваше завдання - написати функцію, яка приймає рядок і повертає новий рядок з усіма голосними, видаленими.
Наприклад, рядок "This website is for losers LOL!" стане "Ths wbst s fr lsrs LL!".
Примітка: для цього ката y не вважається голосною.*/
function disemvowel(str) {
    let vowel="AEIOUaeiou";
    letters=str.split("");
    for(let i=0;i<=letters.length;i+=1){
        if (vowel.includes(letters[i])) {
            letters.splice(i, 1);  
            i-=1;  
        }
    }
    str=letters.join("");
    return str;
  }

console.log(disemvowel("This website is for losers LOL!"));