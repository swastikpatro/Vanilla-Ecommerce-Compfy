import { findProduct, store } from '../store.js';
import {
  deepClone,
  getElement,
  getStorageItem,
  setStorageItem,
} from '../utils.js';
import addToCartDOM from './addToCartDOM.js';
import { openCart } from './toggleCart.js';

// const cartItemCountDOM = getElement('.cart-count');
const cartItemsContainer = getElement('.cart-items');
const cartItemCountInNav = getElement('.cart-item-count');
const cartTotalEle = getElement('.cart-total');
// const cartTotal = getElement('.cart-items');

const cartAndOthers = getStorageItem('cartAndOthers', 'obj');
let cart = cartAndOthers.myCart ?? [];
let [totalCount, totalAmount] = cartAndOthers.totalCountAndAmount ?? [];

if (cart.length < 1) {
  totalCount = 0;
  cart = [...deepClone(store)];
  cart.forEach((single) => (single['count'] = 0));
}

const addToCart = (clickedID) => {
  openCart();
  const isInCartAndIndex = cart.findIndex((single) => single.id === clickedID);
  cart[isInCartAndIndex].count += 1;
  displayCart(cartItemsContainer, cartItemCountInNav, cartTotalEle);
};

function getIdFindProductAndHandleDOM({ itemID, toDo, myCart, myContainer }) {
  const item = findProduct(itemID, myCart);
  switch (toDo) {
    case 'remove':
      item.count = 0;
      break;
    case 'increment':
      item.count++;
      break;
    case 'decrement':
      if (item.count < 0) {
        item.count = 0;
      }
      item.count--;
      break;
    default:
      return;
  }
  addToCartDOM(myCart, myContainer, cartItemCountInNav, cartTotalEle);
}

function handleCartClicks(e) {
  if (!('btn' in e.target.dataset)) {
    console.log('clicked outside');
    return;
  }

  const itemID = e.target.closest('.cart-item').dataset.id;

  if (e.target.classList.contains('remove-btn')) {
    getIdFindProductAndHandleDOM({
      itemID,
      toDo: 'remove',
      myCart: cart,
      myContainer: cartItemsContainer,
    });
    return;
  }
  if (e.target.classList.contains('increment-count')) {
    getIdFindProductAndHandleDOM({
      itemID,
      toDo: 'increment',
      myCart: cart,
      myContainer: cartItemsContainer,
    });
    return;
  }
  if (e.target.classList.contains('decrement-count')) {
    getIdFindProductAndHandleDOM({
      itemID,
      toDo: 'decrement',
      myCart: cart,
      myContainer: cartItemsContainer,
    });
    return;
  }
}

function displayCart(cartContainerEle, countEle, amountEle) {
  const cartContainerClickable = addToCartDOM(
    cart,
    cartContainerEle,
    countEle,
    amountEle
  );

  if (!!cartContainerClickable) {
    cartContainerClickable.addEventListener('click', handleCartClicks);
  }
}

function displayCartCount() {
  cartItemCountInNav.innerText = totalCount ?? 0;
}

function init() {
  displayCartCount();
  displayCart(cartItemsContainer, cartItemCountInNav, cartTotalEle);
}

init();

export { addToCart, cart, displayCart };
