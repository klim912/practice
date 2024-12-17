/*Напишіть функцію, яка приймає два числа і повертає їх суму.
Напишіть функцію, яка приймає рядок і повертає його в верхньому регістрі.
Напишіть функцію, яка приймає масив чисел і повертає новий масив з квадратами цих чисел.*/

function sum(firstNumber,secondNumber){
    return firstNumber+secondNumber;
}
console.log(sum(2,5));

function upperCase(text){
    return text.toUpperCase();
}
console.log(upperCase("hello"));

function squared(array){
    return array.map(number=>Math.pow(number,2));
}
const array=[3,6,9,12];

console.log(squared(array));