'use strict';

// SECTION: Scoping in Practice
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  let output = `${firstName}, you are ${age}, born in ${birthYear}.`;

  function printAge() {
    // age in calcAge parent scope, birthYear in calcAge parameter

    console.log(output);
    if (birthYear >= 1996 && birthYear <= 2012) {
      var str = `Oh, and you're a Gen Z, ${firstName}.`;
    }
    console.log(str); // since we used var, this works

    output = 'new output'; // update output var in parent scope
    function add(a, b) {
      return a + b;
    }
    console.log(output); // "new output" b/c changed var in child
  }

  printAge();
  // add(2, 3) would lead to error b/c functions are block-scoped
  return age;
}
const firstName = 'Juliette';
calcAge(1998);

// SECTION: Hoisting and the TDZ in Practice

//  Hoisting with Variables
console.log(me);
//console.log(job); // Uncaught reference error
//console.log(year); // Uncaught reference error
var me = 'Juliette';
let job = 'Software Quality Engineer';
const year = 2021;

// Hoisting with Functions
console.log(addDeclaration(2, 3));
//console.log(addExpression(2, 3)); // Uncaught type error
//console.log(addArrow(2, 3)); // Uncaught reference error
function addDeclaration(a, b) {
  return a + b;
}
var addExpression = function (a, b) {
  return a + b;
};
const addArrow = (a, b) => a + b;

// Example
// intended: if numProducts is 0, delete shopping cart
// since numProducts is called before declared, it is undefined (basically 0)
if (!numProducts) deleteShoppingCart();
var numProducts = 4;
function deleteShoppingCart() {
  console.log('all products deleted!');
}

// SECTION: The this keyword in Practice
console.log(this);
const calcAge2 = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAge2(2000);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAgeArrow(1900);

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },

  greet: () => console.log(`Hey ${this.firstName}`),
};
jonas.calcAge();
jonas.greet(); // hey undefined, b/c parent of greet method is global scope

const matilda = {
  year: 2017,
};
// copy calcAge method from jonas object to matilda
matilda.calcAge = jonas.calcAge;
matilda.calcAge();

const f = jonas.calcAge;
console.log(f);
// regular function call, not attached to any object, will lead to error
// f();

const addExpression2 = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpression2(2, 3, 5, 7, 8);

// SECTION: Primitives vs. Objects in Practice
// Primitive types
let age = 21;
let oldAge = age;
age = 22;
console.log(age, oldAge); // age = 22, oldAge = 21

// Reference types
const myself = {
  name: 'Juliette',
  age: 30,
};
const friend = myself;
friend.age = 27;
console.log(friend.age, myself.age); // both are 27!

// Copying Objects
const juliette = {
  firstName: 'Juliette',
  lastName: 'Wong',
  age: 22,
  family: ['S', 'I', 'K'],
};
const julietteCopied = Object.assign({}, juliette);
julietteCopied.lastName = 'WONG';
julietteCopied.family.push('Ari');
console.log('Before copy: ', juliette);
console.log('After copy: ', julietteCopied);
