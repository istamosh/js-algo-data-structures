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
  let html = '';
  let total = price;
  cid.forEach(([ el, stock ] , i) => {
    console.log(`${el} remaining: ${stock}`)
    total = add(total, stock);

    if (i > 0) {
      if (stock > 0) {
        html += 
        `
        <div class="${el.toLowerCase()}">
          <img src='' alt='' class=''>
          ${lowerCaseAllExceptFirstLetter(el)}: $${stock}
        </div>`
      }
      else {
        html += 
        `<div class="${el.toLowerCase()} empty">
          ${lowerCaseAllExceptFirstLetter(el)}: $${stock}
        </div>`
      }
    }
    else {
      html += `<strong>Cashes in the register status:</strong>`
      if (stock > 0) {
        html += 
        `<div class="${el.toLowerCase()}">
          ${lowerCaseAllExceptFirstLetter(el)}: $${stock}
        </div>`
      }
      else {
        html += 
        `<div class="${el.toLowerCase()} empty">
          ${lowerCaseAllExceptFirstLetter(el)}: $${stock}
        </div>`
      }
    } 
  });
  cashInRegister.innerHTML = html;
  cashInRegister.innerHTML += `<br><br>Stock + Price = ${total}`
}

checkStock();

const operation = change => {
  const denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

  let themCook = '';
  let queue = new Array(9).fill(0);
  let emptyStock = false;

  // iterate backwards (hi to low)
  for (let i = cid.length -1; i >= 0; i--) {
    // check if the change is still high or equal the denomination
    // and check if the stock is available
    while (change >= denominations[i] && cid[i][1] >= denominations[i]) {
      // reduce the current stock and reduce the current change
      cid[i][1] = sub(cid[i][1], denominations[i]);
      change = sub(change, denominations[i]);
      console.log(change);
      queue[i] += 1;
    }
    // check if it's not reached last iterations yet and
    // has insufficient change OR insufficient stock
    if (i > 0 && (change < denominations[i] || cid[i][1] < denominations[i])) {
      if (change < denominations[i]) {
        console.log(`Skipping from ${denominations[i]}...`)
        continue;
      }
      console.log(`Denom ${cid[i][0]} is out of stock ($ ${cid[i][1]})`);
      continue;
    }
    // check if the change is still there but the last penny is not in stock
    if (change > 0 && i === 0 && cid[i][1] < denominations[i]) {
      console.log('No stock left, payment is aborted');
      return '';
    }

    // check if change queue is met, and the last penny is empty
    // check if no stock left in the drawer
    if (change === 0 && i === 0 && cid[i][1] === 0)
      emptyStock = cid.every(([ _, element ]) => element === 0)
  }

  console.log(queue);
  queue.forEach((el, i) => {
    if (el > 0) themCook += ` ${cid[i][0]}: $${mult(denominations[i], el)}`
  })

  if (!emptyStock) return `Status: OPEN${themCook}`;
  else return `Status: CLOSED${themCook}`;
}

const purchase = () => {
    if (cashNumber.value === ''
    || cashNumber.value === null) {
        console.log('empty')
        return;
    }

    // store the value into a variable and trim floating number beyond 2 digits
    const cash = cap(cashNumber.value);
    console.log(cash)

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
      console.log(changes + '<<')
    }

    const generate = operation(changes);

    console.log(generate);

    if (generate !== '') {
      changeDiv.textContent = `${generate}`
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

const predictChange = () => {
  let calculate = 0;
  if (cashNumber.value !== '' || cashNumber.value !== null) {
    calculate = sub(cap(cashNumber.value), price);
  }
  if (calculate > 0) {
    expectedChange.textContent = `Change: $ ${calculate}`;
    return;
  }
  expectedChange.textContent = '';
}

purchaseButton.addEventListener('click', purchase)