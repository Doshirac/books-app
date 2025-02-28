export function createRandomBook(faker, id) {
    return {
      bookId: id,
      ISBN: faker.commerce.isbn(),
      title: faker.book.title(),
      authors: faker.helpers.multiple(() => faker.book.author(), {
        count: faker.number.int({ min: 1, max: 2 })
      }),
      publisher: faker.book.publisher(),
    };
}