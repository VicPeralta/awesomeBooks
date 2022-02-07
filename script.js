function loadDataFromStorage() {
  let list = JSON.parse(window.localStorage.getItem('bookshelf'));
  if (!list) {
    // If it is empty then fill some data to work
    list = [
      {
        id: 0,
        title: 'Book 1',
        author: 'Test test',
      },
      {
        id: 1,
        title: 'Book 2',
        author: 'Test test',
      },
      {
        id: 2,
        title: 'Book 3',
        author: 'Test test',
      },
      {
        id: 3,
        title: 'Book 4',
        author: 'Test test',
      },
    ];
  }
  return list;
}

function saveData(bookList) {
  window.localStorage.setItem('bookshelf', JSON.stringify(bookList));
}

function addBook(title, author, bookList) {
  let index = 0;
  if (bookList.length !== 0) {
    index = bookList[bookList.length - 1].id + 1;
  }
  bookList.push({
    id: index,
    title,
    author,
  });
}

function BookShelf() {
  this.bookList = loadDataFromStorage();
  // Add functions to delete and to add a book
  this.removeBook = (id) => {
    this.bookList = this.bookList.filter((book) => book.id !== Number(id));
  };
}

const gBookShelf = new BookShelf();

function displayBooks(bookList) {
  saveData(bookList);
  const booksContainer = document.querySelector('.books-container');
  const booksTemplate = document.getElementById('books-template');
  booksContainer.innerHTML = '';
  bookList.forEach((book) => {
    const bookCard = booksTemplate.content.cloneNode(true).children[0];
    bookCard.querySelector('.title').textContent = book.title;
    bookCard.querySelector('.author').textContent = book.author;
    bookCard.querySelector('.remove-book').setAttribute('data-id', book.id);
    booksContainer.appendChild(bookCard);
  });
}

function setListeners() {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.remove-book')) {
      gBookShelf.removeBook(e.target.dataset.id);
      displayBooks(gBookShelf.bookList);
    }
    if (e.target.matches('.add-btn')) {
      const title = document.getElementById('title');
      const author = document.getElementById('author');
      if (!title.checkValidity()) {
        title.reportValidity();
        return;
      }
      if (!author.checkValidity()) {
        author.reportValidity();
        return;
      }
      addBook(title.value, author.value, gBookShelf.bookList);
      title.value = '';
      author.value = '';
      displayBooks(gBookShelf.bookList);
    }
  });
}

displayBooks(gBookShelf.bookList);
setListeners();