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
  if (0.01 > 0) {
    console.log('above 10');
  }
  else console.log('zero')
}

const operation = change => {
  const denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

  while (change > 0) {
    for (let i = cid.length - 1; i >= 0; i--) {
      // check if change is higher than the denomination
      if (change >= denominations[i]) {
        // check if cid stock is available
        if (cid[i][1] >= change) {
          // update by reducing the stock and update the remaining change
          cid[i][1] -= denominations[i];
          change -= denominations[i];
        }
        // check if iteration reached 0 and no available stock left
        else if (i === 0 && cid[i][1] < change) return false;
        else break;
      }
    }
  }
  return true;
}

const operation2 = change => {
  const denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

  while (change > 0) {
    cid.forEach((el, i) => {
      // if (change >= denominations[])
    });
  }
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
    // make another copy of the cashes in drawer
    // let stocks = [...cid];
    // calculate pre-applying changes
    const change = parseFloat((cash - price).toFixed(2));

    if (change < 0) {
      changeDiv.textContent = 'Status: INSUFFICIENT_FUNDS';
      return;
    } else if (change === 0) {
      changeDiv.textContent = "Status: CLOSED";
      return;
    } else {
      changeDiv.textContent = '';
      console.log(change)
    }

    const result = operation(change);

    // give highest possible stock available inside an array

    //#region Experiment
    // let changes = [];
    // // iterate thru the cid array
    // for (let i = 0; i < cid.length; i++) {
    //   // check if change is below the cid nominee
    //   if (change < cid[i]) {
    //     // shift 1 to prev. iteration, check if stock is equal or higher from the supposed calculation
    //     if (cid[i - 1][1] >= reducer[i - 1]) {
    //       // reduce the stock
    //       cid[i - 1][1] -= reducer[i - 1]
    //       // push the nominee into the change list
    //       changes.push(cid[i-1]);
    //     }
    //   }
    // }

    // run a simulation
    // while (change > 0) {
    //   cid.findLast((element, i) => {
    //     if (change >= element[0] && change <= element[1]) {
    //       cid[i][1] -= reverseReducer[i];
    //       change -= element;
    //     }
    //   });
    // }

    // run simulation II
    // while (change > 0) {
    //   for (let i = cid.length - 1; i >= 0; i--) {
    //     // check if change is higher than the denomination
    //     myIf: if (change >= denominations[i]) {
    //       // check if cid stock is available
    //       if (cid[i][1] >= change) {
    //         // update by reducing the stock and update the remaining change
    //         cid[i][1] -= denominations[i];
    //         change -= denominations[i];
    //       }
    //       // check if iteration reached 0 and no available stock left
    //       else if (i === 0 && cid[i][1] < change) {
    //         break;
    //       }
    //       else break myIf;
    //     }
    //   }
    // }
    //#endregion
    
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

purchaseButton.addEventListener('click', testCase)
