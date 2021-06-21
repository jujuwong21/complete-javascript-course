'use strict';
// Coding Challenge #1: Functions
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const checkWinner = function (dolphinsAvg, koalasAvg) {
    if (dolphinsAvg >= 2 * koalasAvg) {
        console.log(`Dolphins win (${dolphinsAvg} vs. ${koalasAvg})`)
    } else if (koalasAvg >= 2 * dolphinsAvg) {
        console.log(`Koalas win (${koalasAvg} vs. ${dolphinsAvg})`)
    } else {
        console.log("Nobody wins")
    }
}
let dolphinsAvg = calcAverage(44, 23, 71);
let koalasAvg = calcAverage(65, 54, 49);
console.log("Test Data 1:", dolphinsAvg, koalasAvg);
checkWinner(dolphinsAvg, koalasAvg);

dolphinsAvg = calcAverage(85, 54, 41);
koalasAvg = calcAverage(23, 34, 27);
console.log("Test Data 2:", dolphinsAvg, koalasAvg);
checkWinner(dolphinsAvg, koalasAvg);


// Coding Challenge #2: Arrays
// can also use ternary operator instead of if-statement
const calcTip = function (bill) {
    if (bill >= 50 && bill <= 300) {
        return 0.15 * bill;
    } else {
        return 0.20 * bill;
    }
}
console.log(calcTip(100));

const bills = [125, 555, 44];
console.log(bills);
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
console.log(tips);
const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(total);


// Coding Challenge #3: Objects
const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.bmi = this.mass / (this.height ** 2);
        return this.bmi;
    }
}
const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.bmi = this.mass / (this.height ** 2);
        return this.bmi;
    }
}
mark.calcBMI();
john.calcBMI();

console.log(mark.bmi, john.bmi);

if (mark.bmi > john.bmi) {
    console.log(`${mark.fullName}'s BMI (${Math.round(mark.bmi * 100) / 100}) is higher than ${john.fullName}'s (${Math.round(john.bmi * 100) / 100}).`)
} else if (john.bmi > mark.bmi) {
    console.log(`${john.fullName}'s BMI (${Math.round(john.bmi * 100) / 100}) is higher than ${mark.fullName}'s (${Math.round(mark.bmi * 100) / 100}).`)
} else {
    console.log(`${john.fullName} and ${mark.fullName} have the same BMI (${Math.round(john.bmi * 100) / 100}).`)
}

// Coding Challenge 4: Loops
const bills2 = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips2 = [];
const totals2 = [];

for (let i = 0; i < bills2.length; i++) {
    const tip = calcTip(bills2[i]);
    tips2.push(tip);
    totals2.push(bills2[i] + tip);
};
console.log(bills2, tips2, totals2);

const calcAverage2 = function (arr) {
    const denominator = arr.length;
    let numerator = 0;
    for (let i = 0; i < arr.length; i++) {
        numerator += arr[i];
    };
    return numerator / denominator;
};
console.log("Average Total:", calcAverage2(totals2));
console.log("Average Tips:", calcAverage2(tips2));