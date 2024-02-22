const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result');

// chops every character into an array
const chops = char => char.split("");

// use two indexes interation (i and j)
const test = char => {
    console.clear();
    console.log(`Char length: ${char.length}`);
    console.log(`Char length /2 roundup: ${Math.ceil(char.length /2)}`);
    console.log(`Array: ${char.split("")}`)

    // var halfCoverage = Math.ceil(char.length /2);

    // var halfString = "";
    // var revHalfString = "";
    // // now get the half strings
    // for (var i = 0; i < halfCoverage; i++) {
    //     halfString += char[i];
    // }
    // // and get the reversed one
    // if (char.length % 2 == 0) {
    //     for (var i = char.length-1; i > halfCoverage -1; i--) {
    //         revHalfString += char[i];
    //     }
    // } else {
    //     for (var i = char.length-1; i > halfCoverage -2; i--) {
    //         revHalfString += char[i];
    //     }
    // }
    // console.log(halfString);
    // console.log(revHalfString);

    // // iterate half of input
    // // provide more lenient halfs
    // var lenientHalfString = "";
    // var lenientRevHalfString = "";
    // for (var i = 1; i <= halfCoverage; i++) {
    //     // then replace string for check so it's more lenient

    //     if (halfString[i] == revHalfString[i]) {

    //     }
    // }

    // define the two indexes
    let forward = 0;
    let backward = char.length -1;
    // and run the iteration simultaneously until meet midway
    while (forward < backward) {
        
    }
};

// takes input, and detects if box is empty or using whitespace only
checkButton.addEventListener('click', () => {
    // result.innerHTML = test(textInput.value)
    test(textInput.value)
});


