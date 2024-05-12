const character = "#";
const count = 8;
const rows = [];
// dynamically access last element
// rows[rows.length -1] = 10;

for (let i = 0; i < count; i = i + 1) {
  rows.push(character.repeat(i + 1));
}

let result = "";

for (const row of rows) {
  result = result + "\n" + row;
}

console.log(result);
