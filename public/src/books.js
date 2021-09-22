const findAuthorById = ((authors, id) => authors.find(author => author.id === id));

const findBookById = (books, id) => books.find(book => book.id === id);

function partitionBooksByBorrowedStatus(books) {
  return books.reduce((acc, book) => {
    // declare an array where index 0 and 1 are variables
    const [borrowed, returned] = acc
    // create a variable to store the most recent returned status
    const recent = book.borrows[0];
    // if the returned is true add the book object to 
    // the returned variable
    if (recent.returned) returned.push(book);
    // if the book is not returned add book object to
    // the borrowed variable
    else borrowed.push(book);
    return acc;
  }, [[], []]);
}

function getBorrowersForBook(book, accounts) {
  // iterate over accounts array to get ids
  const idsByAccount = accounts.reduce((acc, account) => {
    acc[account.id] = account;
    return acc;
  }, {});
  // look at borrows to match account ids
  return book.borrows.map(({id, returned}) => ({
    ...idsByAccount[id],
    returned
  }))
  // return the first ten
  .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
