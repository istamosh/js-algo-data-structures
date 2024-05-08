const table = document.querySelector('table');

let storageArray = [];

const prepareHeader = () => {
    table.innerHTML = `
    <tr>
        <th>#</th>
        <th>Nama Kegiatan</th>
        <th>Edit Kegiatan</th>
        <th>Hapus Kegiatan</th>
    </tr>`;
}

const tabulateData = (array) => {
    prepareHeader();
    array.forEach(element => {
        table.innerHTML += `
        <tr>
            <th>${element.id}</th>
            <td>${element.desc}</td>
            <td><button id="update-btn">Edit</button></td>
            <td><button id="delete-btn" onclick="deleteEntry(${element.id})">Hapus</button></td>
        </tr>`
    });
}

const create = () => {
    // detect vacant id
    let id = 0
    if (storageArray) {
        // toSorted() sort without mutating original array
        // iterate every id, if id is the same, shift 1 to next iteration
        storageArray.toSorted((a, b) => a.id - b.id)
        .forEach(el => {
            if (el.id !== id) {
                return;
            }
            id++;
        })
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

    tabulateData(storageArray);
}

const read = () => {
    const payload = JSON.parse(localStorage.getItem('localDb'));

    if (payload) {
        // load data to local array for display
        storageArray = payload;
        tabulateData(storageArray);
        console.log(`Successfully read! Data => ${JSON.stringify(storageArray)}`)
    }
}
// trigger read on page loading
document.addEventListener('DOMContentLoaded', () => {
    prepareHeader();
    read();
});

const deleteEntry = index => {
    // point and delete database entry by index
    // map: [id:1, id:2, id:3, ...]
    // indexOf(3) = id:3 which is index no.2
    // therefore pointer is pointing at 2
    const pointer = storageArray.map(el => el.id).indexOf(index)
    if (index !== -1) {
        // remove entry started from index no. and amount of deletion starting from there
        storageArray.splice(pointer, 1);
        localStorage.setItem('localDb', JSON.stringify(storageArray))
        console.log(`Successfully delete! Data => ${JSON.stringify(storageArray)}`)
    }

    // update the display
    tabulateData(storageArray);
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

const clearLocalStorage = () => {
    localStorage.clear();
    console.log('localStorage cleared!, refresh page to take effect');
}