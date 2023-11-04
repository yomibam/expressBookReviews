const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "Customer successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "Customer already exists!" });
    }
  }
});

// Get the book list available in the shop

public_users.get("/", function (req, res) {
    //Write your code here
    res.send(JSON.stringify({ books }, null, 4));
    return res.status(300).json({ message: "Yet to be implemented" });
  });

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn]);
  });
  
// Get book details based on author
public_users.get("/author/:author", function (req, res) {
    //Write your code here
    const author = req.params.author;
    const bookKeys = Object.values(books);
    let filtered_authors = bookKeys.filter((book) => book.author === author);
    res.send(filtered_authors);
  });

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
    //Write your code here
    const title = req.params.title;
    const bookKeys = Object.values(books);
    let filtered_titles = bookKeys.filter((book) => book.title === title);
    res.send(filtered_titles);
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const review = req.params.isbn;
  let bookReviews = books[review];
  res.send(bookReviews.reviews);
});

//PROMISE CALLBACKS

//TASK 10
public_users.get('/async-get-books',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });
      get_books.then(() => console.log("Promise resolved"));
  });

  //TASK 11
  public_users.get('/async-get-by-isbn/:isbn',function (req, res) {
    const get_by_isbn = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;
        resolve(res.send(books[isbn]));
      });
      get_by_isbn.then(() => console.log("Promise resolved"));
  });

  //TASK 12
  public_users.get('/async-get-by-author/:author',function (req, res) {
    const get_by_author = new Promise((resolve, reject) => {
        const author = req.params.author;
        const bookKeys = Object.values(books);
        let filtered_authors = bookKeys.filter((book) => book.author === author);
        resolve(res.send(filtered_authors));
      });
      get_by_author.then(() => console.log("Promise resolved"));
  });

  //TASK 13
  public_users.get('/async-get-by-title/:title',function (req, res) {
    const get_by_title = new Promise((resolve, reject) => {
        const title = req.params.title;
        const bookKeys = Object.values(books);
        let filtered_titles = bookKeys.filter((book) => book.title === title);
        resolve(res.send(res.send(filtered_titles)));
      });
      get_by_title.then(() => console.log("Promise resolved"));
  });

module.exports.general = public_users;
