
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

let library = [];

function createBookCard() {
    
    const newBookCard = document.createElement('div');
    newBookCard.setAttribute('class', 'book-card');
    newBookCard.setAttribute('value', library[0].title);
    //newBookCard.setAttribute('value', library[bookInLibrary].title);

    const newSectionTitle = document.createElement('h3');
    newSectionTitle.setAttribute('class', 'book-header');
    newSectionTitle.textContent = 'Title:';
    const bookTitle = document.createElement('p');
    bookTitle.textContent = library[0].title; // access first book in array (always new book with 'unshift')

    const newSectionAuthor = document.createElement('h3');
    newSectionAuthor.setAttribute('class', 'book-header');
    newSectionAuthor.textContent = 'Author:';
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = library[0].author;

    const newSectionPages = document.createElement('h3');
    newSectionPages.setAttribute('class', 'book-header');
    newSectionPages.textContent = 'Pages:';
    const bookPages = document.createElement('p');
    bookPages.textContent = library[0].pages;

    const newSectionFinish = document.createElement('h3');
    newSectionFinish.setAttribute('class', 'book-header');
    newSectionFinish.textContent = 'Finished:';
    const bookFinish = document.createElement('p');
    if (library[0].read === true) {
        bookFinish.textContent = "Finished";
    } else {
        bookFinish.textContent = 'Not Read';
    }

    const newDeleteButton = document.createElement('button');
    newDeleteButton.setAttribute('class', 'delete');
    newDeleteButton.setAttribute('value', library[0].title);
    newDeleteButton.textContent = 'x';

    const newReadButton = document.createElement('button');
    newReadButton.setAttribute('class', 'read-status');
    if (library[0].read === true) {
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

//DYNAMICALLY SELECT BUTTONS INCLUDING ONES THAT ARE NOT CREATED!!!
booksContainer.addEventListener('click', (e) => {
    //e.preventDefault();
    if (!e.target) { return; }
    if (e.target.matches('.delete')) {
        
        e.target.closest('div').remove();
        
        //console.log('value = '+ e.target.value)
        //let tVal = e.target.value;
        //console.log(tVal);
        //deleteButtonValue = tVal;
        deleteButtonValue = e.target.value;
        removeBook();
    }
});

document.querySelector('div.books-container').addEventListener('click', (e) => {
    //e.preventDefault();
    if (!e.target) { return; }
    if (e.target.matches('.read-status')) {
        //console.log('toggle attempt')
        //event.target.closest('div').toggleClass('read')
        
        //e.target.parentElement.classList.toggle("read");
        e.target.classList.toggle("read");

        const finishedStatus = e.target.parentElement.querySelector('p:nth-child(8)');
        if (finishedStatus.textContent === "Finished") {
            finishedStatus.textContent = 'Not Read'
        } else {
            finishedStatus.textContent = 'Finished'
        }
        //console.log(finishedStatus)
        
        if (e.target.textContent === 'Read') {
            e.target.textContent = 'Not Read'
        } else {
            e.target.textContent = 'Read'
        }

    } 
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
            console.log(library)
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
    //this.info = function() {
    //    return this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + this.read;
    //}
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

function clearForm() {
    formContainer.querySelectorAll('input').forEach(input => input.value = '');
}

submitButton.addEventListener('click', (e) => {
    if (!title.value || !author.value || !pages.value) return;
    e.preventDefault();
    
    //unshift instead of push, to make the new book added index always 0
    library.unshift(new book(title.value, author.value, pages.value, finished.checked));
    //library.push(newBook);
    console.log(library);
    createBookCard();
    clearForm();
    toggleForm();
});