const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');

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
    const regex = /\+-\s/;
}