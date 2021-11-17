'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // return multiple values from a function
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // Destructuring Objects
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  // Spread Operator
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}!`
    );
  },

  // Rest Pattern and Parameters
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// SECTION: Destructuring Arrays
console.log('DESTRUCTURING ARRAYS');
const arr = [2, 3, 4];
const a = arr[0]; // to retrieve element w/o destructuring
const [x, y, z] = arr; // destructuring array
console.log(x, y, z, arr);

const [firstCat, secondCat] = restaurant.categories;
console.log(firstCat, secondCat); //Italian, Pizzeria
let [firstMain, , thirdMain] = restaurant.mainMenu;
console.log(firstMain, thirdMain); // Pizza, Risotto

// flip third main and first main using destructuring
[firstMain, thirdMain] = [thirdMain, firstMain];
console.log(firstMain, thirdMain);

// return multiple values from a function call
// can also assign these values to individual variables like above
console.log('Your Order: ', restaurant.order(2, 0));

// Destructuring a nested array
const nestedArray = [2, 4, [5, 6]];
const [i, j, [k, l]] = nestedArray;
console.log(i, j, k, l);

// Destructuring w/ default values
const [p, q, r = 1] = [8, 9];
console.log(p, q, r);

// SECTION: Destructuring Objects
console.log('DESTRUCTURING OBJECTS');
// name in object : new name
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let aVar = 111;
let bVar = 999;
const obj = { aVar: 23, bVar: 7, cVar: 14 };
({ aVar, bVar } = obj); // a = 23, b = 7
console.log(aVar, bVar);

// Destructuring Nested Objects
const {
  fri: { open, close },
} = hours;
console.log(open, close);

// Passing an object into a function
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 1,
});

restaurant.orderDelivery({
  address: '20 West Street',
  starterIndex: 0,
  mainIndex: 0,
});

// SECTION: The spread operator (...)
console.log('THE SPREAD OPERATOR (...)');
// Adding values to front of array
const array = [7, 8, 9];
const newArray = [1, 2, ...array];
console.log(newArray);
console.log(...newArray); // logs individual elements

const newMainMenu = [...restaurant.mainMenu, 'Gnocchi', 'Pesto Pasta']; // creates a new array, doesn't manipulate array in object
console.log(newMainMenu);

// Shallow copy of array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// Join 2 arrays (or more)
const allMenuItems = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(allMenuItems);

// Using spread operator on strings
const firstName = 'Juliette';
console.log(...firstName);
const lastName = 'Wong';
const lettersInName = [...firstName, ' ', ...lastName];
console.log(lettersInName);

// Using spread operator in a function

//const ingredients = [
//  prompt("Let's make pasta! Ingredient 1?"),
//  prompt('Ingredient 2?'),
//  prompt('Ingredient 3?'),
//];
const ingredients = ['pesto', 'chicken', 'spinach'];
restaurant.orderPasta(...ingredients);

// Using spread operator on objects
const newRestaurant = {
  foundedIn: 1998,
  ...restaurant,
  founder: 'Guiseppe',
};
console.log(newRestaurant);
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(
  'Old name: ',
  restaurant.name,
  ', ',
  'New name: ',
  restaurantCopy.name
);

// SECTION: Rest Pattern and Parameters
console.log('REST PATTERN AND PARAMETERS');

//Rest in arrays
const [, , ...others] = [1, 2, 3, 4, 5];
console.log(others); // 3, 4, 5

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Rest in objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// Using rest in functions
// want to add any arbitrary amount of arguments together
const add = function (...numbers) {
  // numbers is an array of inputs
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, -9, 1, 0, 9);
const arrAdd = [23, 7, 5];
add(...arrAdd); // use spread to convert to individual elements

restaurant.orderPizza('sausage', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

// SECTION: Short Circuiting (&& and ||)
console.log('SHORT CIRCUITING');

// OR Operator (||)
console.log(3 || 'Jonas'); // result is 3
console.log('' || 'Jonas'); // result is Jonas b/c empty string is false-y
console.log(undefined || null); // result is null
console.log(undefined || 0 || '' || 'Hello' || 23); // 23
//restaurant.numGuests = 23;
const guests1 = restaurant.numGuests || 10;
console.log(guests1);

// AND Operator (&&)
console.log(0 && 'Jonas'); // 0
console.log(3 && 'Jonas'); // Jonas
console.log('Hello' && 23 && null & 'Jonas'); // null
// Practical example
// checks if method exists, run only if it exists
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
// same thing with && operator
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// SECTION: The Nullish Coalescing Operator (??)
console.log('THE NULLISH COALESCING OPERATOR');
restaurant.numGuests = 0;
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

// SECTION: Logical Assignment Operators
console.log('LOGICAL ASSIGNMENT OPERATORS');

const rest1 = {
  name: 'Capri',
  numGuests: 20,
  numWorkers: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// set default value for number of guests
// or assignment operator
rest1.numGuests ||= 10;
rest2.numGuests ||= 10;
//rest1.numGuests = rest1.numGuests || 10;
//rest2.numGuests = rest2.numGuests || 10;

// logical nullish assignment operator
// or assignment operator + nullish coalescing operator
rest1.numWorkers ??= 10;
rest2.numWorkers ??= 10;

// and assignment operator
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';
//rest1.owner = rest1.owner && '<ANONYMOUS>'
//rest2.owner = rest2.owner && '<ANONYMOUS>'
console.log(rest1);
console.log(rest2);

// SECTION: Looping arrays: The for-of loop
console.log('THE FOR-OF LOOP');
// old way
/*
for (let i = 0; i < allMenuItems.length; i++) {
  console.log(allMenuItems[i]);
}
*/
// for-of loop
for (const item of allMenuItems) console.log(item);
// to get index too
for (const [index, value] of allMenuItems.entries()) {
  console.log(`Item ${index + 1}: ${value}`);
}

// SECTION: Enhanced Object Literals
console.log('ENHANCED OBJECT LITERALS');
// Compute property names
const dayOfWeek = ['mon', 'tues', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [dayOfWeek[3]]: {
    open: 12,
    close: 22,
  },
  [dayOfWeek[4]]: {
    open: 11,
    close: 23,
  },
  [dayOfWeek[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
const restaurant2 = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // Enhancement to add an object to an object
  openingHours,
  // Enhancement to write functions
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}!`
    );
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
console.log(restaurant2);

// SECTION: Optional Chaining (?.)
console.log('OPTIONAL CHAINING');
// issue: do not know if it is even open on monday (think getting data from web API)
// annoying, needs to check that each object name exists
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}
// with optional chaining
console.log(restaurant.openingHours?.mon?.open);
console.log(restaurant.openingHours?.fri?.open);

for (const day of dayOfWeek) {
  const open = restaurant.openingHours[day]?.open ?? 'N/A';
  console.log(`On ${day}, we open at ${open}`);
}

// Optional chaining with Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisottos?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
console.log(users[0]?.name ?? 'User array empty');
console.log(users[1]?.name ?? 'No 2nd user');

// SECTION: Looping Objects: Object Keys, Values, and Entities
console.log('LOOPING OVER OBJECTS');

// looping over keys (property names)
const days = Object.keys(openingHours);
let openStr = `We are open on ${days.length} days: `;
for (const day of days) {
  openStr += `${day}, `;
}
console.log(openStr);

// property values
const values = Object.values(openingHours);
console.log(values);

// entries
const entries = Object.entries(openingHours);
console.log(entries);
// Looping over entire entry
// [key, value], in this case the value is an object
for (const [key, { open, close }] of entries) {
  console.log(`On ${key}, we open at ${open} and close at ${close}`);
}

// SECTION: Sets
console.log('SETS');
console.log(new Set('Juliette'));
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
  'Pizza',
]);
console.log(ordersSet, ordersSet.size);
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
console.log(ordersSet, ordersSet.size);
ordersSet.delete('Risotto');
console.log(ordersSet, ordersSet.size);
// ordersSet.clear(); delete all values of set
for (const order of ordersSet) console.log(order);

// remove duplicate values in an array
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// want unique array of staff types
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(new Set(staff).size); // number of unique positions

// SECTION: Fundamentals of Maps
console.log('MAPS');
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugual');
// can chain
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open! :)')
  .set(false, 'We are closed :(');
console.log(rest);
console.log(rest.get('name'));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
console.log(rest.has('categories'));
rest.delete(2);
console.log(rest.size); // 7 items
// rest.clear()

// SECTION: Iterating over Maps
// convert object to maps
const hoursMap = new Map(Object.entries(openingHours));
// add multiple to map in beginning

const question = new Map([
  ['question', 'What are we coding in right now?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again'],
]);
console.log(question);

console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
const answer = Number(prompt('Your answer (1, 2, or 3)'));
console.log(question.get(answer === question.get('correct')));

// Convert map to array
console.log([...question.keys()]);

// SECTION: Working with Strings Part 1
console.log('STRINGS');
console.log('B737'[0], ', ', 'B737'.length); // strings are 0-indexed

const airline = 'TAP Air Portugal';
console.log(
  airline.indexOf('r'),
  airline.lastIndexOf('r'),
  airline.indexOf('Air')
);
console.log(airline.slice(4), ', ', airline.slice(4, 7));
//extract first word
console.log(airline.slice(0, airline.indexOf(' ')));
// extract last word
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
console.log(airline.slice(-1), airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // middle seat is B or E (last character)
  const s = seat.slice(-1);
  return s === 'B' || s == 'E';
};
console.log(
  checkMiddleSeat('34B'),
  checkMiddleSeat('23C'),
  checkMiddleSeat('3E')
);

// SECTION: Working with Strings Part 2
console.log('AppLeS'.toLowerCase(), 'AppLeS'.toUpperCase());

const makeCamelCase = function (string) {
  const lowercase = string.toLowerCase();
  const firstLetter = lowercase[0].toUpperCase();
  return firstLetter + lowercase.slice(1);
};
console.log(makeCamelCase('AppLes'), makeCamelCase('aPPlEs'));

// Comparing emails
const checkEmail = function (correct, attempted) {
  const cleaned = attempted.toLowerCase().trim();
  return cleaned === correct;
};
console.log(checkEmail('hello@jonas.io', '  Hello@Jonas.Io \n'));

const priceGB = '288,97£';
const priceUS = priceGB.replace(',', '.').replace('£', '$');
console.log(priceGB, priceUS);

const announcement =
  'All passengers come to boarding door 23, boarding door 23';
console.log(announcement.replaceAll('boarding door', 'gate'));
// or use regex (//, g stands for global)
console.log(announcement.replace(/boarding door/g, 'gate'));

const planeRide = 'Airbus A320neo';
console.log(
  planeRide.includes('A320') &&
    planeRide.startsWith('Air') &&
    planeRide.endsWith('neo')
);

// SECTION: Working with Strings Part 3
console.log('a+very+nice+string'.split('+'));
console.log(['Ms.', 'Juliette', 'Wong'].join(' '));

const capitalizeWords = function (name) {
  const nameArray = name.split(' ');
  const namesTransformed = [];
  for (const n of nameArray) {
    namesTransformed.push(n[0].toUpperCase() + n.slice(1).toLowerCase());
    // other option
    //namesTransformed.push(n.replace(n[0], n[0].toUpperCase()))
  }
  return namesTransformed.join(' ');
};
console.log(capitalizeWords('jessica ann smith davis'));

const message = 'Go to gate 23!';
console.log(message.padStart(20, ' ').padEnd(25, '+'));
console.log('apple'.padEnd(20, '+'));

// masks credit card so you only see last four digits
// most credit cards have 16, amex only has 15
const maskCreditCard = function (number) {
  const str = String(number); // number + '' also works
  const last4 = str.slice(-4);
  return last4.padStart(str.length, '*');
};
console.log(maskCreditCard(12345678901234));
console.log(maskCreditCard(19237278465928347));
console.log(maskCreditCard('1023389457930'));

const weatherMessage = 'Bad weather...All departures delayed...';
console.log(weatherMessage.repeat(5));
