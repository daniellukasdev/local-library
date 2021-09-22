const findAccountById = (accounts, id) => accounts.find(account => account.id === id);

const sortAccountsByLastName = (accounts) => accounts.sort((accA, accB) => 
    accA.name.last.toLowerCase() > accB.name.last.toLowerCase() ? 1 : -1);

const getTotalNumberOfBorrows = (account, books) => {
  // iterate over the books array
  return books.reduce((acc, book) => {
    // store the count taken from 
    const count = book.borrows.reduce((borrowAcc, borrow) => {
      return borrow.id === account.id ? borrowAcc + 1 : borrowAcc
    }, 0)
    return acc + count;
  }, 0);
}

const getBooksPossessedByAccount = (account, books, authors) => {
  // iterate over the book object 
  return books.filter((book) => {
    // store the most recent borrow 
    const recent = book.borrows[0]
    // check if the account id matches the id in borrows
    // and isn't the most recent borrow
    return !recent.returned && recent.id === account.id;
  })
  // iterate over the book object
  .map((book) => {
    // iterate over the authors array and store the author object
    // that matches the author id in the book object
    const author = authors.find((author) => author.id === book.authorId);
    // return the book object with the author object added to it
    return {...book, author};
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
