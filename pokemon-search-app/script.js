// Below api contains 1302 array elements, every element is an object
// that contains pokemon id, name, and its url
const api = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/`;

const inputBox = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const cardBack = document.querySelector('.card-back');
const divElements = document.querySelectorAll('#card-portrait div:not(.card-back, .icon-container)');
const cardContents = document.querySelectorAll('#card-portrait *:not(.card-back, .icon-container, .gg-pokemon)');

// hide all the contents first
cardContents.forEach(element => {
    element.style.visibility = 'hidden';
});

const search = async () => {
    try {
        const input = inputBox.value.toLowerCase();

        const resp = await fetch(`${api}${input}`);
        const data = await resp.json();

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

    // name,id,wt,ht,img,type,hp,atk,def,spcatk,spcdef,spd
    const pointer = [
        data.name.toUpperCase(),
        data.id,
        data.weight,
        data.height,
        img,
        types
    ]
    pointer.push.apply(pointer, base_stats)
    
    // flip the card
    cardBack.style.display = 'none'
    cardContents.forEach(element => {
        element.style.visibility = 'visible'
    });

    // main icon for HP section
    const mainIcon = document.querySelector('.icon');
    mainIcon.innerHTML = `<i class="energy ${data.types.map(el => el.type.name)[0]}-icon"></i>`;

    // apply the content values
    divElements.forEach((element, i) => {
        if (i === 0) {
            element.textContent = pointer[i];

            // set enough width of name
            const textWidth = element.textContent.length * 23;
            document.getElementById('pokemon-name').style.width = textWidth +'px';
        }
        else if (i === 4 || i === 5) {
            element.innerHTML = pointer[i];
        }
        else {
            element.textContent = pointer[i];
        }
    });

     // placing energy icons
    const energies = data.types
        .map(el => `<i class="energy ${el.type.name}-icon"></i>`)
        .join('');
    document.getElementById('energy-icons').innerHTML = energies;

    // set energy icon shadows
    document.querySelectorAll('.energy').forEach(el => {
        el.style.boxShadow = `0 0 10px ${window.getComputedStyle(el).getPropertyValue('background-color')}`;
    })

    // set frame color according to pokemon type
    const mainColor = window.getComputedStyle(mainIcon.querySelector('.energy')).getPropertyValue('background-color');
    document.getElementById('image').style.border = `1px solid ${mainColor}`;
    document.getElementById('image').style.boxShadow = `inset 0 0 75px ${mainColor}`;
}

const clear = () => { 
    cardContents.forEach(element => {
        element.style.visibility = 'hidden';
    });
    // flip back
    cardBack.style.display = null;
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

// --- finding longest pokemon name in apicall
// --- result: squawkabilly-yellow-plumage (ID: 10261)