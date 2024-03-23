const inputBox = document.getElementById('user-input')
const checkButton = document.getElementById('check-btn')
const clearButton = document.getElementById('clear-btn')
const resultDiv = document.getElementById('results-div')

// me being lazy to add multiple click listeners based on every buttons' textContent
const numpad = document.querySelectorAll('[id*="numpad"]');
numpad.forEach(elements => {
    elements.addEventListener('click', () => {
        inputBox.value += elements.textContent;
    })
})

const isEmpty = () => {
    if (inputBox.value === '') {
        alert('Please provide a phone number');
        return true;
    }
    return false;
}
const check = () => {
    // check if input is empty
    if (isEmpty()) return;
    
    //#region regex section
    // Begin with '1' followed by an optional ' ' (optional country code)
    const country = /^(1 ?)?/;
    // look for either '(ddd)' OR 'ddd' and followed by an optional '-' or ' '
    const area = /(\(\d{3}\)|\d{3})[- ]?/;
    // It's 'ddd-dddd', 'ddd dddd', or 'ddddddd' for the end
    const phone = /\d{3}[- ]?\d{4}$/;
    // full valid phone pattern
    const regex = new RegExp(country.source + area.source + phone.source);
    //#endregion

    // fetch the value and trim the leading and trailing whitespaces
    const trimmedInput = inputBox.value.trim();
    // process it
    const is = regex.test(trimmedInput) ? ['valid', 'Valid'] : ['invalid', 'Invalid'];
    // prepare the child div
    const p = document.createElement('p');
    p.className = 'result-text';
    
    p.appendChild(document.createTextNode(`${is[1]} US number: ${trimmedInput}`))
    // prepare the wrapper div
    const div = document.createElement('div');
    div.className = 'border-wrap';
    div.id = is[0];
    div.appendChild(p);
    // insert new child as the first element
    resultDiv.insertBefore(div, resultDiv.children[0])

    inputBox.value = '';
}
const clear = () => {
    if (inputBox.value.length !== 0) {
        inputBox.value = '';
    }
    resultDiv.innerHTML = '';
}

checkButton.addEventListener('click', check)
inputBox.addEventListener('keyup', e => {
    e.preventDefault();
    if (e.key === 'Enter') check();
})
clearButton.addEventListener('click', clear)

// auto focus key press to inputbox
window.onkeydown = () => {
    inputBox.focus();
}