const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result');

// use two indexes iteration
const test = char => {
    // remove symbols (including underscores) and whitespaces quantifier using regex, thanks to regexr.com
    const regex = /\W|\s+|_/g;
    let processed = char.replace(regex, "").toLowerCase();
    // define the two indexes
    let forward = 0;
    let backward = processed.length -1;
    // and run the iteration simultaneously until meet midway
    while (forward < backward) {
        // compare forward and backward iteration one at a time, if it's not the same then the iteration will stop
        if (processed[forward] != processed[backward]) {
            return false;
        }
        forward++;
        backward--;
    }
    return true;
};

// takes input, and detects if box is empty or using whitespace only
checkButton.addEventListener('click', () => {
    // result.innerHTML = test(textInput.value)
    result.innerText = test(textInput.value);
});