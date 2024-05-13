const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");

let isError = false;

function cleanInputString(str) {
  // const strArray = str.split('');
  // const cleanStrArray = [];

  // for (let i = 0; i < strArray.length; i++) {
  //     if (!['+', '-', ' '].includes(strArray[i])) {
  //         cleanStrArray.push(strArray[i]);
  //     }
  // }

  // using regular expression to reduce memory usage
  // looking a + and - sign using \ as the escaping symbol to recognize them
  // \s is a white space like " "
  // const regex = /\+-\s/;

  // console.log("original string: ", str);

  // using regex but with character class, wrapped in square brackets
  // after wrapping with /" "/, you can add "g" as global flag.
  const regex = /[+-\s]/g;

  // how to replace the characters from params. with above regex
  return str.replace(regex, "");
}

// process string through regex filter
// console.log(cleanInputString("+-99"));

function isInvalidInput(str) {
  // if the regex has only 1 character to filter, then it no longer requires []
  // i flag stands for insensitive, meaning no matter the upper/lower case, it means the same
  // the regex will catch the e in-between any numeral inputs (e.g. 1e1, 2e9, 7e4)
  // + after digits represents match a pattern that occurs one or more times
  // [0-9] is the same as \d, \d flag represents digits
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

// test scientific input
// console.log(isInvalidInput("10"));
// "1e3" = return 1D array like below
// "1e3" is the matched value against the /\d+e\d+/i regex.
// index: 0 is the index of the matched value in the string.
// input: '1e3' is the original string that was matched.
// groups: undefined are the matched groups, which are not used in this case. You will learn more about groups in a later project.
// "10" = null

function addEntry() {
  // const targetId = '#' + entryDropdown.value;

  // using template literal `` to include a var inside ${}
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );

  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

  const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name"></input>
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories"></input>
    `;

  // innerHTML properties will replace existing input values from user
  // targetInputContainer.innerHTML += HTMLString;
  // instead uses insertAdjacentHTML before the end to preserve the input from user
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

function calculateCalories(e) {
  e.preventDefault();

  // reset global error flag to false
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll(
    `#breakfast input[type=number]`
  );
  const lunchNumberInputs = document.querySelectorAll(
    `#lunch input[type=number]`
  );
  const dinnerNumberInputs = document.querySelectorAll(
    `#dinner input[type=number]`
  );
  const snacksNumberInputs = document.querySelectorAll(
    `#snacks input[type=number]`
  );
  const exerciseNumberInputs = document.querySelectorAll(
    `#exercise input[type=number]`
  );

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);

  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;

  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;

  // check if remaining calories is less than 0, surplus if it is
  const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

  output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">
    <hr>${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p></span>`;

  output.classList.remove("hide");
}

// fetch input calorie from list for calculation
function getCaloriesFromInputs(list) {
  let calories = 0;

  // use for...of loop to access items of NodeList's element called list
  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    // check truthy/falsy (null value considered falsy too)
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }

    calories += Number(currVal);
  }

  return calories;
}

function clearForm() {
  // NodeList is generated from querySelectorAll, which isn't the same as list
  // Array.from() is used for converting NodeList into a robust List
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );

  for (const container of inputContainers) {
    container.innerHTML = "";
  }

  budgetNumberInput.value = "";
  output.innerText = "";

  // add .hide to every #output again
  output.classList.add("hide");
}

// listen for click on a button, then trigger addEntry func
addEntryButton.addEventListener("click", addEntry);

// listen for submit, then trigger calculateCalories
calorieCounter.addEventListener("submit", calculateCalories);

clearButton.addEventListener("click", clearForm);
