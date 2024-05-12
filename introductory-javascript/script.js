const character = "#";
const count = 8;
const rows = [];
// dynamically access last element
// rows[rows.length -1] = 10;

function padRow(rowNumber, rowCount) {
  return (
    " ".repeat(rowCount - rowNumber) +
    character.repeat(2 * rowNumber - 1) +
    " ".repeat(rowCount - rowNumber)
  );
}

for (let i = 0; i < count; i++) {
  rows.push(padRow(i + 1, count));
}

let result = "";

for (const row of rows) {
  result = result + "\n" + row;
}

console.log(result);
