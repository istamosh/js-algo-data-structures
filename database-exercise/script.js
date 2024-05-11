let namePreset = `Activity`;
let storageArray = [];

const table = document.querySelector('table');

const prepareHeader = () => {
    table.innerHTML = `
    <tbody>
        <tr>
            <th>No.</th>
            <th>Activity Name</th>
            <th>Edit Activity</th>
            <th>Delete Activity</th>
        </tr>
    </tbody>
    `;
}

const tabulateData = (array) => {
    prepareHeader();
    array.forEach(element => {
        table.innerHTML += `
        <tbody>
            <tr id="row-${element.id}">
                <th id="number">${element.id +1}</th>
                <td id="description-${element.id}">${element.desc}</td>
                <td><button id="update-btn-${element.id}" onclick="editButton(${element.id})">Edit</button></td>
                <td><button id="delete-btn" onclick="deleteEntry(${element.id})">Delete</button></td>
            </tr>
        </tbody>
        `
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
    const desc = `${namePreset} ${id +1}`
    // store entry
    const newEntry = {
        id: id,
        desc: desc
    };

    // save the entry into array of obj and serialize it into the localStorage
    storageArray.push(newEntry);
    localStorage.setItem('localDb', JSON.stringify(storageArray))
    console.log(`Successfully stored! Data => ${JSON.stringify(storageArray)}`)

    // display the newly created row
    table.innerHTML += `
    <tbody>
        <tr id="row-${id}">
            <th id="number">${id +1}</th>
            <td id="description-${id}">${desc}</td>
            <td><button id="update-btn-${id}" onclick="editButton(${id})">Edit</button></td>
            <td><button id="delete-btn" onclick="deleteEntry(${id})">Hapus</button></td>
        </tr>
    </tbody>
    `
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

const editButton = (i) => {
    const activityBox = document.getElementById(`description-${i}`);
    const textInput = activityBox.innerText
    activityBox.innerText = ""
    
    activityBox.innerHTML += 
    `
    <div id="div-${i}">
        <textarea spellcheck="false" id="textarea-${i}" rows="2" placeholder="Press Alt+S to save...">${textInput}</textarea>
        <button id="save-btn" onclick="update(${i})" accesskey="s">Save</button>
    </div>
    `

    document.getElementById(`update-btn-${i}`).disabled = true;
}
const update = (i) => {
    const content = document.getElementById(`textarea-${i}`);
    
    const pointer = storageArray.map(el => el.id).indexOf(i)
    if (i !== -1) {
        // remove entry started from index no. and amount of deletion starting from there
        storageArray[pointer].desc = `${content.value}`;

        // apply the update into db
        localStorage.setItem('localDb', JSON.stringify(storageArray))
        console.log(`Successfully updated! Data => ${JSON.stringify(storageArray)}`)
    
        // find the activity bar then delete the edit form
        const activityBox = document.getElementById(`description-${i}`);
        const div = document.getElementById(`div-${i}`);
        div.remove();

        // apply value from textarea
        activityBox.innerText = content.value;

        // reenable the edit button
        document.getElementById(`update-btn-${i}`).disabled = false;
    }
}

const deleteEntry = i => {
    // point and delete database entry by index
    // map: [id:1, id:2, id:3, ...]
    // indexOf(3) = id:3 which is index no.2
    // therefore pointer is pointing at 2
    const pointer = storageArray.map(el => el.id).indexOf(i)
    if (i !== -1) {
        // remove entry started from index no. and amount of deletion starting from there
        storageArray.splice(pointer, 1);
        localStorage.setItem('localDb', JSON.stringify(storageArray))
        console.log(`Successfully deleted! Data => ${JSON.stringify(storageArray)}`)

        // remove the said data
        document.getElementById(`row-${i}`).parentNode.remove();
    }
}