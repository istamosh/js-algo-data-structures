const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelectElement = document.getElementById("date-options");

// built-in Date constructors that create objects. A constructor is like a regular function, but starts with a capital letter, and is initialized with the new operator.
const date = new Date();

// returns a number between 1 and 31 that represents the day of the month for that date
const day = date.getDate();

// returns a number between 0 and 11. This represents the month for the date provided, where 0 is January and 11 is December
const month = date.getMonth() + 1;

// returns a number which represents the year for the provided date.
const year = date.getFullYear();

// returns a number between 0 and 23. This represents the hour for the provided date, where 0 is midnight and 23 is 11 p.m.
const hours = date.getHours();

// returns a number between 0 and 59 which represents the minutes for the provided date.
const minutes = date.getMinutes();

// add an embedded expression that contains the day variable, followed by another embedded expression that contains the month variable,
// followed by another embedded expression that contains the year variable.
const formattedDate = `${day}-${month}-${year}`;

// example, display string effect with split function
// const exampleSentence = "selur pmaCedoCeerf".split("").reverse().join("");
// console.log(exampleSentence);

// set its text content to the value of the formattedDate variable.
currentDateParagraph.textContent = formattedDate;

// change event is used to detect when the value of an HTML element has changed
// switch statement is used to compare an expression against multiple possible values and execute different code blocks based on the match. It's commonly used for branching logic.
// checks for a match against the expression, followed by code to run if there's a match
// Split formattedDate into an array of substrings with the .split() method and use a "-" as the separator.
// The .reverse() method is used to reverse an array in place.
// the .join() method to join the reversed array elements into a string and use a "-" for the separator
// The break statement will tell the JavaScript interpreter to stop executing statements. Without adding a break statement at the end of each case block, the program will execute the code for all matching cases
// the default case is executed when none of the previous case conditions match the value being evaluated. It serves as a catch-all for any other possible cases.
dateOptionsSelectElement.addEventListener("change", () => {
  switch (dateOptionsSelectElement.value) {
    case "yyyy-mm-dd":
      currentDateParagraph.textContent = formattedDate
        .split("-")
        .reverse()
        .join("-");
      break;
    case "mm-dd-yyyy-h-mm":
      currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
      break;
    default:
      currentDateParagraph.textContent = formattedDate;
  }
});
