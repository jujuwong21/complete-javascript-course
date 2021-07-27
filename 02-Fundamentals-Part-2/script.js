"use strict";

// SECTION: Functions
console.log("FUNCTIONS");
function logger() {
  console.log("hi");
}
logger();

function fruitProcessor(apples, oranges) {
  const juice = `You just created juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}
const juiceResult = fruitProcessor(2, 3);
console.log(juiceResult);
console.log(fruitProcessor(4, 7));

// SECTION: Function Declarations vs. Expressions
// Declaration
function calcAge1(birthYear) {
  return 2021 - birthYear;
}
const age1 = calcAge1(2000);
// Expression
const calcAge2 = function (birthYear) {
  return 2021 - birthYear;
};
const age2 = calcAge2(2000);
console.log(age1, age2);

// SECTION: Arrow Functions
const calcAge3 = (birthYear) => 2021 - birthYear;
console.log(calcAge3(1991));

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2021 - birthYear;
  const retirement = 65 - age;
  if (retirement > 0) {
    return `${firstName} can retire in ${retirement} years.`;
  } else {
    return `${firstName} can already retire!`;
  }
};
console.log(yearsUntilRetirement(1998, "Juliette"));
console.log(yearsUntilRetirement(1950, "Sarah"));

// SECTION: Functions Calling Other Functions
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor2(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `You just created juice with ${apples} apples (${applePieces} pieces) and ${oranges} oranges (${orangePieces} pieces).`;
  return juice;
}
console.log(fruitProcessor2(2, 3));

// SECTION: Introduction to Arrays
console.log("ARRAYS");
const friends = ["Michael", "Steven", "Peter", "Sam", "David"];
console.log(friends, friends.length);
console.log(friends[1]); // Steven
friends[2] = "Jay";
console.log(friends);
const gradYears = new Array(2017, 2021);
console.log(gradYears, gradYears.length);
console.log(gradYears[gradYears.length - 1]); // 2021
const julietteArray = ["Juliette", "Wong", 2021 - 1998, gradYears];
console.log(julietteArray);

const yearsUntilRetirement2 = (birthYear) => {
  const age = 2021 - birthYear;
  const retirement = 65 - age;
  if (retirement > 0) {
    return retirement;
  } else {
    return -1;
  }
};
const birthYears = ["1960", "1973", "1979", "1982", "1999", "2012"];
const yearsTilRetire = [
  yearsUntilRetirement2(birthYears[0]),
  yearsUntilRetirement2(birthYears[1]),
  yearsUntilRetirement2(birthYears[2]),
  yearsUntilRetirement2(birthYears[3]),
  yearsUntilRetirement2(birthYears[4]),
  yearsUntilRetirement2(birthYears[5]),
];
console.log(birthYears, yearsTilRetire);

// SECTION: Basic Array Operations
console.log(friends);
friends.push("Daniel");
const newLength = friends.unshift("John");
console.log(friends, newLength);

const popped = friends.pop(); // removes Daniel
friends.shift(); // removes John
console.log(popped, friends);

console.log(friends.indexOf("Sam"), friends.indexOf("Sarah"));
console.log(friends.includes("Sam"), friends.includes("Sarah"));

// SECTION: Introduction to Objects
console.log("OBJECTS");
const julietteObj = {
  firstName: "Juliette",
  lastName: "Wong",
  birthYear: 1998,
  job: "Student",
  friends: ["Scottt", "Lava", "Ricky", "Rhiane"],
  hasDriversLicense: true,
};
console.log(julietteObj);

// SECTION: Dot vs. Bracket Notation
console.log(
  julietteObj.lastName,
  julietteObj["lastName"],
  julietteObj["last" + "Name"]
);
const interestedIn = prompt(
  "Type firstName, lastName, birthYear, job, or friends"
);
if (julietteObj[interestedIn]) {
  console.log(interestedIn, julietteObj[interestedIn]);
} else {
  console.log(`${interestedIn} is not a property of the object`);
}

julietteObj.location = "United States";
julietteObj["instagram"] = "@jubugggg";
console.log(julietteObj);

console.log(
  `${julietteObj.firstName} has ${julietteObj.friends.length} friends, and her best friend is ${julietteObj.friends[0]}`
);

// SECTION: Object Methods
julietteObj.calcAge = function (birthYear) {
  return 2021 - birthYear;
};
console.log("Dot method", julietteObj.calcAge(julietteObj.birthYear));
console.log("Bracket method", julietteObj["calcAge"](julietteObj["birthYear"]));
delete julietteObj.calcAge;
julietteObj.calcAge = function () {
  // this keyword method
  return 2021 - this.birthYear;
};
console.log("With this keyword:", julietteObj.calcAge());
delete julietteObj.calcAge;
julietteObj.calcAge = function () {
  // create a new property (age)
  this.age = 2021 - this.birthYear;
  return this.age;
};
console.log(julietteObj.calcAge());
console.log("With new property: ", julietteObj.age);
// Challenge: "Jonas is a 46-year old teacher, and he has (a/no) driver's license"
julietteObj.getSummary = function () {
  return `${this.firstName} is a ${this.calcAge()}-year old ${
    this.job
  }, and she has ${this.hasDriversLicense ? "a" : "no"} driver's license`;
};
console.log(julietteObj.getSummary());

// SECTION: Iteration: The For Loop
console.log("LOOPS");
for (let rep = 1; rep <= 5; rep++) {
  console.log(`Lifting weights repetition ${rep}`);
}

// SECTION: Looping Arrays, Breaking and Continuing
const types = [];
for (let i = 0; i < julietteArray.length; i++) {
  console.log(julietteArray[i], typeof julietteArray[i]);
  types.push(typeof julietteArray[i]); // can also do typeof[i]
}
console.log(types);
// See line 78 (similar thing, but now with loops)
const yearsTilRetireLoop = [];
for (let i = 0; i < birthYears.length; i++) {
  yearsTilRetireLoop.push(yearsUntilRetirement2(birthYears[i]));
}
// yearsTilRetire is the one without using loops
console.log(yearsTilRetire, yearsTilRetireLoop);
console.log("Continue (only odd numbers)");
for (let rep = 1; rep <= 10; rep++) {
  if (rep % 2 === 0) continue;
  console.log(`Lifting weights repetition ${rep}`);
}
console.log("Break after 6");
for (let rep = 1; rep <= 10; rep++) {
  if (rep === 7) break;
  console.log(`Lifting weights repetition ${rep}`);
}

// SECTION: Looping Backwards and Loops in Loops
for (let rep = 5; rep > 0; rep--) {
  console.log(`Number reps remaining: ${rep}`);
}
for (let i = julietteArray.length - 1; i >= 0; i--) {
  console.log("");
}
// 15 reps (5 for each of 3 exercises)
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 5; j++) {
    console.log(`Exercise ${i}, Rep ${j}`);
  }
}

// SECTION: The While Loop
let rep = 1;
while (rep <= 10) {
  console.log(`Lifting weights, rep = ${rep}`);
  rep++;
}
let dice = Math.trunc(Math.random() * 6) + 1;
while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log(`You finally rolled a ${dice}!`);
}
