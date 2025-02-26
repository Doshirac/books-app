import { initFaker } from "../faker";
import { createRandomBook } from "./createRandomBook";

export function createBooks({ localeCode, seed, count }) {
    const faker = initFaker({ localeCode, seed });
    faker.seed(seed);
    
    const books = Array.from({ length: count }, (_, i) => createRandomBook(faker, i + 1));
    
    return books;
}
