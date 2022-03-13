'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);
console.log('Original budget', budget);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 100; gets error

// same as spendingLimits[user] ? spendingLimits[user] : 0
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function!
// Adds expenses if it is below the spending limit of user
// if user has no spending limit specified, does not add
const addExpense = function (state, limit, value, description, user = 'jonas') {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limit, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

// b/c doesn't mutate original budget, need to save as variable
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log('Budget after addExpenses', newBudget3);

// checks all expenses, adds flag if a purchase is above limit
const checkExpenses = function (state, spendingLimits) {
  return state.map(entry =>
    entry.value < -getLimit(spendingLimits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );
};

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log('Budget after expense check', finalBudget);

// Logs expenses (by emoji) that are bigger than bigLimit
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');

  /* another way (not perfect):
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .reduce((str, cur) => `${str} /  ${cur.description.slice(-2)}`, '');
  */
  console.log('Big expenses: ', bigExpenses);
};

logBigExpenses(finalBudget, 500);
