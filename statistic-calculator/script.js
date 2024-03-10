// getting mean value by dividing the total sum of an array then divided it by the total length of an array
const getMean = array => array.reduce((acc, el) => acc + el, 0) / array.length;

const getMedian = array => {
    // To sort your numbers from smallest to largest, pass a callback function that takes parameters a and b, and returns the result of subtracting b from a.
    const sorted = array.sort((a, b) => a - b);

    // using getMean() must incl. an array as the args.
    // and sorted value only accepts array value
    const median = array.length % 2 === 0 ?
        getMean([sorted[array.length /2], sorted[array.length /2 -1]]) :
        sorted[Math.floor(array.length /2)];

    return median;
}

const getMode = array => {
    const counts = {};

    // Remember that the .forEach() method allows you to run a callback function for each element in the array.
    // Use the .forEach() method to loop through the array
    // In the callback, use the el parameter to access the counts object
    // and increment the count for each number.
    array.forEach(el => {
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
    // Then sort it from the smallest to largest
    // Then choose the first index of the resulted object.keys(counts)
    const highest = Object.keys(counts).sort((a, b) => counts[a] - counts[b])[0];
}

const calculate = () => {
    const value = document.querySelector('#numbers').value;
    
    // regex to recognize ", " as the split separator
    const array = value.split(/,\s*/g)

    // map creates a new array instead of mutating the original array
    // The callback function needs to return a value. In this case, you want to return the value of each element converted to a number. You can do this by using the Number() constructor, passing the element as an argument.
    // Add a callback function to your .map() method that converts each element to a number.
    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));

    const mean = getMean(numbers);
    const median = getMedian(numbers);

    document.querySelector('#mean').textContent = mean;
    document.querySelector('#median').textContent = median;
}

// calculate();