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

const getStorageItem = (name) => {
  let storageItem = localStorage.getItem(name);
  if (!!storageItem) {
    storageItem = JSON.parse(localStorage.getItem(name));
  } else {
    storageItem = [];
  }

  return storageItem;
};

const setStorageItem = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

export {
  getElement,
  allProductsUrl,
  singleProductUrl,
  createRange,
  getStorageItem,
  setStorageItem,
};
