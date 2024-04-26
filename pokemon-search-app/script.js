// Below api contains 1302 array elements, every element is an object
// that contains pokemon id, name, and its url
const api = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

const statusBar = document.getElementById('status-bar');
const inputBox = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pElements = document.querySelectorAll('#card-portrait p');

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

let data;
fetchData()
    .then(res => {
        statusBar.style.backgroundColor = 'limegreen'
        
        data = res;
        console.log(data.results)
    })
    .catch(err => {
        console.log(err)
        statusBar.style.backgroundColor = 'firebrick'
    })

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

const displayPokemon = data => {
    // retrieve types (plural)
    const types = data.types.map(el => el.type).map(el => el.name).join(" and ")
    console.log(types)
    // retrieve HP, ATK, DEF, SPC ATK, SPC DEF, SPD
    const base_stats = data.stats.map(el => el.base_stat)
    console.log(base_stats)

    const pointer = [
        data.name, 
        data.id, 
        data.weight, 
        data.height, 
        types
    ]
    pointer.push.apply(pointer, base_stats)
    
    pElements.forEach((element, i) => {
        element.textContent = pointer[i];
    });
}

inputBox.addEventListener('keydown', e => {
    if (e.key === 'Enter' && data) {
        execute();
        e.preventDefault();
    }
})

searchButton.addEventListener('click', e => {
    execute()
    e.preventDefault()
})