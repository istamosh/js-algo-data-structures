const sortButton = document.getElementById('sort');

const sortInputArray = event => {
    // buttons associated with a form element submit by default, you need to prevent that behavior
    event.preventDefault();

    // spread the array result directly
    // map the array w/ dropdown params and return its value
    const inputValues = [...document.getElementsByClassName('values-dropdown')].map(dropdown => Number(dropdown.value));
};

// declaring funct. that have own param with fallback value of an array
const updateUI = (array = []) => {
    array.forEach((num, i) => {
        const outputValueNode = document.getElementById(`output-value-${i}`);
    });
};

sortButton.addEventListener('click', sortInputArray);