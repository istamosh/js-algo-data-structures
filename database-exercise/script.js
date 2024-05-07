let entry = [];

const create = () => {
    // detect vacant id
    let id = 0
    if (entry.length !== 0) 
        for (let i = 0; i < entry.length; i++) 
        i === entry[i].id 
        ? id++ 
        : id = i;
    
    // desc preset
    const desc = `Kegiatan ${id +1}`
    // store entry
    const newEntry = {
        id: id,
        desc: desc
    }

    document.querySelector('table').innerHTML += `
    <tr>
        <th>${id}</th>
        <td>${desc}</td>
        <td><button id="update-btn">Edit</button></td>
        <td><button id="delete-btn">Hapus</button></td>
    </tr>`

    entry.push(newEntry)
    // localStorage.setItem("localDb", JSON.stringify(newEntry))
    console.log(`Created!, ${JSON.stringify(entry)}`)
}

const testing = () => {
    let objArr = [
        {
            id: 1,
            desc: "One"
        },
        {
            id: 2,
            desc: "Two"
        },
    ]
    for (let i = 0; i < objArr.map(el => el.id).length; i++) {
        console.log(objArr[i].id)
    }
}

document.getElementById('create-btn').addEventListener('click', e => {
    e.preventDefault()
    create()
})