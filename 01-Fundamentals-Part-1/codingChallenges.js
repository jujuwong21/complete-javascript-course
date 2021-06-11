// Coding Challenge #1
const markMass = 78; // 95
const markHeight = 1.69; // 1.88
const johnMass = 92; // 85
const johnHeight = 1.95; // 1.76

const markBMI = markMass / markHeight ** 2;
const johnBMI = johnMass / (johnHeight * johnHeight);
console.log(markBMI, johnBMI);

// Coding Challenge #2
if (markBMI > johnBMI) {
    console.log(`Mark's BMI (${Math.round(markBMI * 100) / 100}) is higher than John's (${Math.round(johnBMI * 100) / 100})`)
} else {
    console.log(`John's BMI (${Math.round(johnBMI * 100) / 100}) is higher than Marks's (${Math.round(markBMI * 100) / 100})`)
}

// Coding Challenge #3
const dolphinsAverage = (96 + 108 + 89) / 3;
const koalasAverage = (88 + 91 + 110) / 3;

//const dolphinsAverage = (97 + 112 + 101) / 3;
//const koalasAverage = (109 + 95 + 123) / 3;

//const dolphinsAverage = (97 + 112 + 101) / 3;
//const koalasAverage = (109 + 95 + 106) / 3;

console.log(dolphinsAverage, koalasAverage)

if (dolphinsAverage >= 100 || koalasAverage >= 100) {
    if (dolphinsAverage > koalasAverage) {
        console.log("Dolphins win!")
    } else if (dolphinsAverage < koalasAverage) {
        console.log("Koalas win!")
    } else {
        console.log("It's a tie!")
    }
} else {
    console.log("Didn't meet minimum score")
}

// Coding Challenge #4
const bill = 275; // or 40 or 430
const tip = bill >= 50 && bill <= 300 ? 0.15 * bill : 0.20 * bill;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value was ${bill + tip}`);