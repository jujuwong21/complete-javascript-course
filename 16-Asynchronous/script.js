'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// HELPER FUNCTIONS

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(
              data.population / 1000000
            ).toFixed()}M people</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
        </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
// USE https://restcountries.com/v2/ instead of
// https://restcountries.eu/rest/v2/

// SECTION: Our first AJAX Call: XMLHTTP Request
const getCountryDataXMLHTTP = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText); // destructure to get object
    console.log(data);

    const html = `
        <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  Number(data.population) / 1000000
                ).toFixed(1)}M people</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
            </div>
        </article>
        `;

    countriesContainer.insertAdjacentHTML('beforeEnd', html);
    countriesContainer.style.opacity = 1;
  });
};
//getCountryDataXMLHTTP('portugal');
//getCountryDataXMLHTTP('usa');
//getCountryDataXMLHTTP('china');

// SECTION: Welcome to Callback Hell
const getCountryAndNeighbor = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText); // destructure to get object
    console.log(data);
    // Render country1
    renderCountry(data);

    // get neighbor country (country 2)
    const [neighbor] = data.borders;
    if (!neighbor) return;
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
    request2.send();
    request2.addEventListener('load', function () {
      // response for API isn't an array when we searh for code (b/c codes are unique)
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};
//getCountryAndNeighbor('italy');

/*
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

// SECTION: Promises and the Fetch API, Consuming Promises
// Old way: XML HTTP Request
//const request = new XMLHttpRequest();
//request.open('GET', `https://restcountries.com/v2/name/${country}`);
//request.send();
const requestFetchApi = fetch('https://restcountries.com/v2/name/usa');
console.log(requestFetchApi);

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
//getCountryData('portugal');

// SECTION: Chaining Promises
const getCountryAndNeighborData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders;
      if (!neighbor) return;
      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor[0]}`);
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`💥💥${err}💥💥`);
      renderError(`💥💥Something went wrong, ${err.message}. Try again!💥💥`);
    })
    // happens regardless if promise is fulfilled or rejected
    .finally(() => (countriesContainer.style.opacity = 1));
};
//getCountryAndNeighborData('germany');

// SECTION: Handling Rejected Promises
/*EventListener('click', function () {
  getCountryAndNeighborData('china');
});*/
// first way to handle erorrs: add a callback as second arg in .then() method after fetch
// second way to handle errors: add a catch at the end of the chain

// SECTION: Throwing Errors Manually

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData2 = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.com/v3.1/name/${country}}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders;
      if (!neighbor) throw new Error('No neighbor found');
      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor[0]}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`💥💥${err}💥💥`);
      renderError(`💥💥Something went wrong, ${err.message}. Try again!💥💥`);
    })
    // happens regardless if promise is fulfilled or rejected
    .finally(() => (countriesContainer.style.opacity = 1));
};

//getCountryData2('australia');

// SECTION: THE EVENT LOOP IN PRACTICE
console.log('Test start ');
setTimeout(() => console.log('0 sec timer', 0));
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 100000000; i++) {} // add another 0 to see lag
  console.log(res);
});
console.log('Test end');

// SECTION: Building a simple promise
// Build promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 🤑'); // win lottery
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

// Consume promise
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(5)
  .then(() => {
    console.log('I waited for 5 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 more second'));

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => console.log('4 seconds passed'));

Promise.resolve('Immediately resolve').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

// SECTION: Promisifying the Geolocation API
/*navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.error(err)
);
*/

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

/*getPosition()
  .then(pos => console.log(pos.coords))
  .catch(err => console.error(err));
*/

// combine with code from coding challenge #1
const whereAmI = function (lat, long) {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: long } = pos.coords; // rename lat/long
      return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(`💥💥${err.message}💥💥`);
      renderError(`💥💥Something went wrong, ${err.message}. Try again!💥💥`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

//btn.addEventListener('click', whereAmI);

// SECTION: Consuming Promises with Async/Await

// fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res))
// SAME AS:
//  const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`);
// console.log(res)

const whereAmIAsync = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: long } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting reverse geolocation data');
    const dataGeo = await resGeo.json();

    // Country Data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);
    // returning values from async functions lecture
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`💥💥${err}💥💥`);
    renderError(`💥💥Something went wrong, ${err.message}. Try again!💥💥`);
    countriesContainer.style.opacity = 1;

    // Reject promise returned from async function (returning values from async functions lecture)
    throw err;
  }
};

// SECTION: Error handling with try...catch

try {
  let y = 1;
  const x = 2;
  y = 3;
} catch (err) {
  console.error(err);
}

// SECTION: Returning Values from Async Functions

/* convert this to async await IIFE 
console.log('1. Will get location');
whereAmIAsync()
  .then(city => console.log(`2. ${city}`))
  .catch(err => console.error(`2. ${err.message}`))
  .finally(() => console.log('3. Finished getting location'));
*/

console.log('1. Will get location');
(async function () {
  try {
    const city = await whereAmIAsync();
    console.log(`2. ${city}`);
  } catch (err) {
    console.error(`2. ${err.message}`);
  }
  console.log('3. Finished getting location');
})();

// SECTION: Running Promises in Parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countries('portugal', 'canada', 'tanzania');

// SECTION: Other promises: race, allSettled, and any
// Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('success'),
  Promise.resolve('success'),
  Promise.reject('failure'),
  Promise.resolve('success'),
]).then(res => console.log(res));

// Promise.any
Promise.any([
  Promise.resolve('success'),
  Promise.resolve('success'),
  Promise.reject('failure'),
  Promise.resolve('success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
