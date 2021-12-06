'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-11-28T23:36:17.929Z',
    '2021-11-30T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const formatMovementDate = function (date, locale) {
  const daysPassed = Math.round(
    Math.abs(new Date() - date) / (1000 * 60 * 60 * 24)
  );
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  //const day = `${date.getDate()}`.padStart(2, '0');
  //const month = `${date.getMonth() + 1}`.padStart(2, '0');
  //const year = date.getFullYear();
  return new Intl.DateTimeFormat(locale).format(date);
};

//const daysPassed = (date1, date2) =>
// Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const formatNumbersCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const movementDate = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(
      movementDate,
      acc.locale,
      acc.currency
    );
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatNumbersCurrency(
          mov,
          acc.locale,
          acc.currency
        )}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${formatNumbersCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatNumbersCurrency(
    incomes,
    acc.locale,
    acc.currency
  )}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatNumbersCurrency(
    out,
    acc.locale,
    acc.currency
  )}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatNumbersCurrency(
    interest,
    acc.locale,
    acc.currency
  )}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    // in each call, print the remaining time to UI
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    labelTimer.textContent = `${min}:${sec}`;
    // when time is 0, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // decrease time
    time--;
  };
  // set time to 5 min
  let time = 5 * 60;
  // call timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount;
let timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    const now = new Date();
    // display format: day/month/year
    //const currentYear = now.getFullYear();
    //const currentMonth = `${now.getMonth() + 1}`.padStart(2, '0');
    //const currentDay = `${now.getDate()}`.padStart(2, '0');
    //const currentHour = `${now.getHours()}`.padStart(2, '0');
    //const currentMin = `${now.getMinutes()}`.padStart(2, '0');
    //labelDate.textContent = `${currentDay}/${currentMonth}/${currentYear}, ${currentHour}:${currentMin}`;

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // reset time
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// SECTION: Converting and checking numbers
console.log('CONVERTING AND CHECKING NUMBERS');
console.log(23 === 23.0);
console.log('0.1 + 0.2 = ', 0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
console.log(Number('23'), +'23'); // both convert
// Parsing
console.log(Number.parseInt('30px'), Number.parseInt('1001px', 2));
console.log(Number.parseFloat('2.5rem'), Number.parseInt('2.5rem'));
// isNaN, isFinite
console.log(Number.isNaN(20), Number.isNaN('20'));
console.log(Number.isNaN(+'20X'), Number.isNaN(23 / 0));
console.log(Number.isFinite(20), Number.isFinite('20'));
console.log(Number.isFinite(+'20X'), Number.isFinite(23 / 0));
// isInteger
console.log(
  Number.isInteger(23),
  Number.isInteger(23.0),
  Number.isInteger(23.5)
);

// SECTION: Math and Rounding
console.log('\n MATH AND ROUNDING');
console.log(Math.sqrt(25), 25 ** (1 / 2), Math.sqrt(-4));
console.log(Math.max(1, '3', 2), Math.max(1, 'a', 2));
console.log(
  'Area of circle with radius 10px',
  Math.PI * Number.parseFloat('10px') ** 2
);
console.log(Math.trunc(Math.random() * 6) + 1);

// finds random integer between min and max value
const randomInt = (min, max) =>
  Math.trunc(Math.round() * (max - min) + 1) + min;
console.log(randomInt(1, 4), randomInt(5, 10));

// Rounding integers
console.log(Math.round(23.3), Math.round(23.5), Math.round(23.7));
console.log(Math.ceil(23.3), Math.ceil(23.9));
console.log(Math.floor(23.3), Math.floor(23.9));
console.log(Math.trunc(-0.123), Math.floor(-0.123));

// Rounding decimals
console.log((2.7).toFixed(0), (2.7).toFixed(3));
console.log(+(2.345).toFixed(2), +(2.344).toFixed(2));

// SECTION: The remainder operator
console.log('\n THE REMAINDER OPERATOR');
console.log('5 % 2: ', 5 % 2); // 5 = 2*2 + 1
console.log('8 % 3: ', 8 % 3); // 8 = 2*3 + 2
console.log(-13 % 5, 13 % -5); // takes sign of dividend

const isEven = n => n % 2 === 0;
console.log(isEven(-8), isEven(23));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'gray';
    //if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

// SECTION: Numeric Separators
console.log('\n NUMERIC SEPARATORS');
// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);
const priceEx = 345_99;
console.log(priceEx);
console.log(Number('230_000'), parseInt('230_000'));

// SECTION: Working with BigInt
console.log('\n WORKING WITH BIGINT');
console.log(
  'largest number JS can work with: 2^53 - 1',
  Number.MAX_SAFE_INTEGER
);
console.log(2 ** 53 + 1); // only adds 1 when it should add 2
// BigInt
console.log(123456789123456789n, BigInt(123456789123456789));
// Operations
console.log(10000n + 10000n, 123123910273n * 17301478264n);
console.log(874689217641230n * BigInt(3));
console.log(20n > 15, 20n === 20, 20n == 20);
console.log(1239824861490294n + ' is REALLY big!');

console.log(10n / 3n, 11n / 3n, 99n / 10n);

// SECTION: Creating Dates
console.log('\n CREATING DATES');
console.log(new Date());
console.log(new Date('December 24, 2015'));
console.log(new Date('2020/01/20'));
console.log(new Date(2019, 0)); // Jan 1st, 2019
console.log(new Date(2019, 10, 31, 0, 5, 2)); // Autocorrects to next day, Dec 1st
console.log(new Date(100)); // 100 ms after Wed Dec 31 1969 19:00:00
console.log(new Date(0)); // Wed Dec 31 1969 19:00:00
console.log(3 * 24 * 60 * 60 * 1000, new Date(3 * 24 * 60 * 60 * 1000)); // 3 days after Wed Dec 31 1969 19:00:00, value is timestamp of day 3

console.log(new Date(account1.movementsDates[0]));

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(
  future.getFullYear(),
  future.getMonth(),
  future.getDate(),
  future.getDay(),
  future.getHours(), // can also do Minutes and seconds
  future.toISOString(),
  future.getTime()
);
future.setFullYear(2040); // s
console.log(future);

// SECTION: Adding Dates to Bankist App
// see above part related to Bankist app
// we have the current date and the dates for the movements

// SECTION: Operations with Dates
console.log('\n OPERATIONS WITH DATES');
console.log(Number(future), future.getTime(), future.getTime());
const now = new Date();
console.log(future, now);
console.log(future - now);

const daysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
console.log(
  daysPassed(now, future),
  daysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24)),
  daysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4))
);

// SECTION: Internationalizing Dates (Intl)
console.log('\n INTERNATIONALIZING DATES (Intl)');
const locale = navigator.language;
console.log(locale);
const Dateoptions = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};
console.log(new Intl.DateTimeFormat(locale, Dateoptions).format(future));

// SECTION: Internationalizing Numbers (Intl)
console.log('\n INTERNATIONALIZING NUMBERS (Intl)');
const num = 1872361246.123;
const options = {
  style: 'currency', // unit percent, currency
  unit: 'celsius', // miles-per-hour, is ignored if not unit style
  currency: 'EUR', // currency ignored if not currency style
  //useGrouping: 'false',
};
console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  'Browser:  ',
  new Intl.NumberFormat(navigator.language, options).format(num)
);

// SECTION: Timers - setTimeout and setInterval
console.log('\n TIMERS: SETTIMER + SETINTERVAL');
setTimeout(() => {
  console.log('this is the first message');
}, 5000);

setTimeout(() => {
  console.log('this is the second message');
}, 3000);

setTimeout(() => {
  console.log('this is the third message');
}, 1000);

console.log('this is the fourth message');

const ingredients = ['olives', 'pepperoni'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  7000,
  ...ingredients
);
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
// print time every min
setInterval(function () {
  const now = new Date();
  const hours = `${now.getHours()}`.padStart(2, '0');
  const minutes = `${now.getMinutes()}`.padStart(2, '0');
  console.log(`${now.getMonth()}/${now.getDate()} ${hours}:${minutes}`);
}, 60000);
