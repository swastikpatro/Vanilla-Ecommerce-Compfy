import { findProduct, store } from '../store.js';
import { deepClone, getElement, getStorageItem } from '../utils.js';

import { addToCartDOM } from './addToCartDOM.js';
// import { openCart } from './toggleCart.js';

// const cartItemCountDOM = getElement('.cart-count');
const cartItemsContainer = getElement('.cart-items');
const cartItemCountInNav = getElement('.cart-item-count');
const cartTotalEle = getElement('.cart-total');
const alertEle = getElement('.alert');

// const cartTotal = getElement('.cart-items');

const cartAndOthers = getStorageItem('cartAndOthers', 'obj');
let cart = cartAndOthers.myCart ?? [];
let [totalCount, totalAmount] = cartAndOthers.totalCountAndAmount ?? [];

if (cart.length < 1) {
  totalCount = 0;
  cart = [...deepClone(store)];
  cart.forEach((single) => (single['count'] = 0));
}

function notify(type, msg) {
  alertEle.innerText = msg;
  alertEle.classList.add(`alert-${type}`, 'show-alert');

  setTimeout(() => {
    alertEle.classList.remove(`alert-${type}`, 'show-alert');
  }, 700);
}

const addToCart = (clickedID) => {
  // openCart();
  if (cart.length < 1) {
    totalCount = 0;
    cart = [...deepClone(store)].map((single) => {
      single['count'] = 0;
      return single;
    });
  }

  // console.log(cart);
  const isInCartAndIndex = cart.findIndex((single) => single.id === clickedID);
  cart[isInCartAndIndex].count += 1;
  notify(
    'success',
    `Added '${capitalize(cart[isInCartAndIndex].name)}' To Cart ✅`
  );
  displayCart(cartItemsContainer, cartItemCountInNav, cartTotalEle);
};

function capitalizeSingleWord(word) {
  return word[0].toUpperCase() + word.slice(1, word.length);
}

function capitalize(text) {
  return text
    .split('-')
    .map((singleWord) => capitalizeSingleWord(singleWord))
    .join(' ');
}

function getIdFindProductAndHandleDOM({ itemID, toDo, myCart, myContainer }) {
  const item = findProduct(itemID, myCart);
  switch (toDo) {
    case 'remove':
      item.count = 0;
      notify('success', `Removed All ${capitalize(item.name)}'s from Cart ✅`);
      break;
    case 'increment':
      item.count++;
      // notify('success', `+1 ${capitalize(item.name)} To Cart ✅`);
      break;
    case 'decrement':
      if (item.count < 0) {
        item.count = 0;
      }

      // notify if decrement-btn clicked when count === 1
      if (item.count === 1) {
        notify('success', `Removed ${capitalize(item.name)} from Cart ✅`);
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
    // console.log('clicked outside');
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

window.addEventListener('scroll', (e) => {
  alertEle.style.top = e.currentTarget.scrollY + 10 + 'px';
});

export { addToCart, cart, displayCart };
