class BookShelf {
  constructor() {
    this.#loadDataFromStorage();
  }

  #loadDataFromStorage() {
    this.bookList = JSON.parse(window.localStorage.getItem('bookshelf'));
    if (!this.bookList) this.bookList = [];
  }

  saveData() {
    window.localStorage.setItem('bookshelf', JSON.stringify(this.bookList));
  }

  addBook(title, author) {
    let index = 0;
    if (this.bookList.length !== 0) {
      index = this.bookList[this.bookList.length - 1].id + 1;
    }
    this.bookList.push({
      id: index,
      title,
      author,
    });
  }

  removeBook(id) {
    this.bookList = this.bookList.filter((book) => book.id !== Number(id));
  }
}

function getEndDay(day) {
  const iDay = Number(day);
  if (iDay > 3 && iDay < 21) return 'th';
  switch (iDay % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function updateDate() {
  const dt = new Date();
  let month = dt.toLocaleString('en-US', { month: 'long' });
  const day = dt.toLocaleString('en-US', { day: 'numeric' });
  const endDay = getEndDay(day);
  const year = dt.toLocaleString('en-US', { year: 'numeric' });
  const time = dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });
  month += ` ${day}${endDay} ${year}, ${time}`;
  document.querySelector('.datetime p').textContent = month;
}

window.setInterval(updateDate, 1000);
const gBookShelf = new BookShelf();

function displayBooks(bookList) {
  gBookShelf.saveData(bookList);
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
      gBookShelf.addBook(title.value, author.value, gBookShelf.bookList);
      title.value = '';
      author.value = '';
      displayBooks(gBookShelf.bookList);
    }
    if (e.target.matches('.navlinks li a')) {
      const href = e.target.href;
      const index = href.indexOf('#');
      const section = href.substring(index);
      navToSection(e.target, section);
    }
  });
}

function navToSection(element, sectionName) {
  const navLinks = document.querySelectorAll('.navlinks li a');
  navLinks.forEach((link) => {
    link.classList.remove('selected')
  });
  element.classList.add('selected');
  const section = document.querySelector(sectionName);
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    section.classList.remove('active');
  });
  section.classList.add('active');
}

displayBooks(gBookShelf.bookList);
setListeners();