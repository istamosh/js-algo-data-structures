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

const testCase = () => {
  cid.forEach(([ el ], i) => {
    console.log(`${el}, ${i}`)
  });
}

const operation = change => {
  const denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

  let themCook = '';
  let queue = new Array(9).fill(0);

  // iterate backwards (hi to low)
  for (let i = cid.length -1; i >= 0; i--) {
    // check if the change is still high or equal the denomination
    // and check if the stock is available
    while (change >= denominations[i] && cid[i][1] >= denominations[i]) {
      // reduce the current stock and reduce the current change
      cid[i][1] = parseFloat((cid[i][1] - denominations[i]).toFixed(2));
      change = parseFloat((change - denominations[i]).toFixed(2));
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
    // check if the last penny is not in stock
    if (i === 0 && cid[i][1] < denominations[i]) {
      console.log('No stock left, payment is aborted');
      return false;
    }
  }

  console.log(queue);
  queue.forEach((el, i) => {
    if (el > 0) themCook += ` ${cid[i][0]}: $${denominations[i] * el}`
  })
  return themCook;
}

const purchase = () => {
    if (cashNumber.value === ''
    || cashNumber.value === null) {
        console.log('empty')
        return;
    }

    // store the value into a variable and trim floating number beyond 2 digits
    const cash = Math.floor(cashNumber.value * 100) / 100;
    console.log(cash)

    const changes = parseFloat((cash - price).toFixed(2));

    if (changes < 0) {
      changeDiv.textContent = 'Status: INSUFFICIENT_FUNDS';
      return;
    } else if (changes === 0) {
      changeDiv.textContent = "Status: CLOSED";
      return;
    } else {
      changeDiv.textContent = '';
      console.log(changes + '<<')
    }

    const generate = operation(changes)
    ? operation(changes)
    : changeDiv.textContent = "Status: INSUFFICIENT_FUNDS";

    console.log(generate);
    
    // then gradually going down in accordance to the changes
    // then reduce the stock based on every changes spent
    // then describe the changes in a change-due div as a list
    // if there are any insufficient funds, the changes would be aborted
}

cashNumber.addEventListener('keydown', e => {
  if (e.key === 'e' 
  || e.key === 'E'
  || e.key === '+'
  || e.key === '-') e.preventDefault();
})
cashNumber.addEventListener('paste', e => {
  const clipboardData = e.clipboardData.getData('text/plain');
  const digitOnly = /^\d+$/;
  if (!digitOnly.test(clipboardData)) e.preventDefault();
})

purchaseButton.addEventListener('click', purchase)
