import { createRandomReview } from "./createRandomReview";
import { initFaker } from "../faker";

export function generateRandomReviews({ localeCode, seed, count = 2 } = {}) {
    const faker = initFaker({ localeCode, seed });
    const reviews = Array.from({ length: count }, () => (createRandomReview(faker)));

    return reviews;
}