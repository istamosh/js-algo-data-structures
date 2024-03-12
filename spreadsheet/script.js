const isEven = num => num % 2 === 0;
const sum = nums => nums.reduce((acc, el) => acc + el)
const average = nums => sum(nums) / nums.length;
const median = nums => {
    const sorted = nums.slice().sort((a, b) => a - b);

    const length = sorted.length;
    const middle = length / 2 -1;

    return isEven(length) ? average([sorted[middle], sorted[middle+1]]) : sorted[Math.ceil(middle)];
}

const spreadsheetFunctions = {
    sum,
    average,
    median,
}

// implicitly returns an array constructor
// calculate the difference between start and endpoint and add 1 to the constructor
const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index)

const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));

const evalFormula = (x, cells) => {
    const idToText = id => cells.find(cell => cell.id === id).value;

    // catch the range from A to J and make it grouped
    // second group should be two digits
    // digit one is ranged from 1-9
    // digit two is ranged from 0-9
    // regex look for : sign
    // and look for the same group (B12, A3)
    // and make it global and case insensitive
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;

    const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2))

    const elemValue = num => character => idToText(character + num)

    const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue)
}

// declare the window.onload property to append a function, not like this onload(), but this onload = () => {};
window.onload = () => {
    const container = document.getElementById('container')

    // create a nested func.
    const createLabel = name => {
        const label = document.createElement('div');
        label.className = 'label';
        label.textContent = name;

        container.appendChild(label);
    }

    const letters = charRange('A', 'J');

    // pass the function WITHOUT the "()" for the forEach
    letters.forEach(createLabel);

    range(1, 99).forEach(number => {
        createLabel(number)
        
        letters.forEach(letter => {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = letter + number;
            // hyphenated HTML attribute property
            input.ariaLabel = letter + number;

            // add onchange HTML property and insert the update func.
            input.onchange = update

            container.appendChild(input);
        })
    })
}

const update = event => {
    const element = event.target;

    // use \s to remove all whitespaces
    const value = element.value.replace(/\s/g, '');

    if (!value.includes(element.id) && value.charAt(0) === '=') {

    }
}
