const inputBox = document.getElementById('number');
const convertButton = document.getElementById('convert-btn');
const outputDiv = document.getElementById('output');

const check = () => {
    outputDiv.innerHTML = '';

    if (!inputBox.value || isNaN(parseInt(inputBox.value))) {
        outputDiv.innerHTML = '<span>Please enter a valid number</span>';
        inputBox.value = '';
    }
    else if (parseInt(inputBox.value) < 1) {
        outputDiv.innerHTML = '<span>Please enter a number greater than or equal to 1</span>';
        inputBox.value = '';
    }
    else if (parseInt(inputBox.value) > 3999) {
        outputDiv.innerHTML = '<span>Please enter a number less than or equal to 3999</span>';
        inputBox.value = '';
    }

    let input = inputBox.value;

    // define the roman numeral list
    const romanList = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    // provide an output
    let testText = '';

    // check for all possibilities inside a list
    for (let i in romanList) {
        // compare input if it's the same or higher with every possible object
        while (input >= romanList[i]) {
            // write an output roman letter
            testText += i;

            // then subtract the input value w the value of compared object
            input -= romanList[i];

            // rinse and repeat back to while loop until it hits zero
        }
    }

    const span = document.createElement('span')
    const textNode = document.createTextNode(testText)

    span.appendChild(textNode)

    outputDiv.appendChild(span)
}

convertButton.addEventListener('click', check);
inputBox.addEventListener('keydown', e => {
    if (e.key === 'Enter') check();
    else return;
})

// prevent e + .
inputBox.addEventListener('keydown', e => 
    ['e', 'E', '.', '+'].includes(e.key) && e.preventDefault()
)