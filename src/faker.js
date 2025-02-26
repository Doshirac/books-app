import { Faker } from '@faker-js/faker';
import { fakerLocales } from './fakerLocales';

export function initFaker({ localeCode, seed }) {
    const chosenLocale = fakerLocales[localeCode];
    const faker = new Faker({ locale: [chosenLocale, fakerLocales.en] });
    faker.seed(seed);
    return faker;
}
