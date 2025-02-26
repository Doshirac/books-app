import _ from 'underscore';

export const selectRandomBook = (books) => {
    return _.sample(books);
};
