'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// SECTION: BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// SECTION: Creating DOM Elements
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (movement, index) {
    // need this to see what type (deposit/ withdrawl)
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__value">${movement}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// SECTION: Creating Usernames
const convertToUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
convertToUsernames(accounts);
// see that usernames got created
accounts.forEach(account => console.log(account.username));

// SECTION: The reduce method
const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(function (
    accumulator,
    movement,
    index
  ) {
    return accumulator + movement;
  },
  0);
  labelBalance.textContent = `${account.balance}€`;
};

// SECTION: The magic of chaining methods
const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(movement => movement > 0)
    .reduce((total, movement) => total + movement, 0);
  labelSumIn.textContent = `${income}€`;
  const out = Math.abs(
    account.movements
      .filter(movement => movement < 0)
      .reduce((total, movement) => total + movement, 0)
  );
  labelSumOut.textContent = `${out}€`;
  const interests = account.movements
    .filter(movement => movement > 0)
    .map(movement => movement * account.interestRate)
    .filter(interest => interest > 1)
    .reduce((total, interest) => total + interest, 0);
  labelSumInterest.textContent = `${interests}€`;
};

// SECTION: Implementing Login
let currentAccount; // global var used in other functions

const updateUI = function (currentAccount) {
  // display movements
  displayMovements(currentAccount.movements);
  // display and calculate balance
  calcDisplayBalance(currentAccount);
  // display and calculate summary
  calcDisplaySummary(currentAccount);
};

btnLogin.addEventListener('click', function (event) {
  event.preventDefault(); // prevent form from submitting
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100; // change opacity to make UI show
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    updateUI(currentAccount);
  }
});

// SECTION: Implementing Transfers

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    // update the interface
    updateUI(currentAccount);
  }
  // clean out inputs
  inputTransferAmount.value = inputTransferTo.value = '';
});

// SECTION: Some and every
// request loan from bank, only happens if there is at least one deposite with at least 10% of requested loan amount
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(movement => movement >= 0.1 * amount)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// SECTION: The findIndex method
// close the account
btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // delete user from data
    accounts.splice(index, 1);
    // hide UI (log out of user)
    containerApp.style.opacity = 0;
  }
  // clear input fields
  inputCloseUsername.value = inputClosePin.value = '';
});

// SECTION: Sorting Arrays
// when you click on sort btn, alternate between sort and normal
// see changes to displayMovements function
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
// SECTION: TRAININGS
// SECTION: Simple Array Methods
console.log('SIMPLE ARRAY METHODS');
let arr = ['a', 'b', 'c', 'd', 'e'];
// slice
console.log(arr.slice(2), arr.slice(2, 4), arr.slice(-2), arr.slice(1, -1));
console.log('Shallow copy of array:', arr.slice());
// splice
console.log(arr.splice(2), arr);
console.log(arr.splice(-1), arr);
arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.splice(1, 2), arr);
// reverse
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse(), arr2);
// concat
const letters = arr.concat(arr2);
console.log(letters, arr, arr2);
console.log([...arr, ...arr2]);
// join
console.log(letters.join(' - '));

// SECTION: The new "at" method
console.log('\n THE NEW AT METHOD');
const arr3 = [23, 11, 64];
console.log(arr3[0], arr3.at(0));
// good for getting last item in array
console.log(arr3[arr3.length - 1], arr.slice(-1)[0], arr3.at(-1));

// SECTION: Looping arrays: forEach
console.log('\n LOOPING ARRAYS: FOR EACH');
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// For-of equivalent
for (const [i, action] of movements.entries()) {
  action > 0
    ? console.log(`Movement ${i + 1}: You deposited $${action}`)
    : console.log(`Movment ${i + 1}: You withdrew $${Math.abs(action)}`);
}
// to get counter in for-of, do array.entries()

// forEach
movements.forEach(function (action, index, array) {
  action > 0
    ? console.log(`Movement ${index + 1}: You deposited $${action}`)
    : console.log(`Movement ${index + 1}: You withdrew $${Math.abs(action)}`);
});

// SECTION: forEach with maps and sets
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR']);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}`);
});

// SECTION: The map method
console.log('\n THE MAP METHOD');
const euroToUsd = 1.16; // 1 euro = 1.16 USD
const movementsUSD = movements.map(movement => movement * euroToUsd);
console.log(movements, movementsUSD);

const movementsDescriptors = movements.map(function (action, i) {
  return `Movement ${i + 1}: `.concat(
    action > 0
      ? `You deposited $${action}`
      : `You withdrew $${Math.abs(action)}`
  );
});
console.log(movementsDescriptors);

// SECTION: The filter method
console.log('\n THE FILTER METHOD');
console.log(movements);
const deposits = movements.filter(movement => movement > 0);
console.log('Deposits', deposits);

const withdrawals = movements.filter(movement => movement < 0);
console.log('Withdrawals', withdrawals);

// SECTION: The reduce method
console.log('\n THE REDUCE METHOD');
const balance = movements.reduce(function (accumulator, value, index) {
  console.log(`Iteration ${index}: ${accumulator}`);
  return accumulator + value;
}, 0);
console.log(balance);

console.log(movements.reduce((acc, curr) => acc + curr, 0));

// Maximum and minimum value
console.log(
  'Maximum: ',
  movements.reduce(function (max, value, index) {
    return max > value ? max : value;
  }, movements[0])
);
console.log(
  'Minimum: ',
  movements.reduce(function (min, value, index) {
    return min < value ? min : value;
  }, movements[0])
);

// SECTION: The magic of chaining methods
console.log('\n CHAINING METHODS');
// take all deposits, convert to USD, and then sum it up
const totalDepositsinUSD = movements
  .filter(function (movement, i, array) {
    //console.log(array);
    return movement > 0;
  })
  .map(function (movement, i, array) {
    //console.log(array);
    return movement * euroToUsd;
  })
  .reduce((total, movement) => total + movement, 0);
console.log(totalDepositsinUSD);

// SECTION: The Find Method
console.log('\n THE FIND METHOD');
const firstWithdrawl = movements.find(movement => movement < 0);
console.log(movements, firstWithdrawl);

const accountFromOwner = accounts.find(acc => acc.owner == 'Jessica Davis');
console.log(accountFromOwner);

// SECTION: Some and Every
console.log('\n SOME AND EVERY');
const isDeposit = mov => mov > 0;
console.log(movements.some(isDeposit));
console.log(movements.some(mov => mov > 5000));
console.log(movements.every(isDeposit));
console.log(account4.movements.every(isDeposit));

// SECTION: flat and flatmap
console.log('\n FLAT AND FLATMAP');
const arr1 = [1, 2, [3, 4, [5, 6]]];
console.log(arr1);
console.log(arr1.flat());
console.log(arr1.flat(2));
// bank wants to calculate overall balance of all movements of all accounts
// accounts array holds all accounts, which are objects with movement key-value pair
const accountMovements = accounts.map(acc => acc.movements).flat();
console.log(accountMovements);
const overallBalance = accountMovements.reduce(
  (accumulator, movement) => accumulator + movement,
  0
);
console.log(overallBalance);
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((accumulator, movement) => accumulator + movement, 0);
console.log(overallBalance2);

// SECTION: Sorting Arrays
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners);
console.log(owners.sort(), owners);
//deep copy movements
console.log(movements);
console.log(movements.slice().sort()); // doesn't work b/c it sorts alphabetically

// if callback returns < 0: a, b (keeps order)
// if callback returns > 0: b, a (switches order)
// sort numerically (ascending order)
console.log(movements.slice().sort((a, b) => a - b));
// sort numerically (descending order)
console.log(movements.slice().sort((a, b) => b - a));
console.log(movements);

// SECTION: More ways of creating and filling arrays
console.log('\n MORE WAYS TO CREATE AND FILL AWAYS');
console.log([1, 2, 3, 4, 5], new Array(1, 2, 3, 4, 5));
// empty arrays + fill method
const x = new Array(7);
x.fill(1, 3);
x.fill(2, 0, 2);
x.fill(3, 2, 3);
console.log(x);
// Array.from
console.log(Array.from('foo'));
console.log(Array.from({ length: 7 }, () => 1));
console.log(Array.from({ length: 7 }, (curr, i) => i + 1));

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
});
