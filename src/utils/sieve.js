// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
import { generate as generateRange } from './range.js';

// Step 3:
// Enumerate multiples of `p` by counting from `2*p` to `n` in increments of `p`.
// Mark them in the list.
const mark = (rangeObj, pInit, end) => {
  let p = pInit * 2;

  while (p <= end) {
    rangeObj[p] = true;
    p += pInit;
  }
};

// Step 4:
// Find first number greater than `p` in list that is not marked.
// If no such number, then stop.
// If there is a number, then set `p` to the number. Go back to Step 3.
const findNextP = (rangeObj, pCmp) => {
  for (let p in rangeObj) {
    if (rangeObj[p] === false && parseInt(p) > pCmp) { return +p; }
  }

  return null; // nothing found, so you should stop!
};

// Step 5:
// When algorithm is over, any unmarked numbers are `nth - 1` prime numbers.
const getPrimesIn = rangeObj => (
  Object.keys(rangeObj)
    .filter(n => rangeObj[n] === false)
    .map(n => parseInt(n))
);

const sieveItUp = n => {
  const range = generateRange(2, n);
  let p = 2;
  mark(range, p, n);
  let nextP = findNextP(range, p);

  while (nextP !== null) {
    p = nextP;
    mark(range, p, n);
    nextP = findNextP(range, p);
  }

  return getPrimesIn(range);
};

export default sieveItUp;
