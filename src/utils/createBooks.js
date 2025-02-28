import { initFaker } from "../faker";
import { createRandomBook } from "./createRandomBook"

export function createBooks({ localeCode, seed, count }) {
    const faker = initFaker({ localeCode, seed });
    faker.seed(seed);
    
    return faker.helpers.multiple(
        (_, index) => createRandomBook(faker, index + 1), 
        { count }
    );
}