const numberInput = document.getElementById('number-input');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('result');

const decimalToBinary = input => {
    const inputs = [];
    const quotients = [];
    const remainders = [];

    while (input > 0) {
        const quotient = Math.floor(input /2);
        const remainder = input % 2;
        inputs.push(input);
        quotients.push(quotient);
        remainders.push(remainder);
        input = quotient;
    }
};

// do some setup to check the value in the number input element whenever the user clicks the Convert button.
const checkUserInput = () => {
    // handle if input box is empty
    // you should handle falsy input like null, 0, and undefined, instead of using === '', use ! as the prefix
    // use parseInt() to prevent number like 2.3, 2e+3, or NaN (because of "e" only)
    // check if the input is not a number, isNaN()
    if (!numberInput.value || isNaN(parseInt(numberInput.value))) {
        alert('Please provide a decimal number');
        return;
    }

    // pass parsed value to another function
    decimalToBinary(parseInt(numberInput.value));
    numberInput.value = '';
};

// calling callback func. without parentheses
convertBtn.addEventListener('click', checkUserInput);

// just like above function but using Enter key
// e is the parameter of event object
numberInput.addEventListener('keydown', e => {
    // handle if presses the Enter key
    if (e.key === 'Enter') {
        checkUserInput();
    }
});