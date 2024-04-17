//#region The mandatory codeblock, do not change

let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

//#endregion

const cashNumber = document.getElementById('cash');
const purchaseButton = document.getElementById('purchase-btn');
const changeDiv = document.getElementById('change-due');
const cashInRegister = document.getElementById('cash-in-register');
const expectedChange = document.getElementById('expected-change');

// make first letter uppercase
// const upperCaseFirstLetter = string => `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;

// make the second and the rest lowercase
const lowerCaseAllExceptFirstLetter = string => `${string.replaceAll(/\S*/g, word =>
`${word.slice(0, 1)}${word.slice(1).toLowerCase()}`)}`

// precisely subtract two floating numbers
const sub = (num1, num2) => parseFloat((num1 - num2).toFixed(2));
const mult = (num1, num2) => parseFloat((num1 * num2).toFixed(2));
const add = (num1, num2) => parseFloat((num1 + num2).toFixed(2));

// cap the excess floating digits to only 2 digits
const cap = num => Math.floor(num * 100) / 100;

const checkStock = () => {
  const urls = {
    'penny': 'https://www.usmint.gov/wordpress/wp-content/uploads/2022/12/2023-lincoln-penny-uncirculated-reverse-300x300.jpg',
    'nickel': 'https://www.usmint.gov/wordpress/wp-content/uploads/2022/12/2023-jefferson-nickel-uncirculated-reverse-300x300.jpg',
    'dime': 'https://www.usmint.gov/wordpress/wp-content/uploads/2022/12/2023-roosevelt-dime-uncirculated-reverse-300x300.jpg',
    'quarter': 'https://www.usmint.gov/wordpress/wp-content/uploads/2023/12/2024-american-women-quarters-coin-pauli-murray-uncirculated-reverse-300x300.jpg',
    'one': 'https://www.usmint.gov/wordpress/wp-content/uploads/2023/12/2024-native-american-one-dollar-uncirculated-coin-reverse-300x300.jpg',
    'five': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/US_%245_Series_2006_obverse.jpg/320px-US_%245_Series_2006_obverse.jpg',
    'ten': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/US10dollarbill-Series_2004A.jpg/320px-US10dollarbill-Series_2004A.jpg',
    'twenty': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/US_%2420_Series_2006_Obverse.jpg/320px-US_%2420_Series_2006_Obverse.jpg',
    'one hundred': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg/320px-Obverse_of_the_series_2009_%24100_Federal_Reserve_Note.jpg',
  }

  let html = '';
  // let total = price;
  cid.forEach(([ el, stock ] , i) => {
    // total = add(total, stock);

    if (stock > 0) {
      html += 
      `<div>
        <img src='${urls[el.toLowerCase()]}' alt='${el.toLowerCase()}' class='${i < 5 ? 'coin' : 'bill'}'>
        ${lowerCaseAllExceptFirstLetter(el)}: <span class='digit'>$ ${stock}</span>
      </div>`
    }
    else {
      html += 
      `<div>
        <img src='${urls[el.toLowerCase()]}' alt='${el.toLowerCase()}' class='${i < 5 ? 'coin' : 'bill'} empty'>
        <span class='empty-digit'>${lowerCaseAllExceptFirstLetter(el)}: <span class='digit'>$ ${stock}</span></span>
      </div>`
    }
  });
  cashInRegister.innerHTML = html;
  // cashInRegister.innerHTML += `<br><br>Stock + Price = ${total}`
}

checkStock();

const operation = change => {
  const denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

  // map the cid to point the stocks, then merge the elements by adding it
  let totalStock = cid.map(el => el[1]).reduce((prev, curr) => add(prev, curr));

  if (change > totalStock) {
    return '';
  }

  let query = new Array(9).fill(0);
  let emptyStock = false;

  if (change === totalStock) {
    emptyStock = true;
  }

  // iterate backwards (hi to low)
  for (let i = cid.length -1; i >= 0; i--) {
    if (change >= denominations[i] && change > 0) {
      // count them in a simulator before applying stuff
      let counter = 0;
      let simulatingCurrentStock = cid[i][1];

      // runs if currStock isn't depleted and currChange is same or higher than denom
      while (simulatingCurrentStock > 0 && change >= denominations[i]) {
        // simulates the transaction between cashier and customer
        // count how many times the money is spent based on the denom
        simulatingCurrentStock = sub(simulatingCurrentStock, denominations[i]);
        change = sub(change, denominations[i]);
        counter++;
      }

      // if there are 1 or more transactions, query the changes to the stock later
      if (counter > 0) {
        query[i] = mult(denominations[i], counter)
      }
    }
  }
  if (change > 0) {
    return '';
  }

  let themCook = '';
  cid.forEach(([denom, val], i) => {
    cid[i][1] = sub(val, query[i]);
    themCook += ` ${denom}: $${query[i]}`;
  });

  if (!emptyStock) return `Status: OPEN${themCook}`;
  else return `Status: CLOSED${themCook}`;
}

const purchase = () => {
  if (cashNumber.value === ''
  || cashNumber.value === null) {
      return;
  }

  // store the value into a variable and trim floating number beyond 2 digits
  const cash = cap(cashNumber.value);

  const changes = sub(cash, price);

  if (changes < 0) {
    changeDiv.textContent = 'Status: INSUFFICIENT_FUNDS';
    alert("Customer does not have enough money to purchase the item")
    return;
  } else if (changes === 0) {
    changeDiv.textContent = "No change due - customer paid with exact cash";
    return;
  } else {
    changeDiv.textContent = '';
  }

  const generate = operation(changes);

  if (generate !== '') {
    changeDiv.textContent = `${generate}`;
  }
  else {
    changeDiv.textContent = 'Status: INSUFFICIENT_FUNDS';
  }
  
  checkStock();
}

cashNumber.addEventListener('keydown', e => {
  if (e.key === 'e' 
  || e.key === 'E'
  || e.key === '+'
  || e.key === '-') e.preventDefault();

  if (e.key === 'Enter') {
    purchase();
    e.preventDefault();
  }

  setTimeout(predictChange, 100)
})
cashNumber.addEventListener('paste', e => {
  const clipboardData = e.clipboardData.getData('text/plain');
  const floatOnly = /^\d+.\d+$/;
  if (!floatOnly.test(clipboardData)) e.preventDefault();

  setTimeout(predictChange, 100)
})
cashNumber.addEventListener('input', () => {
  setTimeout(predictChange, 100)
})

const predictChange = () => {
  let calculate = 0;
  if (cashNumber.value !== '' || cashNumber.value !== null) {
    calculate = sub(cap(cashNumber.value), price);
  }
  if (calculate > 0) {
    expectedChange.innerHTML = `Change: <span class="digit">$ ${calculate}</span>`;
    return;
  }
  expectedChange.innerHTML = '';
}

purchaseButton.addEventListener('click', purchase)