// Importing module
// SECTION: Exporting and Importing in ES6 Modules
console.log('SECTION: Exporting and Importing in ES6 Modules');
console.log('Importing module');

// Importing module w/o any values
// import './shoppingCart.js';

// Importing module + specific values
/*
import { addToCart, totalPrice as price } from './shoppingCart.js';
addToCart('bread', 5);
console.log(price);
*/

// Importing whole module
/*
import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice);
*/

// Importing Default value
// can also add other values (but not desirable): import add, { addToCart, totalPrice as price } from './shoppingCart.js';
import add, { cart } from './shoppingCart.js';
add('bread', 5);
add('pizza', 3);
add('apple', 2);
add('cheese', 1);
console.log(cart); // shows not empty - live connection

// SECTION: Top-Level Await (ES2022)
console.log('\n SECTION: Top-level await (ES2022)');
/* to show harm of top-level await
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);
console.log('After fetch request');
*/
/*
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};
const lastPost = getLastPost();
// need to do this b/c async functions return a promise (not the cleanest)
lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

// SECTION: The module Pattern
console.log('\n SECTION: THE MODULE PATTERN');

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10; // private
  const totalPrice = 237;
  const totalQuantity = 23;
  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart!`);
    // still works, shows can access shippingCost
    console.log(`Shipping cost is ${shippingCost}`);
  };

  // private
  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();
ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost); // private

// SECTION: CommonJS Modules
/*
export.exportName = ...

const {addToCcart = require('.)}
*/

// SECTION: Introduction to NPM
console.log('\n SECTION: INTRODUCTION TO NPM');
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js'; old way, specify path
import cloneDeep from 'lodash-es';
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
stateClone.user.loggedIn = false;
console.log('Clone', stateClone);
console.log('Deep clone', stateDeepClone);

// SECTION: Bundling with Parcel and NPM Scripts
console.log('\n SECTION: BUNDLING WITH PARCEL AND NPM SCRIPTS');
if (module.hot) {
  module.hot.accept();
}

// SECTION: Configuring Babel and Polyfilling
console.log('\n SECTION: CONFIGURING BABEL AND POLYFILLING');
class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}
const jonas = new Person('Jonas');
console.log('Jonas' ?? null);

// by default, isn't converted to ES5
console.log(cart.find(el => el.quantity >= 2));

import 'core-js/stable/array/find'; // polyfilled
// for polyfilling async functions
import 'regenerator-runtime/runtime';
