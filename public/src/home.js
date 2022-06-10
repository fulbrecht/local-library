//const { isBorrowed } = require("./books");
//helper function from books.js
function isBorrowed({borrows}) {
  return !borrows[0].returned;
}

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((total, book) =>isBorrowed(book) ? total + 1 : total, 0);
}

function getMostCommonGenres(books) {
  let bookList = {};
  let result = [];

  //build bookList object w/ genres as keys and counts as values
  books.forEach( book => {
    const genre = book.genre;
    if (Object.keys(bookList).includes(genre)) {
      bookList[genre] += 1;
    } else {
      bookList[genre] = 1;
    }
    //console.log(bookList);
  });
  
  //build results array using bookList object as foundation
  Object.keys(bookList).forEach(genre => {
    if (result.length < 5){
      result.push({"name" : genre , "count" : bookList[genre]})
    }
    //console.log(result);
  })

  //return sorted result array
  return result.sort((genreA, genreB) => {
    return genreB.count - genreA.count;
  });
}

function getMostPopularBooks(books) {
  let result = [];

  //map books to correct format in result array 
  result = books.map(book => {
    return {"name": book.title, "count": book.borrows.length};
  });

  //sort books based on borrow count
  result.sort( (bookA, bookB) => {
    return bookB.count - bookA.count;
  });

  //return first 5 books of the array
  return result.slice(0,5);
}


function getMostPopularAuthors(books, authors) {
  let authorList = {};
  let results = [];
  //itterate through books and build an authorList object to hold author ids in Keys, and borrow count as values
  books.forEach(book => {
    if (Object.keys(authorList).includes(book.authorId)){
      authorList[book.authorId] += book.borrows.length;
    } else {
      authorList[book.authorId] = book.borrows.length;
    }
  });

  //build results array using authorList
  Object.keys(authorList).forEach(author => {
    let authorName = authors.find(authorElement => authorElement["id"] == author).name;
    let name = `${authorName.first} ${authorName.last}`; 
    let count = authorList[author];
    results.push({name, count});
  })

  //sort results list
  results.sort((authorA, authorB) => {
    return authorB.count - authorA.count;
  })

  //return sliced results array 
  return results.slice(0,5);

}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
