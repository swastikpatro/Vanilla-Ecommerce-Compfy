import { getElement } from '../utils.js';
import { displayCart } from './setupCart.js';

const toggleCartBtn = getElement('.toggle-cart');
const cartOverlay = getElement('.cart-overlay');
const cartCloseBtn = getElement('.cart-close');

toggleCartBtn.addEventListener('click', () => {
  cartOverlay.classList.add('show-cart');
  document.body.classList.add('overlay-active');
  displayCart(
    getElement('.cart-items'),
    getElement('.cart-item-count'),
    getElement('.cart-total')
  );
});

cartCloseBtn.addEventListener('click', () => {
  cartOverlay.classList.remove('show-cart');
  document.body.classList.remove('overlay-active');
});

export const openCart = () => {
  cartOverlay.classList.add('show-cart');
  document.body.classList.add('overlay-active');
};
