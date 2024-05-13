const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};
const infixEval = (str, regex) =>
  str.replace(regex, (_match, arg1, operator, arg2) =>
    infixToFunction[operator](parseFloat(arg1), parseFloat(arg2))
  );
const highPrecedence = (str) => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;

  const str2 = infixEval(str, regex);

  return str2 === str ? str : highPrecedence(str2);
};

// test if just string sign will calculate each other
console.log(highPrecedence("5*3"));

const isEven = (num) => num % 2 === 0;
const sum = (nums) => nums.reduce((acc, el) => acc + el);
const average = (nums) => sum(nums) / nums.length;
const median = (nums) => {
  const sorted = nums.slice().sort((a, b) => a - b);

  const length = sorted.length;
  const middle = length / 2 - 1;

  return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
};

const spreadsheetFunctions = {
  sum,
  average,
  median,
  even: (nums) => nums.filter(isEven),

  // check if some element in the array is even
  someeven: (nums) => nums.some(isEven),

  // check if every element in the array is even
  everyeven: (nums) => nums.every(isEven),

  // returns the first two elements
  firsttwo: (nums) => nums.slice(0, 2),

  // returns the last two elements
  lasttwo: (nums) => nums.slice(-2),

  // returns whether the nums array has 2 in the values
  has2: (nums) => nums.includes(2),

  // returns nums with every value incremented by one
  increment: (nums) => nums.map((num) => num + 1),

  // takes the first two num. from an array and returns a random number between them
  random: ([x, y]) => Math.floor(Math.random() * y + x),

  // Add a range property which generates a range from nums.
  range: ([x, y]) => range(x, y),

  // remove duplicates using new set method with spread operator (ES6)
  nodupes: (nums) => [...new Set(nums).values()],

  // handle potential edge cases
  "": (nums) => nums,
};

const applyFunction = (str) => {
  const noHigh = highPrecedence(str);

  const infix = /([\d.]+)([+-])([\d.]+)/;

  const str2 = infixEval(noHigh, infix);

  // This expression will look for function calls like sum(1, 4)
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;

  const toNumberList = (args) => args.split(",").map(parseFloat);

  const apply = (fn, args) =>
    spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));

  return str2.replace(functionCall, (match, fn, args) =>
    spreadsheetFunctions.hasOwnProperty(fn.toLowerCase())
      ? apply(fn, args)
      : match
  );
};

// implicitly returns an array constructor
// calculate the difference between start and endpoint and add 1 to the constructor
const range = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((element, index) => element + index);

const charRange = (start, end) =>
  range(start.charCodeAt(0), end.charCodeAt(0)).map((code) =>
    String.fromCharCode(code)
  );

const evalFormula = (x, cells) => {
  const idToText = (id) => cells.find((cell) => cell.id === id).value;

  // catch the range from A to J and make it grouped
  // second group should be two digits
  // digit one is ranged from 1-9
  // digit two is ranged from 0-9
  // regex look for : sign
  // and look for the same group (B12, A3)
  // and make it global and case insensitive
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;

  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));

  const elemValue = (num) => (character) => idToText(character + num);

  const addCharacters = (character1) => (character2) => (num) =>
    charRange(character1, character2).map(elemValue(num));

  // You need to make another function call to access that innermost function reference for the .map() callback by using immediate invoke function(arg1)(arg2)
  const rangeExpanded = x.replace(
    rangeRegex,
    (_match, char1, num1, char2, num2) =>
      rangeFromString(num1, num2).map(addCharacters(char1)(char2))
  );

  const cellRegex = /[A-J][1-9][0-9]?/gi;

  const cellExpanded = rangeExpanded.replace(cellRegex, (match) =>
    idToText(match.toUpperCase())
  );

  const functionExpanded = applyFunction(cellExpanded);
  return functionExpanded === x
    ? functionExpanded
    : evalFormula(functionExpanded, cells);
};

// declare the window.onload property to append a function, not like this onload(), but this onload = () => {};
window.onload = () => {
  const container = document.getElementById("container");

  // create a nested func.
  const createLabel = (name) => {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;

    container.appendChild(label);
  };

  const letters = charRange("A", "J");

  // pass the function WITHOUT the "()" for the forEach
  letters.forEach(createLabel);

  range(1, 99).forEach((number) => {
    createLabel(number);

    letters.forEach((letter) => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      // hyphenated HTML attribute property
      input.ariaLabel = letter + number;

      // add onchange HTML property and insert the update func.
      input.onchange = update;

      container.appendChild(input);
    });
  });
};

const update = (event) => {
  const element = event.target;

  // use \s to remove all whitespaces
  const value = element.value.replace(/\s/g, "");

  if (!value.includes(element.id) && value.startsWith("=")) {
    element.value = evalFormula(
      value.slice(1),
      Array.from(document.getElementById("container").children)
    );
  }
};
