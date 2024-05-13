// getting mean value by dividing the total sum of an array then divided it by the total length of an array
// mean = a1+a2+a3+a4+a5 / (total data)
const getMean = (array) =>
  array.reduce((acc, el) => acc + el, 0) / array.length;

/* const testArr1 = [1, 2, 3, 4, 5];
const testArr2 = [1, 2, 3, 4, 5, 6];
const isEven = testArr2.length % 2 === 0;
console.log(isEven);
const oddListMedian = testArr1[Math.floor(testArr1.length / 2)];
console.log(oddListMedian);
const evenListMedian = getMean([
  testArr2[testArr2.length / 2],
  testArr2[testArr2.length / 2 - 1],
]);
console.log(evenListMedian); */

// (sort data smallest to largest, then if it's even total, calculate two middle datas, otherwise, get the middle one)
// even median = a,b,c,d,e,f = c+d / 2
// odd median = a,b,c,d,e = c
const getMedian = (array) => {
  // It's a bad practice to mutate (which is sort() function) array param directly
  // Add a shallow copy of an array by using slice() so you can mutate that freely before sorting it
  // To sort your numbers from smallest to largest, pass a callback function that takes parameters a and b, and returns the result of subtracting b from a.
  const sorted = array.slice().sort((a, b) => a - b);

  // using getMean() must incl. an array as the args.
  // and sorted value only accepts array value
  const median =
    array.length % 2 === 0
      ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
      : sorted[Math.floor(array.length / 2)];

  return median;
};

// return the highest occurence of data (array)
// mode = a,b,b,b,c,c,c,d,d = b,c
// mode = a,a,a,b,b,c,c,d,d = a
const getMode = (array) => {
  const counts = {};

  // find element inside counts object, then check if that element is exist, if it does, add it by one, if it's not, then assign 0+1, then return it to that object
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  });

  // There are a few edge cases to account for when calculating the mode of a dataset.
  // First, if every value appears the same number of times, there is no mode.
  // To calculate this, you will use a Set.
  // A Set is a data structure that only allows unique values. If you pass an array into the Set constructor, it will remove any duplicate values.
  // If the size property of this Set is equal to 1, that tells you every value appears the same number of times.
  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }

  // Now you need to find the value that occurs with the highest frequency.
  // Then sort it from the largest to the smallest index
  // Then choose the first index of the resulted object.keys(counts)
  const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];

  // return the object count keys and filter the element and check whether the element index of counts is equal to highest count object
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  );

  return mode.join(", ");
};

// Math.max(...arr) returns maximum element from an array, you need to spread the array first
// Math.min(...arr) returns minimum element from an array, you need to spread the array first
// range = a1,a2,b1,b2,c,d1,d2,d3 = d3 - a1
const getRange = (array) => Math.max(...array) - Math.min(...array);

const getVariance = (array) => {
  // get mean value first
  const mean = getMean(array);

  // // [a, b, c, ...] => [a-mean,b-mean,c-mean,...]
  // const differences = array.map(el => el - mean)

  // // [a-mean,b-mean,...] => [a-mean**2,b-mean**2,...]
  // const squaredDifferences = differences.map(el => el **2)

  // // [a,b,c] => [0+a,b,c] => [a+b,c] => [a+b+c]
  // const sumSquaredDifferences = squaredDifferences.reduce((acc, el) => acc + el, 0)

  // [a,b,c] => [0+a,b,c] => [0+(a-mean)**2, b, c] => [a+(b-mean)**2, c] => [ab+(c-mean)**2] => abc / 3
  const variance =
    array.reduce((acc, el) => {
      const difference = el - mean;
      const squared = difference ** 2;
      return acc + squared;
    }, 0) / array.length;

  return variance;
};

const getStandardDeviation = (array) => {
  const variance = getVariance(array);

  // calculate root exponent using inverted exponent x**1/n, but use square root func. instead
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
};

const calculate = () => {
  const value = document.querySelector("#numbers").value;

  // regex to recognize ", " as the split separator
  const array = value.split(/,\s*/g);

  // map creates a new array instead of mutating the original array
  // The callback function needs to return a value. In this case, you want to return the value of each element converted to a number. You can do this by using the Number() constructor, passing the element as an argument.
  // Add a callback function to your .map() method that converts each element to a number.
  const numbers = array.map((el) => Number(el)).filter((el) => !isNaN(el));

  const mean = getMean(numbers);
  const median = getMedian(numbers);

  //   console.log(getMode(numbers));

  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);

  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
};
