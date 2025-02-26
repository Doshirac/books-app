export const createRandomReview = (faker) => {
    return {
      reviewer: faker.internet.displayName(),
      reviewText: faker.lorem.paragraph(),
      rating: faker.number.int({ min: 1, max: 5 }),
    };
};