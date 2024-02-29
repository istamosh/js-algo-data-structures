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

    const span = document.createElement('span')
    const textNode = document.createTextNode('hehe')

    span.appendChild(textNode)

    if (outputDiv.hasChildNodes()) {
        outputDiv.innerHTML = '';
    }
    outputDiv.appendChild(span)
}

convertButton.addEventListener('click', check);
inputBox.addEventListener('keydown', e => {
    if (e.key === 'Enter') check();
    else return;
})