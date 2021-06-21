'use strict';
// Functions
function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}
console.log(describeCountry("Finland", 6, "Helsinki"));

// Function Declarations and Expressions
function percentageOfWorld1(population) {
    return population / 7900 * 100;
}
const usPercentage1 = percentageOfWorld1(311);
const chinaPercentage1 = percentageOfWorld1(1441);
const finlandPercentage1 = percentageOfWorld1(6);
console.log(usPercentage1, chinaPercentage1, finlandPercentage1);

const percentageOfWorld2 = function (population) {
    return population / 7900 * 100;
}
const usPercentage2 = percentageOfWorld2(331);
const chinaPercentage2 = percentageOfWorld2(1441);
const finlandPercentage2 = percentageOfWorld2(6);
console.log(usPercentage2, chinaPercentage2, finlandPercentage2);

// Arrow Functions
const percentageOfWorld3 = population => population / 7900 * 100;
const usPercentage3 = percentageOfWorld3(331);
const chinaPercentage3 = percentageOfWorld3(1441);
const finlandPercentage3 = percentageOfWorld3(6);
console.log(usPercentage3, chinaPercentage3, finlandPercentage3);

// Functions calling another function
function describePopulation(country, population) {
    const percentOfWorld = percentageOfWorld1(population);
    return `${country} has ${population} million people, which is about ${Math.round(percentOfWorld * 100) / 100}% of the world.`
}
console.log(describePopulation("The United States", 331));
console.log(describePopulation("China", 1441));
console.log(describePopulation("Finland", 6));

// Intro to Arrays
const countries = ["United States", "China", "South Korea", "Canada"];
const populations = [331, 1441, 51, 38];
console.log(populations.length === 4);
const percentages = [
    percentageOfWorld1(populations[0]),
    percentageOfWorld1(populations[1]),
    percentageOfWorld1(populations[2]),
    percentageOfWorld1(populations[3])];
console.log(populations, percentages);

// Basic Array Operations (Methods)
const neighbors = ["Mongolia", "North Korea", "India", "Nepal"]; // China neighbors
neighbors.push("Utopia");
console.log(neighbors)
neighbors.pop();
console.log(neighbors)
if (!neighbors.includes("Germany")) {
    console.log("Probably not a central European country :D");
}
const index = neighbors.indexOf("North Korea");
neighbors[index] = "South Korea";
console.log(neighbors);

// Intro to Objects
const myCountry = {
    country: "United States of America",
    capital: "Washington DC",
    language: "English",
    population: 311,
    neighbors: ['Mexico', 'Canada']
};

// Dot vs. Bracket Notation
console.log(
    `${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbors.length} neighboring countries, and a capital called ${myCountry.capital}`
);
myCountry.population += 2;
console.log(myCountry.population)
myCountry["population"] -= 2;
console.log(myCountry.population);

// Object Methods
myCountry.describe = function () {
    console.log(
        `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbors.length} neighboring countries, and a capital called ${this.capital}`
    );
};
myCountry.describe();
myCountry.checkIsland = function () {
    this.isIsland = this.neighbors.length === 0 ? true : false;
};
myCountry.checkIsland();
console.log(myCountry);

// Iteration: The For Loop
for (let i = 1; i <= 50; i++) {
    console.log(`Vote number ${i} is currently voting!`);
};

// Looping Arrays, Continues + Breaks
const percentages2 = [];
for (let i = 0; i < populations.length; i++) {
    percentages2.push(percentageOfWorld1(populations[i]));
};
console.log(percentages2);
console.log(percentages);
// to check equality
console.log(percentages.every(item => percentages2.includes(item)) && percentages2.every(item => percentages.includes(item)));

// Looping Backwards and Loops in Loops
const listOfNeighbors = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];
for (let insideArray = 0; insideArray < listOfNeighbors.length; insideArray++) {
    for (let i = 0; i < listOfNeighbors[insideArray].length; i++) {
        console.log(`Neighbor in row ${insideArray} col ${i}: ${listOfNeighbors[insideArray][i]}`);
    };
};

// While Loop
const percentages3 = [];
const i = 0;
while (i < populations.length) {
    percentages3.push(percentageOfWorld1(populations[i]));
    i++;
}
console.log(percentages2.every(item => percentages3.includes(item)) && percentages3.every(item => percentages2.includes(item)));
