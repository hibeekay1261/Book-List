// Book construchtor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI () {}


UI.prototype.addBookToList = function (book){
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

// show Alert
UI.prototype.showAlert = function (message, className) {
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

// Delete Book
UI.prototype.deleteBook = function (target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();

    }
}
//clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


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

        }


        // Add book to list
        ui.addBookToList(book);

        // show success
        ui.showAlert('Book Added', 'success');

        // clear feilds
        ui.clearFields();
    e.preventDefault();
})


// Event listener for deleteion
document.getElementById('book-list').addEventListener
('click', function(e){

    // instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);

    // show message
    ui.showAlert('Book Removed', 'success');


    e.preventDefault();
})