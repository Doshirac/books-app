export function createRandomBook(faker, id) {
    const numberOfAuthors = Math.floor(Math.random() * 2) + 1;
    const authors = Array.from({ length: numberOfAuthors }, () => faker.book.author());
  
    return {
      bookId: id,
      ISBN: faker.commerce.isbn(),
      title: faker.book.title(),
      authors,
      publisher: faker.book.publisher(),
    };
}
  