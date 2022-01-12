'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');

///////////////////////////////////////

// Modal window
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

// SECTION: Building a Tabbed Component
console.log('\n BUILDING A TABBED COMPONENT');

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  // get button no matter whether you click on tab or the span (number)
  const clicked = e.target.closest('.operations__tab');
  // Guard clause
  if (!clicked) return;

  // Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Active content area
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// SECTION: Passing Arguments to Event Handlers
console.log('\n PASSING ARGUMENTS TO EVENT HANDLERS');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// SECTION: Implementing a Sticky Navigation: The Scroll Event
console.log('\n IMPLEMNTING A STICKY NAVIGATION');

const initialCoordinates = section1.getBoundingClientRect();
console.log(initialCoordinates);

// Scroll Event - not super efficient
// comes up when you reach 1st secction
//window.addEventListener('scroll', function (e) {
//  if (window.scrollY > initialCoordinates.top) nav.classList.add('sticky');
//  else nav.classList.remove('sticky');
//});

// SECTION: The Intersection Observer API
console.log('\n THE INTERSECTION OBSERVER API (FOR STICKY NAVIGATION)');
// want sticky when header is out of view
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// SECTION: Revealing Elements (Sections on Scroll)
console.log('\n REVEALING ELEMENTS ON SCROLL');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// SECTION: Lazy Loading Images
console.log('\n LAZY LOADING IMAGES');
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // remove lazy-img class (after new image loads)
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '+200px', // to make images load before threshold is reached
});
imgTargets.forEach(img => imgObserver.observe(img));

// SECTION: Building a Slider Component
/// put everything in a function so we don't pollute global var namespace
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let curSlide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide ="${i}"></button>`
      );
    });
  };

  const activateDot = function (curSlide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${curSlide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, index) =>
        (s.style.transform = `translateX(${100 * (index - slide)}%)`)
    );
    activateDot(slide);
  };
  // first slide: 0%, slide 2: 100%, slide 3: 200%

  // Go to next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };
  btnRight.addEventListener('click', nextSlide);

  // Go to previous slide
  const previousSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  btnLeft.addEventListener('click', previousSlide);

  // Pressing a key to add slide functionality
  document.addEventListener('keydown', function (e) {
    // short circuit way: e.key === 'ArrowRight' && nextSlide();
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') previousSlide();
  });

  // Use dots to add slide function
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      console.log(e.target);
      const { slide } = e.target.dataset;
      goToSlide(slide);
    }
  });

  // INITIALIZATION FUNCTION
  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };
  init();
};
slider();

///////////////////////////////////////

// SECTION: Selecting, Creating, and Deleting Elements
console.log('\n SELECTING, CREATING, AND DELETING ELEMENTS');

// Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
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

// SECTION: DOM Traversng
console.log('\n DOM TRAVERSING');
console.log('Element:', h1);
// Going downwards - child
console.log('Query Selector: ', h1.querySelectorAll('.highlight'));
console.log('childNodes: ', h1.childNodes);
console.log('children: ', h1.children);
console.log(
  'first and last element child: ',
  h1.firstElementChild,
  h1.lastElementChild
);
// h1.firstElementChild.style.color = 'white'; // can set values too

// Going upwards - parents
console.log('parentNode: ', h1.parentNode);
console.log('parentElement: ', h1.parentElement);
console.log('closest with header separator: ', h1.closest('.header'));
// can set, showing how to use CSS variable
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Going sideways - siblings
console.log('previousElementSibling: ', h1.previousElementSibling);
console.log('nextElementSibling: ', h1.nextElementSibling);
console.log('previousSibling: ', h1.previousSibling);
console.log('nextSibling: ', h1.nextSibling);
console.log([...h1.parentElement.children]);

// SECTION: The Intersection Observer API
console.log('\n THE INTERSECTION OBSERVER API');

const obsCallback = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2], // 10%
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
//observer.observe(section1);

// SECTION: Lifecycle DOM Events
console.log('\n LIFECYCLE DOM EVENTS');
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built');
  console.log(e);
});
window.addEventListener('load', function (e) {
  console.log('Page fully loaded!');
  console.log(e);
});
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
