/*Ви, ймовірно, знаєте систему "лайків" з Facebook та інших сторінок. Люди можуть "лайкати" дописи в блогах, зображення або інші елементи. Ми хочемо створити текст, який повинен відображатися поруч з таким елементом.

Реалізуйте функцію, яка приймає масив, що містить імена людей, які лайкнули елемент. Вона повинна повернути текст для відображення, як показано в прикладах:
[]                                -->  "no one likes this"
["Peter"]                         -->  "Peter likes this"
["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"
Примітка: Для 4 або більше імен число в "and 2 others" просто збільшується.*/

function likes(names) {
    if (names.length === 0) {
        return "no one likes this";
    } else if (names.length === 1) {
        return names[0] + " likes this";
    } else if (names.length === 2) {
        return names[0] + " and " + names[1] + " like this";
    } else if (names.length === 3) {
        return names[0] + ", " + names[1] + " and " + names[2] + " like this";
    } else {
        let otherPeople = names.length - 2;
        return names[0] + ", " + names[1] + " and " + otherPeople + " others like this";
    }
}

  arr=["Jacob", "Alex"];
  console.log(likes(arr));