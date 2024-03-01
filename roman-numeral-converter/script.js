const inputBox = document.getElementById('number');
const convertButton = document.getElementById('convert-btn');
const outputDiv = document.getElementById('output');

// using roman table to determine string output
// using remainder/modulo operator %

const check = () => {
    if (inputBox.value === '') {
        alert('Please enter a valid number')
        return;
    }

    const input = inputBox.value;

    let testText = '';
    for (let i = 0; i < input.length; i++) {
        testText += `,${input[i]}`;
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