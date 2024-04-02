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

const purchase = () => {
    if (cashNumber.value === ''
    || cashNumber.value === null) {
        console.log('empty')
        return;
    }
    console.log(cashNumber.value);

    // store the value into a variable
    const cash = cashNumber.value;
    // make another copy of the cashes in drawer
    let stocks = [...cid];
    // takes customer money
    // then give changes to the customer based on the money that the customer offers
    // give highest possible stock available inside an array
    // then gradually going down in accordance to the changes
    // then reduce the stock based on every changes spent
    // then describe the changes in a change-due div as a list
    // if there are any insufficient funds, the changes would be aborted
}

purchaseButton.addEventListener('click', purchase)
