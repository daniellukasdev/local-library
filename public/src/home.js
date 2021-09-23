const getTotalBooksCount = (books) => {
  // Count the books array (get length)
  return books.length
}

const getTotalAccountsCount = (accounts) => {
  // count the accounts to get the count
  return accounts.length;
}

const getBooksBorrowedCount = (books) => {
  // iterate through books array 
  return books.reduce((acc, book) => {
    // if most recent borrow returns false, add 1 to accumulator
    return (!book.borrows[0].returned) ? acc += 1 : acc;
  }, 0);

}

// helper function to sort objects into an array
function _objectSortedValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    };
  });
};

// for these 3, look at the IDs, they give access to all the data
function getMostCommonGenres(books) {
  // iterate over the books array, counting up the number of times a genre occurs
  // return an array with five or fewer objects (slice)
  // each object has a key and a count
  let count = books.reduce((acc, {genre}) => {
    (acc[genre]) ? acc[genre] += 1 : acc[genre] = 1;
    return acc;
  }, {})
  const sortedGenres = _objectSortedValues(count);
  return sortedGenres.map((name) => ({
    name, 
    count: count[name]
  })).slice(0, 5);
}

function getMostPopularBooks(books) {
  const sortedBooks = books.sort((bookA, bookB) => 
  bookA.borrows.length < bookB.borrows.length ? 1 : -1)
  return popularBooks = sortedBooks.map(book => {
    return {name: book.title, count: book.borrows.length}
  }).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  // iterate over books to look at "authorId, borrows" to count
    // push authorId w/borrows.length
  const count = books.reduce((acc, {authorId, borrows}) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  }, {})
  // interate over "count variable"
  for (let id in count) {
    // add up sum of author[id]
    const sum = count[id].reduce((countA, countB) => countA + countB);
    count[id] = sum;
  }
    
  // sort obj
  const sorted = _objectSortedValues(count);
  // iterate sorted obj and build out obj
  return sorted.map(sortId => {
    const currentAuthor = authors.find(author => sortId == author.id)
    return {name: `${currentAuthor.name.first} ${currentAuthor.name.last}`, 
    count: count[sortId]}; 
  // display first five 
  }).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
