/*Створіть масив з трьох імен. Додайте нове ім'я до кінця масиву і 
виведіть його.
Видаліть перший елемент масиву і виведіть його.
Знайдіть індекс елемента зі значенням "John" в масиві 
["Mike", "John", "Sara"].
*/
const names =["Dmytro", "Sasha","Bogdan"];
names.push("Egor");
console.log(names);

names.shift();
console.log(names);

const otherNames=["Mike","John","Sara"];

let johnIndex=otherNames.indexOf("John");
console.log(johnIndex);