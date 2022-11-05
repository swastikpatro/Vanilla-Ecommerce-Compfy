const allProductsUrl = 'https://course-api.com/javascript-store-products';
const singleProductUrl =
  'https://course-api.com/javascript-store-single-product?id=';

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (!!element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

function createRange(endNo) {
  return Array.from({ length: endNo }, (_, i) => i + 1);
}

const getStorageItem = (name, type) => {
  let storageItem = localStorage.getItem(name);
  JSON.parse(storageItem);
  if (!!storageItem) {
    storageItem = JSON.parse(localStorage.getItem(name));
  } else {
    storageItem = type === 'obj' ? {} : [];
  }
  return storageItem;
};

const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

const formatPrice = (price) => {
  let formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price / 100).toFixed(2));

  return formattedPrice;
};

const debounce = (func, delay) => {
  let timeoutID;

  return function (...args) {
    if (!!timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

function deepClone(input) {
  const result = Array.isArray(input) ? [] : {};

  if (typeof input === 'object') {
    return input;
  }

  for (const key in input) {
    result[key] = deepClone(input[key]);
  }

  return result;
}

export {
  getElement,
  allProductsUrl,
  singleProductUrl,
  createRange,
  getStorageItem,
  setStorageItem,
  formatPrice,
  debounce,
  deepClone,
};
