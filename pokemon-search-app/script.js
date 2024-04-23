const api = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';
const statusBar = document.getElementById('status-bar');

const fetchData = async () => {
    fetched = false;
    try {
        const resource = await fetch(api)
        console.log(resource)
        const data = await resource.json()
        const {_ , results} = data;
        console.log(results)

        fetched = true;
    }
    catch (e) {
        console.log(e)

        fetched = false;
    }

    setTimeout(() => {
        statusBar.style.backgroundColor = fetched 
        ? 'limegreen' 
        : 'firebrick';
    }, 1000)
}

fetchData()