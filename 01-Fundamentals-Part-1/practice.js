// Values and Variables
const country = "United States";
const continent = "North America";
let population = 328;
console.log(country);
console.log(continent);

// Data Types
const isIsland = false;
let language1;
console.log(typeof country);
console.log(typeof isIsland);
console.log(typeof language1);

// let, const, var
language1 = "English";
const language = "English";

// Basic Operators
console.log(population / 2);
console.log(population++)
console.log(population > 6);
console.log(population < 33);
const description = country + " is in " + continent + ", and its " + population + " million people speak " + language
console.log(description);

// String and Template Literals
const descriptionNew = `${country} is in ${continent}, and its ${population} million people speak ${language}`
console.log(descriptionNew);

// If-else statements
if (population > 33) {
    console.log(`${country}'s population is above average`);
} else {
    const difference = 33 - population;
    console.log(`${country}'s population is ${difference} million people below the average`)
}

// Type Conversion and Coercion
console.log('9' - '5'); // 4
console.log('19' - '13' + '17'); // 19-13 = 6, then 6 + '17' = 617
console.log('19' - '13' + 17); // 23
console.log('123' < 57); // false
console.log(5 + 6 + '4' + 9 - 4 - 2);
// 5+6 first is 11
// 11 + '4' = '114', '114' + 9 = '1149', '1149' - 4 - 2 = 1143

// Equality Operators: == vs. ===
const numNeighbors = Number(prompt("How many neighbor countries does your country have?"));
if (numNeighbors === 1) {
    console.log("Only 1 border");
} else if (numNeighbors > 1) {
    console.log("More than 1 border");
} else {
    console.log("No borders");
}

// Logical Operators
if (language === "English" && population < 50 && !isIsland) {
    console.log(`You should live in ${country} :)`);
} else {
    console.log(`${country} does not meet your criteria :(`)
}

// The Switch Statement
switch (language) {
    case "Chinese":
    case "Mandarin":
        console.log("MOST number of native speakers!");
        break;
    case "Spanish":
        console.log("2nd place in number of native speakers");
        break;
    case 'English':
        console.log("3rd place");
        break;
    case 'Hindi':
        console.log("Number 4");
        break;
    case 'Arabic':
        console.log("5th most spoken language");
        break;
    default:
        console.log("Great language too :D")
}

// Conditional (Ternary) Operators
console.log(`${country}'s population is ${population > 33 ? above : below} average`);