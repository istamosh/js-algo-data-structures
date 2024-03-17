const inputBox = document.getElementById('user-input')
const checkButton = document.getElementById('check-btn')
const clearButton = document.getElementById('clear-btn')
const resultDiv = document.getElementById('results-div')

const numpad1 = document.getElementById('numpad1');
const numpad2 = document.getElementById('numpad2');
const numpad3 = document.getElementById('numpad3');
const numpad4 = document.getElementById('numpad4');
const numpad5 = document.getElementById('numpad5');
const numpad6 = document.getElementById('numpad6');
const numpad7 = document.getElementById('numpad7');
const numpad8 = document.getElementById('numpad8');
const numpad9 = document.getElementById('numpad9');
const numpad0 = document.getElementById('numpad0');
const numpadOpenBr = document.getElementById('numpad(');
const numpadCloseBr = document.getElementById('numpad)');
const numpadMinus = document.getElementById('numpad-');

const keyTable = {
    '0': 48,
    '1': 49,
    '2': 50,
    '3': 51,
    '4': 52,
    '5': 53,
    '6': 54,
    '7': 55,
    '8': 56,
    '9': 57,
    '-': [109, 189],
    '(': 219,
    ')': 221
}

numpad0.addEventListener('click', () => {
    inputBox.value += '0';
    console.log('pressed 0');
})

const isEmpty = () => {
    if (inputBox.value === '') {
        alert('Please provide a phone number');
        return true;
    }
    return false;
}
const clearInput = () => {
    if (inputBox.value.length !== 0) {
        inputBox.value = '';
    } else {
        console.log(`it's already empty`)
    }
}

checkButton.addEventListener('click', () => {
    // check if input is empty
    if (isEmpty()) return;

    console.log('hehe');
})
clearButton.addEventListener('click', clearInput)

// auto focus key press to inputbox
window.onkeydown = () => {
    inputBox.focus();
}