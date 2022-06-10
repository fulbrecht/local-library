const { findAuthorById } = require("./books");

function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    return accountA.name["last"].toLowerCase() > accountB.name["last"].toLowerCase() ? 1 : -1;
  });
}

function getTotalNumberOfBorrows({id}, books) {
  let count = 0;
  books.forEach(book => {
    let borrows = book.borrows.filter(borrow => borrow.id === id);
    count += borrows.length;
  })
  return count;
}

function isPossesedByAccountId(id, book){
  let possessed = false;
  book.borrows.forEach(borrow => {
    if (borrow.id === id && !borrow.returned) possessed = true;
  })
  return possessed;
}

function getBooksPossessedByAccount({id}, books, authors) {
  let possessed = [];
  books.forEach(book => {
    if (isPossesedByAccountId(id, book)) {
      possessed.push({...book, author : findAuthorById(authors, book.authorId)});
    }
  })
  return possessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
