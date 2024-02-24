const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result');
const clearButton = document.getElementById('clear');

// use two indexes iteration
const checkPalindrome = input => {
    // remove symbols (including underscores) and whitespaces quantifier using regex, thanks to regexr.com
    const regex = /\W|\s+|_/g;
    let processed = input.replace(regex, "").toLowerCase();
    // define the two indexes
    let forward = 0;
    let backward = processed.length -1;
    // and run the iteration simultaneously until meet midway
    while (forward < backward) {
        // compare forward and backward iteration one at a time, if it's not the same then the iteration will stop
        if (processed[forward] != processed[backward]) return false;
        forward++;
        backward--;
    }
    return true;
};

// alternate palindrome checker
const check = userInput => {
    if (userInput === '' || userInput.match(/^\s+$/gi)) {
        alert('Please input a value');
        return;
    }

    const input = userInput;

    result.replaceChildren();

    const processed = userInput.replace(/[^A-Za-z0-9]/gi, '').toLowerCase();
    
    let is = 
    processed === [...processed].reverse().join('') ?
        ['is', 'true'] : ['is not', 'false'];

    let content = `${input} ${is[0]} a palindrome`;
    
    const span = document.createElement('span');
    span.className = is[1];
    span.innerHTML = content;

    result.appendChild(span);
};

// execute input
const execute = () => {
    // check for empty spaces without any characters and symbols on input
    const regex = /^\s+$/g;
    if (textInput.value == "" || textInput.value.match(regex)) {
        alert("Please input a value");
        textInput.value = "";
        return false;
    }

    if (checkPalindrome(textInput.value)) result.insertAdjacentHTML('afterbegin', `<span class="true">${textInput.value} is a palindrome</span>`);
    else result.insertAdjacentHTML('afterbegin', `<span class="false">${textInput.value} is not a palindrome</span>`);
    textInput.value = "";
};

// clear history
const clear = () => {
    let container = document.getElementById('result');
    let spans = container.getElementsByTagName('span'), i;

    if (spans.length === 0) return false;
    else for (i = spans.length - 1; i >= 0; i--) 
            spans[i].parentNode.removeChild(spans[i]);
};

// takes input, and detects if box is empty or using whitespace only
checkButton.addEventListener('click', () => {
    check(textInput.value);
    textInput.value = '';
});
// same as above but with enter key
textInput.addEventListener('keypress', pressed => {
    if (pressed.key === 'Enter') {
        pressed.preventDefault();
        checkButton.click();
    }
})

// clear history
clearButton.addEventListener('click', clear);