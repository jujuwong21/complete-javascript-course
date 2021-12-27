'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// SECTION: Implementing Smooth Scrolling
console.log('\n IMPLEMENTING SMOOTH SCROLLING');
console.log(
  'height/width viewport',
  document.documentElement.clientHeight,
  document.documentElement.clientWidth
);
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coordinates = section1.getBoundingClientRect();
  console.log(s1coordinates);
  //console.log(e.target.getBoundingClientRect());
  //console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset);
  // Sccrolling
  //window.scrollTo(window.pageXOffset + s1coordinates.left, window.pageYOffset + s1coordinates.top);
  window.scrollTo({
    left: window.pageXOffset + s1coordinates.left,
    top: window.pageYOffset + s1coordinates.top,
    behavior: 'smooth',
  });
  // Modern browser only
  //section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// SECTION: Event Delegation: Implementing Page Navigation
console.log('\n EVENT DELEGATION: IMPLEMENTING PAGE NAVIGATION');

// Without event delegation
// This is attached to each element -- unnecessary, inefficient
/*
document.querySelectorAll('.nav__link').forEach(function (element) {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href'); // instead of this.href because want relative href
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

// With event delegation - add event listener to parent instead of each child
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////

// SECTION: Selecting, Creating, and Deleting Elements

// Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const allSections = document.querySelectorAll('.section');
console.log(document.querySelector('.section'), allSections);
// dont need # here for ID
console.log(document.getElementById('section--1'));
// returns HTML collections
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
//insertAdjacentHTML: covered in last section
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent =  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class ="btn btn--close-cookie"> Got it!</button>';
// add message to header section
//document.querySelector('header').prepend(message.cloneNode(true));
document.querySelector('header').append(message);
//document.querySelector('header').before(message); // before header
//document.querySelector('header').after(message);

// Deleting elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    //message.parentElement.removeChild(message);
    message.remove();
  });

// SECTION: Styles, Attributes, and Classes
console.log('\n STYLES, ATTRIBUTES, AND CLASSES');
// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(getComputedStyle(message).color, getComputedStyle(message).height);
// we use number.parseFloat to add the two numbers b/c one has the 'px'
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px';
// CSS Variables
document.documentElement.style.setProperty('--color-primary', '#5ec576');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt, logo.src, logo.className);
logo.alt = 'Logo for Bankist App'; // standard attributes
logo.setAttribute('company', 'Bankist'); // non-standard attributes
console.log(logo.src, logo.getAttribute('srcb'));
console.log(logo.dataset.versionNumber); // use camelCase
const link = document.querySelector('.nav__link--btn');
console.log(link.href, link.getAttribute('href'));

// Classes
console.log(logo.classList);
logo.classList.add('class1', 'class2');
logo.classList.remove('class1');
logo.classList.remove('class2');
logo.classList.toggle('c');
console.log(logo.classList.contains('class1'));

// SECTION: Types of Events and Event Handlers
console.log('\n TYPES OF EVENTS AND EVENT HANDLERS');
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);
//h1.onmouseenter = function (e) {
//alert('onMouseEnter: Great! You are reading the heading :D');
//};

// SECTION: Event Propagation in Practicec
console.log('\n EVENT PROPAGATION IN PRACTICE');
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor(), randomColor());

// add to navLink
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
  // Stop propagation - not usually a good idea in practice
  //e.stopPropagation();
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  //true
);
*/
