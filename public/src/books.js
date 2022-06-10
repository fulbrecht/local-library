// const { findAccountById } = require("./accounts");
// When I try to import findAccountById using the line above it doesn't seem to work.
// I get an error when I try to call findAccountByID in the getBorrowersForBook function. "TypeError: findAccountById is not a function"


function findAuthorById(authors, id) {
  let result = {};
  authors.forEach(author => {
    if (author.id === id) result = author;
  });
  return result;
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function isBorrowed({borrows}) {
  return !borrows[0].returned;
} 

function partitionBooksByBorrowedStatus(books) {
  let borrowed = [];
  let available = [];
  
  books.forEach(book => {
    isBorrowed(book) ? borrowed.push(book) : available.push(book);
  })

  return [borrowed, available];
}

function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function getBorrowersForBook({borrows}, accounts) {
  let borrowers = [];
  borrows.forEach(borrow => {
    const id = borrow.id;
    const status = borrow.returned;
    const account = findAccountById(accounts, id);
    if (borrowers.length < 10) {
      borrowers.push({...account, returned : status });
    }
  })
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
