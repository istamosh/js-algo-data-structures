const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result');

// use two indexes iteration
const test = char => {
    // remove symbols and whitespaces using regex
    const regex = / |_|-|,|\?|\.|\!/g;
    // add regex for opposite symbol
    const part        = /\(|\[|\\|<|{/g;
    const counterpart = /\)|\]|\/|>|}/g;
    let processed = char.replace(regex, "").toLowerCase();
    // define the two indexes
    let forward = 0;
    let backward = processed.length -1;

    let word1 = "";
    let word2 = "";
    // and run the iteration simultaneously until meet midway
    while (forward < backward) {
        word1 += processed[forward];
        word2 += processed[backward];
        // compare forward and backward iteration one at a time, if it's not the same then the iteration will stop
        innerloop: if (processed[forward] != processed[backward]) {
            if (part.test(processed[forward]) && counterpart.test(processed[backward])) {
                console.log('1');
                break innerloop;
            }
            else if (counterpart.test(processed[forward]) && part.test(processed[backward])) {
                console.log('2');
                break innerloop;
            }
            console.log(word1);
            console.log(word2);
            console.log(part.test(processed[forward]) && counterpart.test(processed[backward]));
            console.log(counterpart.test(processed[forward]) && part.test(processed[backward]));

            return false;
        }
        forward++;
        backward--;
    }
    console.log(word1);
    console.log(word2);
    return true;
};

// takes input, and detects if box is empty or using whitespace only
checkButton.addEventListener('click', () => {
    // result.innerHTML = test(textInput.value)
    result.innerText = test(textInput.value);
});


