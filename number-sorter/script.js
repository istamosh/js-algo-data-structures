const sortButton = document.getElementById('sort');

const sortInputArray = event => {
    // buttons associated with a form element submit by default, you need to prevent that behavior
    event.preventDefault();

    const inputValues = document.getElementsByClassName('values-dropdown');
};

sortButton.addEventListener('click', sortInputArray);