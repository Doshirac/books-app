import { faker } from "../faker";
import { createRandomBook } from "../utils/createRandomBook";

export const books = faker.helpers.multiple(createRandomBook, {
    count: 100,
});