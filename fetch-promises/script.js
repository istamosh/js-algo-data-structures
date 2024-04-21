const authorContainer = document.getElementById('author-container')
const loadMoreBtn = document.getElementById('load-more-btn')

let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

// pick resource data and map it in json
// append data to array then display only 8 out of all authors
// catch something if the fetch request fails (data fails to load)
fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
    .then(res => res.json())
    .then(data => {
        authorDataArr = data;

        displayAuthors(authorDataArr.slice(startingIndex, endingIndex))
    })
    .catch(err => authorContainer.innerHTML = `<p class="error-msg">There was an error loading the authors</p>`);

// adjust both starting/ending index to 8 for authors index
const fetchMoreAuthors = () => {
    startingIndex += 8;
    endingIndex += 8;

    displayAuthors(authorDataArr.slice(startingIndex, endingIndex))

    // properties to disable if no more data to load
    if (authorDataArr.length <= endingIndex) {
        loadMoreBtn.disabled = true;
        // view it in Properties > style.cursor
        loadMoreBtn.style.cursor = 'not-allowed';
        loadMoreBtn.textContent = 'No more data to load';
    }
}

const displayAuthors = authors => {
    authors.forEach(({ author, image, url, bio }, index) => {
        authorContainer.innerHTML += `
        <div id="${index}" class="user-card">
            <h2 class="author-name">${author}</h2>
            <img src="${image}" alt="${author} avatar" class="user-img">
            <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + "..." : bio}</p>
            <div class="purple-divider"></div>
            <a href="${url}" class="author-link" target="_blank">${author}'s author page</a>
        </div>
        `;
    });
}

loadMoreBtn.addEventListener('click', fetchMoreAuthors);