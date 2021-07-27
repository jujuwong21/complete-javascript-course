'use strict';

// Create variables to avoid repetition
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal);

// Function to open modal
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Function to close modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Open modal when any of the buttons are opened
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

// Close modal when 'x' button is pressed
btnCloseModal.addEventListener('click', closeModal);

// CLose modal when you click outside of modal (in overlay)
overlay.addEventListener('click', closeModal);

// close modal when escape button on keyboard is pressed
// needs to check modal class to see if you need to close it
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
