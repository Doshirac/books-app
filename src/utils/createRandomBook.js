import { faker } from "../faker";

let idCounter = 1;

export function createRandomBook() {
    return {
        bookId: idCounter++,
        ISBN: faker.commerce.isbn(),
        title: faker.book.title(),
        author: faker.book.author(),
        publisher: faker.book.publisher(),
    };
}