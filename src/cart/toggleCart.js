import { getElement } from '../utils.js';

const toggleCartBtn = getElement('.toggle-cart');
const cartOverlay = getElement('.cart-overlay');
const cartCloseBtn = getElement('.cart-close');

toggleCartBtn.addEventListener('click', () => {
  cartOverlay.classList.add('show-cart');
  document.body.classList.add('overlay-active');
});

cartCloseBtn.addEventListener('click', () => {
  cartOverlay.classList.remove('show-cart');
  document.body.classList.remove('overlay-active');
});
