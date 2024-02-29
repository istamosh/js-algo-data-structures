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
const animationContainer = document.getElementById('animation-container');

const animationData = [
    {
        inputVal: 5,
        marginTop: 300,
        addElDelay: 1000,
        msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
        showMsgDelay: 15000,
        removeElDelay: 20000
    },
    {
        inputVal: 2,
        marginTop: -200,
        addElDelay: 1500,
        msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
        showMsgDelay: 10000,
        removeElDelay: 15000
    },
    {
        inputVal: 1,
        marginTop: -200,
        addElDelay: 2000,
        msg: 'decimalToBinary(1) returns "1" (base case) and gives that value to the stack below. Then it pops off the stack.',
        showMsgDelay: 5000,
        removeElDelay: 10000
    }
];

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

    if (input === 0 || input === 1) {
        return String(input);
    } else {
        return decimalToBinary(Math.floor(input /2)) + (input %2);
    }
};

const showAnimation = () => {
    // // add half sec delay
    // setTimeout(() => { console.log('free'); }, 500);

    // // give 1 sec delay before execute console "Code" (async.)
    // setTimeout(() => { console.log('Code'); }, 1000);
    
    // setTimeout(() => { console.log('Camp'); }, 1500);

    result.innerText = 'Call Stack Animation';

    animationData.forEach(obj => {
        setTimeout(() => {
            animationContainer.innerHTML += `
            <p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px;" class="animation-frame">
            decimalToBinary(${obj.inputVal})
            </p>
            `;
        }, obj.addElDelay);

        setTimeout(() => {
            document.getElementById(obj.inputVal).remove();
        }, obj.removeElDelay);

        setTimeout(() => {
            document.getElementById(obj.inputVal).textContent = obj.msg;
            obj.msg.textContent
        }, obj.showMsgDelay);
    });

    setTimeout(() => {
        result.textContent = decimalToBinary(5);
    }, 20000);
};

// do some setup to check the value in the number input element whenever the user clicks the Convert button.
const checkUserInput = () => {
    // parse input firsthand to prevent falsy integer input
    const inputInt = parseInt(numberInput.value);

    // handle if input box is empty
    // you should handle falsy input like null, 0, and undefined, instead of using === '', use ! as the prefix
    // use parseInt() to prevent number like 2.3, 2e+3, or NaN (because of "e" only)
    // check if the input is not a number, isNaN()
    if (!numberInput.value || isNaN(inputInt)) {
        alert('Please provide a decimal number');
        return;
    }

    // check if input is strictly equal to 5
    if (inputInt === 5) {
        showAnimation();
        return;
    }

    // pass parsed value to another function and show to result
    result.textContent = decimalToBinary(inputInt);
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