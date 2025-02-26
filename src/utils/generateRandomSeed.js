import seedrandom from 'seedrandom';

export const generateRandomSeed = () => {
    const rng = seedrandom();
    
    return Math.floor(rng() * 10000000);
};
