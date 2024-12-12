/*Створіть об'єкт, який представляє книгу з властивостями title, author та year.
Додайте нову властивість genre до об'єкта книги.
Видаліть властивість year з об'єкта книги.*/

let book ={
    title: "example_title",
    author: "example_author",
    year: "2004"
};
console.log(book);

book.genre="example_genre";
console.log(book);

delete book.year;
console.log(book);