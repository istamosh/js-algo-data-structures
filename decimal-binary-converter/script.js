// // callstack LIFO arrangement
// const a = () => 'freeCodeCamp ' + b();
// const b = () => 'is ' + c();
// const c = () => 'awesome!';

// console.log(a());

// // using recursion
// const countDownAndUp = number => {
//     console.log(number);
//     if (number === 0) {
//         console.log('Reached base case');
//         return;
//     } else {
//         // recursion
//         countDownAndUp(number - 1);
//         console.log(number);
//     }
// };

// countDownAndUp(3);

const numberInput = document.getElementById('number-input');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('result');

const decimalToBinary = input => {
    // // 1st method
    // const inputs = [];
    // const quotients = [];
    // const remainders = [];

    // while (input > 0) {
    //     const quotient = Math.floor(input /2);
    //     const remainder = input % 2;
    //     inputs.push(input);
    //     quotients.push(quotient);
    //     remainders.push(remainder);
    //     input = quotient;
    // }

    // console.log('Inputs: ', inputs);
    // console.log('Quotients: ', quotients);
    // console.log('Remainders: ', remainders);

    // // reverse the resulting array so it reads in right to left, and join them again
    // result.innerText = remainders.reverse().join('');

    // // 2nd method
    // let binary = '';

    // // handle 0 input
    // if (input === 0) {
    //     binary = '0';
    //     return;
    // }

    // while (input > 0) {
    //     binary = (input % 2) + binary;
    //     input = Math.floor(input /2);
    // }
    // result.innerText = binary;

    if (input === 0) {
        return '0';
    } else {
        return decimalToBinary(Math.floor(input /2)) + (input %2);
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

    // pass parsed value to another function and show to result
    result.textContent = decimalToBinary(parseInt(numberInput.value));
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