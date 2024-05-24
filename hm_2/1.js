class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

  displayInfo() {
    console.log(`Title: ${this.title}`);
    console.log(`Author: ${this.author}`);
    console.log(`Pages: ${this.pages}`);
  }
}

// Пример использования класса
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180);
book1.displayInfo();
// Вывод:
// Title: The Great Gatsby
// Author: F. Scott Fitzgerald
// Pages: 180

const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281);
book2.displayInfo();
// Вывод:
// Title: To Kill a Mockingbird
// Author: Harper Lee
// Pages: 281
