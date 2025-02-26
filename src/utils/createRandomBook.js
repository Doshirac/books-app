export function createRandomBook(faker, id) {
    return {
        bookId: id,
        ISBN: faker.commerce.isbn(),
        title: faker.book.title(),
        author: faker.book.author(),
        publisher: faker.book.publisher(),
    };
}