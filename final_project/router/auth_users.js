const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );
    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const book_isbn = req.params.isbn;
    let filtered_book = books[book_isbn];
    if (filtered_book) {
      let new_review = req.query.reviews;
      for (var key in books) {
        if (books.hasOwnProperty(key)) {
          var value = books[key];
          if (key == book_isbn) {
            value["reviews"] = new_review;
          }
        }
      }
  
      res.send(
        `A review for the book with isbn ${book_isbn} has been added/updated successfully. `
      );
    }
  });
  
  regd_users.delete("/auth/review/:isbn", (req, res) => {
    user_name = req.body.username;
    const book_isbn = req.params.isbn;
    let filtered_book = books[book_isbn];
    if (filtered_book) {
      let new_review = {};
      for (var key in books) {
        if (books.hasOwnProperty(key)) {
          var value = books[key];
          if (key == book_isbn) {
            value["reviews"] = new_review;
          }
        }
      }
  
      res.send(
        `The review by ${user_name} for the book with isbn ${book_isbn} has been deleted successfully. `
      );
    }
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
