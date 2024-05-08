const table = document.querySelector('table');

let storageArray = [];

const tabulateData = (array) => {
    array.forEach(element => {
        table.innerHTML += `
        <tr>
            <th>${element.id}</th>
            <td>${element.desc}</td>
            <td><button id="update-btn">Edit</button></td>
            <td><button id="delete-btn">Hapus</button></td>
        </tr>`
    });
}

const create = () => {
    // detect vacant id
    let id = 0
    if (storageArray) {
        for (let i = 0; i < storageArray.length; i++) {
            if (i === storageArray[i].id) {
                id++;
            }
            else {
                id = i;
            }
        }
    }
        
    // desc preset
    const desc = `Kegiatan ${id +1}`
    // store entry
    const newEntry = {
        id: id,
        desc: desc
    };

    // save the entry into array of obj and serialize it into the localStorage
    storageArray.push(newEntry);
    localStorage.setItem('localDb', JSON.stringify(storageArray))
    console.log(`Successfully stored! Data => ${JSON.stringify(storageArray)}`)

    // display only newly created data
    tabulateData(new Array(newEntry));
}

const read = () => {
    const hehe = JSON.parse(localStorage.getItem('localDb'));
    console.log(hehe);
    // localStorage.clear();
    if (hehe) {
        storageArray = hehe;
        tabulateData(storageArray);
    }
}
// trigger read on page loading
document.addEventListener('DOMContentLoaded', read());

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