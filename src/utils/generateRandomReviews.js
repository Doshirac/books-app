import { createRandomReview } from "./createRandomReview";

export const generateRandomReviews = (count = 2) => {
    return Array.from({ length: count }, () => createRandomReview());
};