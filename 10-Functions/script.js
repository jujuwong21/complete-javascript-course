'use strict';

// SECTION: Default Parameters
console.log('DEFAULT PARAMETERS');

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // Old way
  //numPassengers = numPassengers || 1;
  //price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 5);
createBooking('LH123', undefined, 400);

// SECTION: How passing arguments works: value vs. reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 242423498721984,
};

const checkIn = function (flightNum, passengerObj) {
  // assume flight, name gets changed
  flightNum = 'LH9999';
  passengerObj.name = 'Mr. ' + passengerObj.name;
  if (passengerObj.passport === 242423498721984) {
    //alert('Check in');
  } else {
    //alert('Wrong passport');
  }
};
checkIn(flight, jonas);
console.log(flight); // flight stays the same
console.log(jonas); // name is changed

// SECTION: Functions Accepting Callback Functions
console.log('\n FUNCTIONS ACCEPTING CALLBACK FUNCTIONS');

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function, fn is callback function
// transformer function is abstract, doesn't care how string is transformed -- abstracted away into other functions
// delegate string transformation to "lower level" callback functions
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`); // function property
};

transformer('Javascript is the best!', upperFirstWord);
console.log('\n');
transformer('Javascript is the best!', oneWord);

const high5 = function () {
  console.log('🙌🏻');
};
//document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

// SECTION: Functions returning functions
console.log('\n FUNCTIONS RETURNING FUNCTIONS');

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Juliette');
greeterHey('Steven');
greet('Hello')('Jonas');

// same thing but an arrow function
const greetArrow = greeting => personName =>
  console.log(`${greeting} ${personName}`);
greetArrow('Hey')('Julia');

// SECTION: The call & apply methods
console.log('\n THE CALL AND APPLY METHODS');
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book method (enhanced way to create method)
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name,
    });
  },
};
lufthansa.book(121, 'Jonas Schmedtmann');
lufthansa.book(635, 'Mike Smith');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // now just a regular function call, not a method

// book(23, 'Sarah Williams'); // does not work
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings.bookings);
book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa.bookings);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 583, 'Mary Cooper');
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss.bookings);

// SECTION: The Bind Method
console.log('\n THE BIND METHOD');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23); // sets flightNum = 23 for all future calls
bookEW23('Juliette Wong');

// With event listeners
lufthansa.planes = 300; // has 300 planes
lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
}; // add a new plane when you click on function
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 100));
// we don't care about this keyword, standard is to set it to null
const addNYCTax = addTax.bind(null, 0.08875);
console.log(addNYCTax(100));

// Same as before, but with callback functions
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addNYCTax2 = addTaxRate(0.08875);
console.log(addNYCTax2(100));

// SECTION: Immediately Invoked Function Expressions (IIFE)
console.log('\n IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE)');

(function () {
  console.log('This will never run again');
})();

(() => console.log('This will also never run again'))();
// another way to create a scope: block with let/const (not var)
{
  const isPrivate = 23;
}

// SECTION: Closures
console.log('\n CLOSURES');

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
// secureBooking is the "birthplace" of the booker function
const booker = secureBooking();
booker(); // 1
booker(); // 2 --> still has access passengerCount variable, even after secureBooking is called
booker(); // 3
console.dir(booker);

// SECTION: More Closure Examples

// EXAMPLE 1: functions that are reassigned
let f; // f is defined in global scope, but is assigned in the g function (closed over env of g function)
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2); // can access a variable b/c of closure
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};
g();
f(); // 23 * 2
h();
f(); // 777 * 2, b/c f is re-assigned by calling h
console.dir(f); // has value of b, no longer has value of a

// EXAMPLE 2: timer
// n = number of passengers, wait = waittime
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  // callback function inside setTimeout, executed independently from boardPassengers
  // has access to variables defined in boardPassengers function -- closure
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};
const perGroup = 10000; // prove closure has priority over scope chain
boardPassengers(180, 3);
