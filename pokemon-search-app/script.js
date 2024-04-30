// Below api contains 1302 array elements, every element is an object
// that contains pokemon id, name, and its url
const api = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/`;

const inputBox = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const cardBack = document.getElementsByClassName('card-back');

const divElements = document.querySelectorAll('#card-portrait div:not(.card-back)');

const search = async () => {
    try {
        const input = inputBox.value.toLowerCase();

        const resp = await fetch(`${api}${input}`);
        const data = await resp.json();
        console.log(data)

        tabulate(data)
    }
    catch (err) {
        clear();
        console.error('Pokémon not found: ' + err);
        alert('Pokémon not found');
    }
}

const tabulate = data => {
    const img = `<img src="${data.sprites.front_default}" alt="" id="sprite">`
    const types = data.types
    .map(el => `<p class="type ${el.type.name}">${el.type.name.toUpperCase()}</p>`)
    .join('');
    const base_stats = data.stats.map(el => el.base_stat)

    const pointer = [
        data.name.toUpperCase(),
        data.id,
        data.weight,
        data.height,
        img,
        types
    ]
    pointer.push.apply(pointer, base_stats)
    
    cardBack[0].style.display = 'none'

    divElements.forEach((element, i) => {
        if (i === 4 || i === 5) {
            element.innerHTML = pointer[i];
        }
        else {
            element.textContent = pointer[i];
        }
    });
}

const clear = () => { 
    divElements.forEach(el => {
        el.innerHTML = '';
        cardBack[0].style.display = 'block'
    })
}

inputBox.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        search();
    }
})

searchButton.addEventListener('click', e => {
    e.preventDefault(); // prevent multiple successions
    search();
})