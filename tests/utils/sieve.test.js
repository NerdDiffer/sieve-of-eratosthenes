import test from 'ava';
import { sieveItUp } from '../../src/utils/sieve.js';

test('#sieveItUp: works', t => {
  const actual = sieveItUp(50);
  const expected = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
  t.deepEqual(actual, expected);
});
