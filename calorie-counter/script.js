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
    // const regex = /\+-\s/;

    // using regex but with character class, wrapped in square brackets
    // after wrapping with /" "/, you can add "g" as global flag.
    const regex = /[+-\s]/g;

    // how to replace the characters from params. with above regex
    return str.replace(regex, "");
}

function isInvalidInput(str) {
    // if the regex have only 1 character to filter, then it no longer requires []
    // i flag stands for insensitive, meaning no matter the upper/lower case, it means the same
    // the regex will catch the e in-between any numeral inputs (e.g. 1e1, 2e9, 7e4)
    // + after digits represents match a pattern that occurs one or more times
    // [0-9] is the same as \d, \d flag represents digits
    const regex = /\d+e\d+/i;
    return str.match(regex);
}

function addEntry() {
    // const targetId = '#' + entryDropdown.value;

    // using template literal `` to include a var inside ${}
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
}