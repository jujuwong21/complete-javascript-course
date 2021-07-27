"use strict";

let js = "hi";
console.log(40 + 8 + 23 - 10);

// SECTION: Values and Variables
console.log("VALUES AND VARIABLES");
console.log(js);
js = "bye";
console.log(js);

// SECTION: Data Types
console.log("DATA TYPES");
let jsIsFun = true;
console.log(jsIsFun);
console.log(typeof jsIsFun);
console.log(typeof "23");

jsIsFun = "yes";
console.log(jsIsFun);

let undefinedVal;
console.log(undefinedVal);
console.log(typeof undefinedVal);
undefinedVal = 2;
console.log(undefinedVal);

// SECTION: let, const, and var
const birthYear = 1998;
// birthYear = 1999; // get TypeError if we try to reassign
var occupation = "student";
occupation = "engineer";

// SECTION: Basic Operators
console.log("BASIC OPERATORS");
console.log(3 + 2, 3 - 2, 3 * 2, 3 / 2, 3 ** 2);
console.log("Juliette" + " " + "Wong");

let x = 10 + 5; // 15
x += 10; // 25
x++; // 26
console.log(x);
console.log(x >= 25);
console.log("My age is " + 22);

// SECTION: Operator Precedence
let y, z;
z = y = 25 - 10 - 5;
console.log(z, y);

// SECTION: String and Template Literals
console.log("STRING AND TEMPLATE LITERALS");
const firstName = "Juliette";
const job = "Associate Analyst";
// const birthYear = 1998;
const year = 2020;

const sentence =
  "I'm " + firstName + ", a " + (year - birthYear) + " year-old " + job + "!";
console.log(sentence);
const sentenceNew = `I'm ${firstName}, a ${year - birthYear} year-old ${job}!`;
console.log(sentenceNew);

console.log("line 1 \n\
line 2 \n\
line 3");
console.log(`line 1
line 2
line 3`);

// SECTION: if-else statements
console.log("IF-ELSE STATEMENTS");
const age = 18;
if (age >= 18) {
  console.log("if-statement works ⍤");
} else {
  const shortBy = 18 - age;
  console.log("else statement, short by " + shortBy);
}

// SECTION: Type Conversion and Coercion
console.log("TYPE CONVERSION AND COERCION");
const inputYear = "1991";
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

// SECTION: Truthy and Falsy values
console.log("TRUTHY AND FALSY VALUES");
console.log(
  Boolean(0),
  Boolean(undefined),
  Boolean(null),
  Boolean(""),
  Boolean(NaN)
);
console.log(Boolean("J"), Boolean({}), Boolean(123));
if (age - 18) {
  console.log("You aren't 18 years old, you are " + age);
} else {
  console.log("You are 18");
}

// SECTION: Equality Operators: == vs. ===
console.log("EQUALITY OPERATORS");
if (age === 18) console.log("You are a legal adult");
console.log(18 === "18", 18 == "18");
const favoriteNum = Number(prompt("Favorite number?"));
if (favoriteNum === 21) {
  console.log("21 is a good favorite number");
} else if (favoriteNum == 7) {
  console.log("7 is cool too");
} else {
  console.log("Number is not 21 or 7");
}

// SECTION: Logical Operators
console.log("LOGICAL OPERATORS");
const hasDriversLicense = true; // A
const hasGoodVision = true; // B
const isTired = false;
if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log("Able to drive!");
} else {
  console.log("Someone else should drive");
}

// SECTION: Switch statement
console.log("SWITCH STATEMENT");
const day = "tuesday";
switch (day) {
  case "monday":
  case "tuesday":
  case "wednesday":
  case "thursday":
    console.log("It's a weekday");
    console.log("Do work");
    break;
  case "saturday":
  case "sunday":
    console.log("Weekend!");
    console.log("hang out w/ friends");
    break;
  default:
    console.log("Friday!");
}

// SECTION: The conditional (Ternary) Operator
console.log("CONDITIONAL (TERNARY) STATEMENT");
age >= 18
  ? console.log("I am a legal adult")
  : console.log("Not yet legal in US");
const isLegal = age >= 18 ? "legal!" : "not legal :(";
console.log(isLegal);
console.log(`She is ${age >= 18 ? "legal" : "not legal"}`);
