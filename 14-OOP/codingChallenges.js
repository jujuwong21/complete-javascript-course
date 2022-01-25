// SECTION: Coding Challenge #1
console.log('CODING CHALLENGE #1');

// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
const Car1 = new Car('BMW', 120);
console.log(Car1);
Car1.accelerate();
Car1.accelerate();
Car1.brake();

// DATA CAR 2: 'Mercedes' going at 95 km/h
const Car2 = new Car('Mercedes', 95);
console.log(Car2);
Car2.brake();

// SECTION: Coding Challenge #2
console.log('\n CODING CHALLENGE #2');

//1. Re-create challenge 1, but this time using an ES6 class;
class CarClass {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  // Instance methods
  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }
  brake() {
    this.speed -= 5;
    console.log(this.speed);
    return this;
  }

  //2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
  get speedUS() {
    return this.speed / 1.6;
  }
  // 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.
//DATA CAR 1: 'Ford' going at 120 km/h
const Ford = new CarClass('Ford', 120);
console.log(Ford);
console.log(Ford.speedUS);
Ford.speedUS = 100;
console.log(Ford);
Ford.speedUS = 50;
console.log(Ford);

// SECTION: Coding Challenge #3
console.log('\n CODING CHALLENGE #3');

// 1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype); // link to prototype
EV.prototype.constructor = EV;

// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

// DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%
const tesla = new EV('Tesla', 120, 23);
console.log(tesla);
tesla.chargeBattery(90);
console.log(tesla);
tesla.accelerate();
tesla.brake();
tesla.accelerate();
tesla.accelerate();

// SECTION: Coding Challenge #4
console.log('\n CODING CHALLENGE #4');

// 1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private;
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

class EVClass extends CarClass {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
}

// DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%
const Rivian = new EVClass('Rivian', 120, 23);
console.log(Rivian);
Rivian.chargeBattery(50).accelerate().accelerate().brake();
console.log(Rivian);
console.log(Rivian.speedUS);
