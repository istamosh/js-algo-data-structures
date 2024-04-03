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

const purchase = () => {
    if (cashNumber.value === ''
    || cashNumber.value === null) {
        console.log('empty')
        return;
    }

    // store the value into a variable and trim floating number beyond 2 digits
    const cash = Math.floor(cashNumber.value * 100) / 100;
    console.log(cash)
    // make another copy of the cashes in drawer
    let stocks = [...cid];
    // calculate pre-applying changes
    const change = parseFloat((cash - price).toFixed(2));

    if (change < 0) {
      changeDiv.textContent = 'Status: INSUFFICIENT_FUNDS';
      return;
    } else {
      changeDiv.textContent = '';
      console.log(change)
    }
    // give highest possible stock available inside an array
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
