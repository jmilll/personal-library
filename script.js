
window.addEventListener('load', (e) => {e.preventDefault()});
const submitButton = document.getElementById('submit-button');
const addNewButton = document.getElementById('add-book');
const cancelButton = document.getElementById('cancel-form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const finished = document.getElementById('finished');
const formContainer = document.querySelector('.form-container');
const booksContainer = document.querySelector('.books-container');

let library = [
    {title: 'Lord of The Rings', author: 'J.R.R. Tolkien', pages: '1323', read: false },
    {title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', pages: '148', read: true },
    {title: 'The Last Wish', author: 'Andrzej Sapkowski', pages: '288', read: false },
];

let newBook;

//Test for local storage
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

// If theres local storage do this
if (storageAvailable('localStorage')) {
    restore();
  }
  else {
    alert('No local storage available for saving books :( you can add/remove, but changes will not appear upon refresh')
}

// setting Library to be stored in local storage
function setData() {
    localStorage.setItem(`library`, JSON.stringify(library));
}

//pulls books from local storage when page is refreshed
function restore() {
    if(!localStorage.library) {
        renderLibrary();
    }else {
        let objects = localStorage.getItem('library') // gets information from local storage to use in below loop to create DOM/display
        let newObjects = JSON.parse(objects);
        library = newObjects;
        renderLibrary();
    }
}

function renderLibrary() {
    const books = document.querySelectorAll('.book-card');
    books.forEach(book => booksContainer.removeChild(book));
    //render backward for newest first
    for (let i=library.length - 1; i>=0; i--){
        createBookCard(library[i]);
    }
}

function createBookCard(item) {
    
    const newBookCard = document.createElement('div');
    newBookCard.setAttribute('class', 'book-card');
    newBookCard.setAttribute('value', item.title);
    newBookCard.setAttribute('id', library.indexOf(item));

    const newSectionTitle = document.createElement('h3');
    newSectionTitle.setAttribute('class', 'book-header');
    newSectionTitle.textContent = 'Title:';
    const bookTitle = document.createElement('p');
    bookTitle.textContent = item.title; 

    const newSectionAuthor = document.createElement('h3');
    newSectionAuthor.setAttribute('class', 'book-header');
    newSectionAuthor.textContent = 'Author:';
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = item.author;

    const newSectionPages = document.createElement('h3');
    newSectionPages.setAttribute('class', 'book-header');
    newSectionPages.textContent = 'Pages:';
    const bookPages = document.createElement('p');
    bookPages.textContent = item.pages;

    const newSectionFinish = document.createElement('h3');
    newSectionFinish.setAttribute('class', 'book-header');
    newSectionFinish.textContent = 'Finished:';
    const bookFinish = document.createElement('p');
    if (item.read === true) {
        bookFinish.textContent = "Finished";
    } else {
        bookFinish.textContent = 'Not Read';
    }

    const newDeleteButton = document.createElement('button');
    newDeleteButton.setAttribute('class', 'delete');
    newDeleteButton.setAttribute('value', item.title);
    newDeleteButton.textContent = 'x';

    const newReadButton = document.createElement('button');
    newReadButton.setAttribute('class', 'read-status');
    if (item.read === true) {
        newReadButton.textContent = 'Read';
        newReadButton.classList.add('read');
    } else {
        newReadButton.textContent = 'Not Read';
    }

    booksContainer.prepend(newBookCard);
    newBookCard.appendChild(newSectionTitle);
    newBookCard.appendChild(bookTitle);
    newBookCard.appendChild(newSectionAuthor)
    newBookCard.appendChild(bookAuthor)
    newBookCard.appendChild(newSectionPages)
    newBookCard.appendChild(bookPages)
    newBookCard.appendChild(newSectionFinish)
    newBookCard.appendChild(bookFinish)
    newBookCard.appendChild(newDeleteButton)
    newBookCard.appendChild(newReadButton)
}

let deleteButtonValue = '';

//--DYNAMICALLY SELECT BUTTONS INCLUDING ONES THAT ARE NOT CREATED--
booksContainer.addEventListener('click', (e) => {
    //e.preventDefault();
    if (!e.target) { return; }
    if (e.target.matches('.delete')) {
        
        e.target.closest('div').remove();
        
        deleteButtonValue = e.target.value;
        removeBook();
        setData();
        renderLibrary();
    }
});

document.querySelector('div.books-container').addEventListener('click', (e) => {
    //e.preventDefault();
    if (!e.target) { return; }
    if (e.target.matches('.read-status')) {

        e.target.classList.toggle("read");

        //select the correct element read status. ex: library[1].read = false  
            //console.log(library[e.target.parentElement.id].read)

        const finishedStatus = e.target.parentElement.querySelector('p:nth-child(8)');
        if (finishedStatus.textContent === "Finished") {
            finishedStatus.textContent = 'Not Read';
            //change the read status at an object level for saving in local storage
            library[e.target.parentElement.id].read = false;
        } else {
            finishedStatus.textContent = 'Finished';
            library[e.target.parentElement.id].read = true;
        }
        
        if (e.target.textContent === 'Read') {
            e.target.textContent = 'Not Read'
        } else {
            e.target.textContent = 'Read'
        }
    } 
    setData();
});

function checkGlobal() {
    console.log(deleteButtonValue)
    val = deleteButtonValue
    console.log('val = ' + val)
}

function removeBook() {
    for (i =0; i<library.length; i++) {
        if (library[i].title === deleteButtonValue) {
            library.splice(i, 1);
        }
    }
}

function toggleForm() {
    document.querySelector('.form-container').classList.toggle("open");
}

function book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
} 

addNewButton.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForm();
});

// CANCEL BUTTON ANYWHERE IN DOC CAUSES FORM TO NOT 'REQUIRE'
cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    clearForm();
    toggleForm();
});

// Clear all memory and return to demo
const resetButton = document.getElementById('memory-reset');
resetButton.addEventListener('click', clearMemory)

function clearMemory() {
    localStorage.clear();
    location.reload();
    return false;
}

function clearForm() {
    formContainer.querySelectorAll('input').forEach(input => input.value = '');
}

submitButton.addEventListener('click', (e) => {
    if (!title.value || !author.value || !pages.value) return;
    e.preventDefault();
    addBookToLibrary();
});

function addBookToLibrary() {
        //unshift instead of push, to make the new book added index always 0
        newBook = new book(title.value, author.value, pages.value, finished.checked);
        library.unshift(newBook);
        setData();
        renderLibrary();
        clearForm();
        toggleForm();
}
