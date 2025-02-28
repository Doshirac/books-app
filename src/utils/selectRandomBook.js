import _ from 'underscore';
import seedrandom from 'seedrandom';

export const selectRandomBook = (books, seed) => {
    const rng = seedrandom(seed.toString());
    const originalRandom = Math.random;
    Math.random = rng;
    
    const selected = _.sample(books);
    Math.random = originalRandom;

    return selected;
};
