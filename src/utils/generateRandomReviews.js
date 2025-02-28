import seedrandom from 'seedrandom';
import { initFaker } from "../faker";
import { createRandomReview } from "./createRandomReview";
import { times } from "./times";

export function generateRandomReviews({ localeCode, seed, fraction = 4.7 } = {}) {
    const faker = initFaker({ localeCode, seed });
    const rng = seedrandom(seed.toString());
    const addOneReview = (reviews = []) => {
      return [...reviews, createRandomReview(faker)];
    };

    const addReviews = times(fraction, addOneReview, rng);

    return addReviews([]);
}
