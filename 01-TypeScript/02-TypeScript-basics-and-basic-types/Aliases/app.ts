function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: 'as-number' | 'as-text'
) {
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    return +input1 + +input2;
  } else {
    return input1.toString() + input2.toString();
  }

  // if (resultConversion === 'as-number') {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
}

const combineAges = combine(30, 26, 'as-number');

console.log(combineAges);

const combineStringAges = combine('30', '26', 'as-number');

console.log(combineStringAges);

const combineNames = combine('Max', 'Charlie', 'as-text');

console.log(combineNames);
