var books = [];
var editIndex = -1;  

// The questions array for book information and deletion
var questions = [
    "Insert the information of your book",
    "Title:",
    "Author:",
    "Year published:",
    "Is it read or unread book?",
    "Enter the number of the book you want to delete :",
    "Enter the number of the book you want to edit :"
];

// Function to add a book
function addBook() {
    alert(questions[0]);
    var title = prompt(questions[1]);
    var author = prompt(questions[2]);
    var year = prompt(questions[3]);
    var read = prompt(questions[4]);

    var book = {
        title: title,
        author: author,
        year: year,
        read: read
    };
    books.push(book);
}

// Function to delete a book
function deleteBook() {
    const bookNumber = prompt(questions[5]); 
    var index = parseInt(bookNumber) - 1;  

    if (isNaN(index) || index < 0 || index >= books.length) {
        alert("Invalid number! Please enter a valid number.");
        return;
    }

    books.splice(index, 1);  
    viewAllBooks();  
}

// Function to show the edit modal
function openModal(index) {
    editIndex = index;
    var book = books[index];
    document.getElementById('editTitle').value = book.title;
    document.getElementById('editAuthor').value = book.author;
    document.getElementById('editYear').value = book.year;
    document.getElementById('editRead').value = book.read;
    document.getElementById('editModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Function to save changes made in the modal
function saveChanges() {
    var newTitle = document.getElementById('editTitle').value;
    var newAuthor = document.getElementById('editAuthor').value;
    var newYear = document.getElementById('editYear').value;
    var newRead = document.getElementById('editRead').value;

    books[editIndex] = {
        title: newTitle,
        author: newAuthor,
        year: newYear,
        read: newRead
    };

    viewAllBooks(); 
    closeModal();  
}

// Function to handle sorting of books
function sortBooks(filteredBooks) {
    var sortOption = document.getElementById('sortSelect').value;

    switch (sortOption) {
        case "title":
            return filteredBooks.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        case "author":
            return filteredBooks.sort((a, b) => a.author.toLowerCase().localeCompare(b.author.toLowerCase()));
        case "yearAsc":
            return filteredBooks.sort((a, b) => a.year - b.year);
        case "yearDesc":
            return filteredBooks.sort((a, b) => b.year - a.year);
        default:
            return filteredBooks;  
    }
}

// Function to view all books with search, filter, and sorting
function viewAllBooks() {
    var bookListContainer = document.getElementById("book-list");
    var searchQuery = document.getElementById("searchInput").value.toLowerCase();
    var filterStatus = document.getElementById("filterSelect").value;

    bookListContainer.innerHTML = "";  

    var filteredBooks = books.filter(function(book) {
        var matchesSearch = book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery);
        var matchesStatus = filterStatus === "" || book.read.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    filteredBooks = sortBooks(filteredBooks);

    if (filteredBooks.length === 0) {
        bookListContainer.innerHTML = "<p>No books found.</p>";
    } else {
        filteredBooks.forEach(function(book, index) {
            var bookInfo = `
                <p><strong>Book ${index + 1}:</strong></p>
                <p><strong>Title:</strong> ${book.title}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Year:</strong> ${book.year}</p>
                <p><strong>Status:</strong> ${book.read}</p>
                <button onclick="openModal(${index})">Edit</button>
                <hr>
            `;
            bookListContainer.innerHTML += bookInfo;
        });
    }
}
