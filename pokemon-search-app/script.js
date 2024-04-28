// Below api contains 1302 array elements, every element is an object
// that contains pokemon id, name, and its url
const api = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

const statusBar = document.getElementById('status-bar');
const inputBox = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const divElements = document.querySelectorAll('#card-portrait div');

const name = document.getElementById('pokemon-name');
const id = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const spcAttack = document.getElementById('special-attack');
const spcDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const fetchData = async () => {
    fetched = false;
    while (!fetched) {
        try {
            resource = await fetch(api)
            parsed = await resource.json()

            fetched = true;
            return parsed;
        }
        catch (e) {
            fetched = false;
            throw e;
        }
    }
}

const fetchPokemonData = async url => {
    try {
        resource = await fetch(url)
        parsed = await resource.json()
        console.log(parsed)
        displayPokemon(parsed)
    }
    catch (er) {
        console.log(er)
    }
}

const execute = () => {
    const value = parseInt(inputBox.value)

    const hehe = data.results.find(el => el.id === value)
    if (!hehe) {
        alert('Pokémon not found');
        return
    }
    console.log(hehe)

    fetchPokemonData(hehe.url);
}

const search = async () => {
    try {
        input = inputBox.value.toLowerCase();

        resp = await fetch(`${api}/${input}`);
        data = await resp.json();
        console.log(data)

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

        divElements.forEach((el, i) => {
            if (i === 4 || i === 5) {
                el.innerHTML = pointer[i];
            }
            else {
                el.textContent = pointer[i];
            }
        });

        
    }
    catch (err) {
        alert('Pokémon not found');
        console.log('Pokémon not found: ' + err);
    }
}

const clear = () => { divElements.forEach(el => {el.innerHTML = ''})}

inputBox.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        clear()
        search();
    }
})

searchButton.addEventListener('click', e => {
    e.preventDefault() // prevent multiple successions
    clear()
    search()
})