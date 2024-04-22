const endpoint = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

const fetchData = async () => {
    try {
        const res = await fetch(endpoint)
        console.log(res)
        const data = await res.json()
        const {_ , results} = data;
        console.log(results)
    }
    catch (e) {
        console.log(e)
    }
}

fetchData()