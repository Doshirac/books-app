import { base, de, en, pl, Faker } from '@faker-js/faker';

export const faker = new Faker({
    locale: [en, de, pl],
});
