function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}

function EBook(title, author, year, fileSize) {
    Book.call(this, title, author, year);
    this.fileSize = fileSize;
    this.downloadEBook = () => {
        console.log(`Downloading ${this.title}, authored by ${this.author}, size: ${this.fileSize}MB`);
    };
}

Book.prototype.getInfo = function() {
    console.log(`${this.title} was written by ${this.author}`);
}

EBook.prototype = Object.create(Book.prototype);
EBook.prototype.constructor = EBook;


const book = new Book("Murder on the Orient Express", "Agatha Christie", 1934);
const ebook = new EBook("1984", "George Orwell", 1949, 2);

