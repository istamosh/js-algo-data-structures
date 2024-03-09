const calculate = () => {
    const value = document.querySelector('#numbers').value;
    
    // regex to recognize ", " as the split separator
    const array = value.split(/,\s*/g)

    // map creates a new array instead of mutating the original array
    // The callback function needs to return a value. In this case, you want to return the value of each element converted to a number. You can do this by using the Number() constructor, passing the element as an argument.
    // Add a callback function to your .map() method that converts each element to a number.
    const numbers = array.map(el => Number(el));
}

// calculate();