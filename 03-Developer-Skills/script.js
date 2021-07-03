// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// SECTION: Setting up prettier and VS Code
const x = 23;
if (x === 23) console.log('hi');
const calcAge = birthYear => 2037 - birthYear;
console.log(calcAge);

// SECTION: Installing Node.js and setting up a dev environment
// downloaded Live Server extension, hit "Live Server" on bottom to open port
console.log('live server');

// SECTION: Using Google, StackOverflow, and MDN
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there may be a sensor error"

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1.) Understanding the Problem
// amplitude: difference between highest and lowest temp
// need to compute max and min temp in array
// need to know how to deal with error values

// 2.) Breaking up into sub-problems
// Ignore sensor errors
// Find min and max of array
// Return max - min (amplitude)

const calcAmplitude = function (inputArray) {
  // Initialize values - first element in array
  let minVal = inputArray[0];
  let maxVal = inputArray[0];

  for (let i = 0; i < inputArray.length; i++) {
    // check to see if error value
    if (typeof inputArray[i] !== 'number') continue;

    // replace min/max if necessary
    if (inputArray[i] < minVal) minVal = inputArray[i];
    else if (inputArray[i] > maxVal) maxVal = inputArray[i];
  }
  return maxVal - minVal;
};
console.log(calcAmplitude(temperatures));

// Problem 2: function should now receive 2 arrays of temperatures: merge two arrays at the beginning
const calcAmplitude2 = function (array1, array2) {
  const inputArray = array1.concat(array2);
  // Initialize values - first element in array
  let minVal = inputArray[0];
  let maxVal = inputArray[0];

  for (let i = 0; i < inputArray.length; i++) {
    // check to see if error value
    if (typeof inputArray[i] !== 'number') continue;

    // replace min/max if necessary
    if (inputArray[i] < minVal) minVal = inputArray[i];
    else if (inputArray[i] > maxVal) maxVal = inputArray[i];
  }
  return maxVal - minVal;
};
console.log(calcAmplitude2([-1, 0, 2, 3, 4], [5, 6, 7, 8, 10]));

// SECTION: Debugging with the Console and Breaking Points
const celsiusToKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    // commented to avoid prompt every time
    //value: Number(prompt('Degrees celsius:')),
    value: 10,
  };
  console.table(measurement);
  const kelvin = measurement.value + 273;
  return kelvin;
};
console.log('Value in Kelvin', celsiusToKelvin());

// SECTION: Coding Challenge
// goal: print "... 17°C in 1 days ... 21°C in 2 days ... 23°C in 3 days ..."
// ° is found by doing shift-option-8
const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

const printForecast = function (inputArray) {
  let finalString = '';
  for (let i = 0; i < inputArray.length; i++) {
    const stringPart = `... ${inputArray[i]} °C in ${i + 1} days `;
    finalString += stringPart;
  }
  finalString += '...';
  return finalString;
};
console.log(printForecast(data1));
console.log(printForecast(data2));
