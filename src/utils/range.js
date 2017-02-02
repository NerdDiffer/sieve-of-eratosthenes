const generate = (i, j) => {
  const range = {};

  while (i <= j) {
    range[i] = false; // boolean, is the number 'marked'?
    i += 1;
  }

  return range;
};

export { generate }
