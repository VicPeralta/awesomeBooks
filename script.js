const bookList = [
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

function BookShelf() {
  this.bookList = loadDataFromStorage();
  // Add functions to delete and to add a book
}

const gBookShelf = new BookShelf();

function displayBooks(bookList) {
  const booksContainer = document.querySelector('.books-container');
  const booksTemplate = document.getElementById('books-template');
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
      console.log(e.target.dataset.id);
    }
  });

}

displayBooks(gBookShelf.bookList);
setListeners();