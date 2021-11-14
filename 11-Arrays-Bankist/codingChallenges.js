// SECTION: Coding Challenge #1
console.log('Coding Challenge #1');
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const julia1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];
const julia2 = [9, 16, 6, 8, 3];
const kate2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaReal = dogsJulia.slice(1, -2);
  const dogs = dogsJuliaReal.concat(dogsKate);
  dogs.forEach(function (dog, i) {
    // could have done an if-statement for easy readability
    console.log(
      `Dog number ${i + 1} ${
        dog >= 3 ? `an adult, and is ${dog} years old` : 'still a puppy 🐶'
      }`
    );
  });
};
checkDogs(julia1, kate1);
checkDogs(julia2, kate2);

// Coding Challenge #2
console.log('\n Coding Challenge #2');
/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const test1 = [5, 2, 4, 1, 15, 8, 3];
const test2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (dogs) {
  const dogInHumanYears = dogs.map(function (dogAge) {
    if (dogAge <= 2) {
      return dogAge * 2;
    } else {
      return 16 + 4 * dogAge;
    }
  });
  const adultDogs = dogInHumanYears.filter(dog => dog >= 18);
  const ageAverage =
    adultDogs.reduce((accumulator, current) => accumulator + current, 0) /
    adultDogs.length;
  return ageAverage;
};
console.log(calcAverageHumanAge(test1));
console.log(calcAverageHumanAge(test2));

/* another way to calculate average
const ageAverage = adultDogs.reduce(
  (accumulator, current, i, array) => accumulator + current / array.length,
  0
);
*/

// SECTION: Coding Challenge # 3
console.log('\n Coding Challenge #3');
// rewrite what was in coding challenge # 2 with chaining and arrow functions
const calcAverageHumanAgeChain = dogs =>
  dogs
    .map(dogAge => (dogAge <= 2 ? dogAge * 2 : 16 + 4 * dogAge))
    .filter(dog => dog >= 18)
    .reduce(
      (accumulator, current, i, array) => accumulator + current / array.length,
      0
    );
console.log(calcAverageHumanAgeChain(test1));
console.log(calcAverageHumanAgeChain(test2));

// SECTION: Coding Challenge #4
console.log('\n Coding Challenge #4');

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
//Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
//Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

//1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
console.log(dogs);

//2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
const SarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(SarahDog);

const howDoesDogEat = function (dog) {
  if (dog.curFood >= dog.recommendedFood * 1.1) {
    return 1;
  } else if (dog.curFood <= dog.recommendedFood * 0.9) {
    return -1;
  } else return 0;
};
console.log(
  `Sarah's dog is eating too ${
    howDoesDogEat(SarahDog) == 1 ? 'much!' : 'little!'
  }`
);

//3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
const createOwnersArray = function (n) {
  return dogs
    .filter(dog => howDoesDogEat(dog) === n)
    .flatMap(dog => dog.owners);
};

const ownersEatTooMuch = createOwnersArray(1);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = createOwnersArray(-1);
console.log(ownersEatTooLittle);

const ownersEatEnough = createOwnersArray(0);
console.log(ownersEatEnough);

//4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersEatTooMuch.flat().join(' and ')}'s dogs eat too much!`);
console.log(
  `${ownersEatTooLittle.flat().join(' and ')}'s dogs eat too little!`
);

//5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// any -> use sum method
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

//6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
console.log(dogs.some(dog => howDoesDogEat(dog) === 0));

//7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const okAmount = dogs.filter(dog => howDoesDogEat(dog) === 0);
console.log(okAmount);

//8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
console.log(dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood));

// SECTION: Array Methods Practice
console.log('\n Array Methods Practice');
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
// calculate how much has been deposited (positive values) in total in the bank
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(move => move > 0)
  .reduce((accumulator, deposit) => accumulator + deposit, 0);
console.log(bankDepositSum);

// count how many deposits were in the bank with values > 1000
const numDepositsAtLeast1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(move => move >= 1000).length;
console.log(numDepositsAtLeast1000);

// plus plus operator
let a = 10;
console.log(a++, a, ++a);

// Create an object that contains the sum of the deposits and the withdrawals
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// convert any string to a title case (all words in sentence are capitalized)
// example: this is a nice title => This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  // decided ahead of time, first letter should be capitalized
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

// return 100 randomly generated dice rolls
const getRandomDiceRolls = function (n) {
  let rolls = [];
  for (let i = 0; i <= n; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  return rolls;
};
console.log(getRandomDiceRolls(100));
