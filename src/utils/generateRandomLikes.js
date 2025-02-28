import seedrandom from 'seedrandom';
import { times } from "./times";

export function generateRandomLikes({ seed, fraction = 50 } = {}) {
    const rng = seedrandom(seed.toString());
    const addOneLike = (n) => n + 1;
    const addLikes = times(fraction, addOneLike, rng);
    
    return addLikes(0);
}