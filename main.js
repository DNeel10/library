const addBookButton = document.querySelector("#add-btn");
const bookForm = document.querySelector(".book-form");
const bookSubmitButton = document.querySelector(".btn-submit");

class Library {
  constructor() {
    this.books = [];
  }
  addBook(book) {
    this.books.push(book);
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = this.read === "read" ? "not read" : "read";
  }
}

const library = new Library();
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 310, "read");
const hp1 = new Book(
  "Harry Potter and the Sorcerer's Stone",
  "J.K. Rowling",
  459,
  "read"
);
const wfr = new Book("Wizard's First Rule", "Terry Goodking", 836, "read");

library.addBook(theHobbit);
library.addBook(hp1);
library.addBook(wfr);

console.log(library);

function displayBooks(library) {
  const container = document.querySelector(".library");
  container.innerHTML = "";

  library.books.forEach((book, i) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const title = document.createElement("h2");
    title.textContent = book.title;
    bookDiv.appendChild(title);

    title.classList.add("book__title");

    // add Information about the book
    const about = document.createElement("div");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");
    author.textContent = "Author: " + book.author;
    pages.textContent = "Pages: " + book.pages;
    read.textContent = book.read === "read" ? "Read" : "Not Read";

    // append the sections to the book div
    about.appendChild(author);
    about.appendChild(pages);
    about.appendChild(read);

    //append the about section to the book div
    bookDiv.appendChild(about);
    about.classList.add("about");

    // delete book button
    const deleteBook = document.createElement("button");
    deleteBook.textContent = "Delete Book";
    deleteBook.addEventListener("click", () => {
      bookDiv.remove();

      library.books.splice(i, 1);
      displayBooks(library);
    });

    const readButton = document.createElement("button");
    readButton.textContent =
      book.read === "read" ? "Mark as Unread" : "Mark as Read";
    readButton.addEventListener("click", (e) => {
      e.preventDefault();

      book.toggleRead();
      readButton.textContent =
        book.read === "read" ? "Mark as Unread" : "Mark as Read";
      displayBooks(library);
    });

    bookDiv.appendChild(deleteBook);
    bookDiv.appendChild(readButton);
    deleteBook.classList.add("btn", "btn-remove");
    readButton.classList.add("btn", "btn-toggle");

    // append the bookdiv to the dom
    container.appendChild(bookDiv);
    bookDiv.classList.add("book");
    bookDiv.dataset.book = i;
  });
}

addBookButton.onclick = function () {
  bookForm.classList.toggle("hidden");
  addBookButton.innerText === "Add Book"
    ? (addBookButton.innerText = "Cancel")
    : (addBookButton.innerText = "Add book");
  const titleInput = bookForm.querySelector("#title");
  titleInput.focus();
};

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let bookTitle = bookForm.querySelector("#title").value;
  let bookAuthor = bookForm.querySelector("#author").value;
  let bookPages = bookForm.querySelector("#pages").value;
  let bookRead = bookForm.querySelector('input[name="read"]:checked').value;

  let book = new Book(bookTitle, bookAuthor, bookPages, bookRead);

  library.addBook(book);
  displayBooks(library);
  bookForm.reset();
  bookForm.classList.toggle("hidden");
  addBookButton.innerText = "Add Book";
});

displayBooks(library);
