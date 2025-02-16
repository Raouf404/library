"use strict";

// Getting Elements
const main = document.querySelector("main");
const addBtn = document.getElementById("add");

// Library creation
const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.setRead = function (bool) {
  this.read = bool;
};

function addBookToLibrary(book) {
  library.push(book);
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary(book1);
const book2 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, false);
addBookToLibrary(book2);
const book3 = new Book("The Silmarillion", "J.R.R. Tolkien", 365, false);
addBookToLibrary(book3);
const book4 = new Book("The Children of Húrin", "J.R.R. Tolkien", 313, true);
addBookToLibrary(book4);

// Functions
function renderLib() {
  main.innerHTML = "";
  library.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div>
        <h2 class="title">${book.title}</h2>
        <div class="info">
          <span>Author: ${book.author}</span>
          <span>${book.pages} pages</span>
          <span>${book.read ? "Read" : "Not read"}</span>
        </div>
      </div>
      <div class="buttons">
          <button class="read" id="read_${index}">Read</button>
          <button class="delete" id="delete_${index}">Delete</button>
      </div>
    `;

    main.appendChild(card);
  });
  main.innerHTML += `
      <form>
        <h2>Add a book</h2>
        <div>
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            required
            placeholder="Ex. Harry Potter & the prisonor of Azkaban"
          />
        </div>
        <div>
          <label for="author">Author</label>
          <input type="text" id="author" required placeholder="Ex. J.K Rowlin" />
        </div>
        <div>
          <label for="pages">Number of pages</label>
          <input type="number" id="pages" required placeholder="Ex. 295" />
        </div>
        <div>
          <label for="isRead">Did you finish reading this book?</label>
          <input type="checkbox" id="isRead" />
        </div>
        <button id="addBook">Add</button>
      </form>
  `;
}

// Event Listeners
document.addEventListener("DOMContentLoaded", renderLib);

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("read")) {
    const index = event.target.id.split("_")[1];
    library[index].read = !library[index].read;
    renderLib();
  }
  if (event.target.classList.contains("delete")) {
    const index = event.target.id.split("_")[1];
    library.splice(index, 1);
    renderLib();
  }
});

addBtn.addEventListener("click", () => {
  const form = document.querySelector("form");
  form.classList.toggle("appear");
  addBtn.innerText = form.classList.contains("appear")
    ? "Cancel"
    : "Add a book";
});

main.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  const book = new Book(title, author, pages, isRead);
  library.push(book);

  const form = document.querySelector("form");
  form.classList.toggle("appear");
  addBtn.innerText = form.classList.contains("appear")
    ? "Cancel"
    : "Add a book";

  renderLib();
});
