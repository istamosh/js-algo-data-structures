const messageInput = document.getElementById('message-input');
const result = document.getElementById('result');
const checkMessageButton = document.getElementById('check-message-btn');

// using alternate sequence as an OR in regex
const helpRegex = /please help|assist me/i;

// [aeiou] is match the whole aeiou
// [a-z] is match the word a to z
// + quantifier to match one or more desired characters
const dollarRegex = /[0-9]+ (?:hundred|thousand|million|billion)? dollars/i;

// vowel mapping/coupling [e3] [i1] [a@4] [o0] [c([{]
const freeRegex = /(?:\s|^)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;

const stockRegex = /(?:\s|^)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;

const dearRegex = /(?:\s|^)d[e3][a@4]r fr[i|1][e3]nd(?:$|\s)/i;

const denyList = [
    helpRegex, 
    dollarRegex, 
    freeRegex, 
    stockRegex,
    dearRegex
];

const isSpam = msg => denyList.some(regex => regex.test(msg));

checkMessageButton.addEventListener('click', () => {
    if (messageInput.value === '') {
        alert('Please enter a message.');
        return;
    }

    // using assignment operator firsthand
    result.textContent = isSpam(messageInput.value) ?
    'Oh no! This looks like a spam message.' :
    'This message does not seem to contain any spam.';

    messageInput.value = '';
})