const sortButton = document.getElementById("sort");

const sortInputArray = (event) => {
  // buttons associated with a form element submit by default, you need to prevent that behavior
  event.preventDefault();

  // spread the array result directly
  // map the array w/ dropdown params and return its value
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown"),
  ].map((dropdown) => Number(dropdown.value));

  //   console.log(inputValues);

  // built-in sort() function only calculate alphabetically (when there is 10, then it's going to be 10, 2, 3,...)
  // you need to modify the sort() by the callback params
  // if the number is negative, sort a before b
  // if the number is positive, sort b before a
  // if the number is zero, order is unaffected
  // Keeping in mind that you want the numbers to be sorted in ascending order (smallest to largest), return a single subtraction calculation using a and b that will correctly sort the numbers with the above logic.
  const sortedValues = inputValues.sort((a, b) => {
    return a - b;
  });

  updateUI(sortedValues);
};

// declaring funct. that have own param with fallback value of an array
const updateUI = (array = []) => {
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);

    outputValueNode.innerText = num;
  });
};

// bubble sort algo. and return the array.
const bubbleSort = (array) => {
  // j is required to iterate everything except the last element
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      // compare the current pointer to the pointer beside it
      if (array[j] > array[j + 1]) {
        // then swap the j with the j+1
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
};

const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      // console.log(array, array[j], array[minIndex]);

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }
  return array;
};

const insertionSort = (array) => {
  // start from the second element of array
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;

    // keep running if j is not below 0 and array[j] value is higher than currValue
    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }

    array[j + 1] = currValue;
  }
  return array;
};

sortButton.addEventListener("click", sortInputArray);
