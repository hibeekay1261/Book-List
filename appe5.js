class Book {
    constructor (title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');

    // create tr Element
    const row = document.createElement('tr');

    // insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);


    }

    showAlert(message, className) {
        // create div
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // insert form
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);

    // Timeout after 3 secs
    setTimeout(function (){
        document.querySelector('.alert').remove();
    }, 3000);

    }
    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
    
        }
    

    }

    clearFields(){
        document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

    }
}
// local storage class
class Store {
   static getBooks(){
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;
            // Add book to UI
            ui.addBookToList(book);

        });
    }
    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }
    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}
// DOM LOAD EVENT 

document.addEventListener('DOMContentLoaded', Store.displayBooks);
// Event Listener
document.getElementById('book-form').addEventListener('submit',
function(e) {

    // Get form values
const title = document.getElementById('title').value,
        author = document.getElementById('author').value;
         isbn = document.getElementById('isbn').value;
    // instantiate Book
         const book = new Book(title, author, isbn);

        //  instantiate Ui
        const ui = new UI();

        // validate
        if (title === '' || author === '' || isbn === '' ) {
            // error Alert
            ui.showAlert('please fill in all feilds', 'error');
        } else {
            // Add book to list
        ui.addBookToList(book);

        // Add to Ls
        Store.addBook(book);

        // show success
        ui.showAlert('Book Added', 'success');

        // clear feilds
        ui.clearFields();

        }


            e.preventDefault();
})


// Event listener for deleteion
document.getElementById('book-list').addEventListener
('click', function(e){

    // instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);

    // Remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // show message
    ui.showAlert('Book Removed', 'success');


    e.preventDefault();
})