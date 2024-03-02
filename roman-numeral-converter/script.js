const inputBox = document.getElementById('number');
const convertButton = document.getElementById('convert-btn');
const outputDiv = document.getElementById('output');

const check = () => {
    if (inputBox.value === '') {
        alert('Please enter a valid number')
        return;
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

    outputDiv.innerHTML = '';
    outputDiv.appendChild(span)
}

convertButton.addEventListener('click', check);
inputBox.addEventListener('keydown', e => {
    if (e.key === 'Enter') check();
    else return;
})