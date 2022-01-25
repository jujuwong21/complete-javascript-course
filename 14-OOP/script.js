'use strict';

// SECTION: Constructor Functions and the New Operator
console.log('CONSTRUCTOR FUNCTIONS AND THE NEW OPERATOR');

const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this for methods (see prototypes lecture)
  // this.calcAge  = function(){
  //    console.log(2037 - this.birthYear);
  //}
};

const sarah = new Person('Sarah', 2000);
console.log(sarah);
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

const jay = 'Jay';

console.log(matilda instanceof Person, jay instanceof Person);

// SECTION: Prototypes
console.log('\n PROTOTYPES');
console.log(Person.prototype);
// Adding a method to prototype property
Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};
matilda.calcAge();
jack.calcAge();

console.log(sarah.__proto__); // prototype of sarah
console.log(sarah.__proto__ === Person.prototype);
// test if a prototype is a prototype of another object
console.log(
  Person.prototype.isPrototypeOf(sarah),
  Person.prototype.isPrototypeOf(Person)
);
Person.prototype.species = 'Homo Sapiens';
console.log(sarah.__proto__.species, sarah.species); // inherited from prototype
console.log(jack.firstName, jack.hasOwnProperty('firstName'));
console.log(jack.species, jack.hasOwnProperty('species'));

// SECTION: Prototypal Inheritance and the Prototype Chain
console.log('\n PROTOTYPAL INHERITANCCE AND THE PROTOTYPE CHAIN');
console.log('One level up: ', sarah.__proto__);
console.log('Two levels up: ', sarah.__proto__.__proto__);
console.log('Three levels up: ', sarah.__proto__.__proto__.__proto__);

console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor); // inspect function

// SECTION: Prototypal Inheritancce on Built-in Objects
console.log('\n PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS');
const arr = [1, 2, 3, 4, 5, 1, 2, 3]; // same as new Array
console.log(arr.__proto__ === Array.prototype, arr.__proto__);
console.log(arr.__proto__.__proto__);
console.log(arr.__proto__.__proto__.__proto__);

// Add a method to all arrays
// gets all unique elements of an array
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.log(
  h1.__proto__, // HTML Heading element
  h1.__proto__.__proto__, // HTML element
  h1.__proto__.__proto__.__proto__, // Element
  h1.__proto__.__proto__.__proto__.__proto__, // Node
  h1.__proto__.__proto__.__proto__.__proto__.__proto__, // Event target
  h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__ // Object.prototype
);
console.dir(x => x + 1);

// SECTION: ES6 CLASSES
console.log('\n ES6 CLASSES');

// Class expression
const PersonExpression = class {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  // Static method lecture
  static hey() {
    console.log('Hey there! 👋');
  }
};
const jennifer = new PersonExpression('Jennifer', 2001);
console.log(jennifer);
jennifer.calcAge();
PersonExpression.hey(); // static method lecture

// Class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // All methods we write in class will be in prototype of object
  calcAge() {
    console.log(2022 - this.birthYear);
  }
}
// can still manually add methods like before
PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}!`);
};

const jessica = new PersonCl('Jessica', 1986);
console.log(jessica);
jessica.calcAge();
jessica.greet();
console.log(jessica.age);

// SECTION: Setters and Getters
console.log('\n SETTERS AND GETTERS');
const account = {
  owner: 'jonas',
  movements: [1200, -200, 100, -300],

  // getter
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // setter: needs one parameter
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);
account.latest = 50;
console.log(account.movements);

const PersonSetterGetter = class {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2022 - this.birthYear);
  }
  get age() {
    return 2022 - this.birthYear;
  }
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  // need getter b/c now fullName is undefined
  get fullName() {
    return this._fullName;
  }
};
const jessicaDavis = new PersonSetterGetter('Jessica Davis', 1996);
console.log(jessicaDavis, jessicaDavis.fullName);

// SECTION: Static Methods
console.log('\n STATIC METHODS');
// from method is attached to array constructor (not prototype)
// aka is in array namespace -- static method
Array.from(document.querySelectorAll('h1'));
// [1, 2, 3].from(...) // won't work

Person.hey = function () {
  console.log('Hey there! 👋');
  //console.log(this); // this keyword is entire constructor function
};
Person.hey();
// jessica.hey(); NOT inhereited b/c not in prototype

// SECTION: Object.create
console.log('\n OBJECT.CREATE');

const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // empty object, linked to PersonProto which will be its prototype
console.log('Before adding properties: ', steven);
steven.name = 'Steven';
steven.birthYear = 1970;
console.log('After adding properties: ', steven);
steven.calcAge();
console.log(steven.__proto__); // PersonProto

const jason = Object.create(PersonProto);
// better way to set properties
jason.init('Jason', 1979);
console.log(jason);
jason.calcAge();

// SECTION: Inheritance between "classes": Constructor functions
console.log('\n INHERITANCE BETWEEN CLASSES: CONSTRUCTOR FUNCTIONS');

// use Person class
const Student = function (firstName, birthYear, course) {
  // link methods
  Person.call(this, firstName, birthYear);
  this.course = course;
};
// linking prototype
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student; // b/c of Object.create(), this would be Person so change it back

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const mike = new Student('Mike', 2000, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike instanceof Student, mike instanceof Person); // both true b/c we linked prototypes

// SECTION: Inheritance between "classes": ES6 Classes
console.log('\n INHERITANCE BETWEEN CLASSES: ES6 CLASSES');

// based off PersonCl
console.log(PersonCl);

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); //basically constructor function of parent class, needs to happen first
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.firstName} and I study ${this.course}.`);
  }

  // override method in ParentCl
  calcAge() {
    console.log(
      `I'm ${
        2022 - this.birthYear
      } years old, but as a student I feel more like ${
        2022 - this.birthYear + 10
      } `
    );
  }
}
console.log(StudentCl);
const martha = new StudentCl('Martha', 2002, 'Math');
console.log(martha);
martha.introduce();
martha.calcAge();

// SECTION: Inheritance between "Classes": Object.create
console.log('\n INHERITANCE BETWEEN CLASSES: OBJECT.CREATE');
console.log(PersonProto); // prototype of all Person (parent) objects

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const james = Object.create(StudentProto);
james.init('James', 2010, 'Computer Science');
console.log(james);
james.introduce();
james.calcAge();

// SECTION: Another Class Example + Encapsulatiion
console.log('\n ANOTHER CLASS EXAMPLE + ENCAPSULATION (multiple sections)');

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin; // protected
    this._movements = []; // protected
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}!`);
  }

  // Public interface to objects
  deposit(val) {
    this._movements.push(val);
    return this; // to chain methods
  }
  withdrawal(val) {
    this.deposit(-val); // abstracts that this is a negative movement
    return this;
  }
  _approveLoan(val) {
    // protected, internal by bank
    return true;
  }
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }
  getMovements() {
    return this._movements;
  }
}
const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

acc1.deposit(250); // deposit
acc1.withdrawal(100); // withdrawal
acc1.requestLoan(100);
console.log(acc1.getMovements()); // correct way to get movements but still protected property

// SECTION: Encapsulation: Private Class Fields & Methods
// Private fields
// Public methods
// Private methods

class AccountFields {
  // Public fields: on all instance
  locale = navigator.language;

  // Private fields
  #movements = [];
  #pin; // just like an empty variable, then redefine in constuctor

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin; // protected

    console.log(`Thanks for opening an account, ${owner}!`);
  }

  // Public Methods
  deposit(val) {
    this.#movements.push(val);
  }
  withdrawal(val) {
    this.deposit(-val); // abstracts that this is a negative movement
  }
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
    }
  }
  getMovements() {
    // public, goal is to see private field
    return this.#movements;
  }

  // Private methods - should start w/ # but not supported yet
  _approveLoan(val) {
    // protected, internal by bank
    return true;
  }
}
const acc2 = new AccountFields();
console.log(acc2);

// SECTION: Chaining Methods
console.log('\n CHAINING METHODS');
acc1
  .deposit(300)
  .deposit(500)
  .withdrawal(35)
  .requestLoan(250000)
  .withdrawal(1000);
acc1.getMovements();
