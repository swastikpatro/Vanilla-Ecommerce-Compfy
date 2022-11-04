import { getStorageItem, setStorageItem } from './utils.js';

let store = getStorageItem('store');
const setupStore = (products) => {
  store = products.map((single) => {
    const {
      id,
      fields: { company, colors, featured, price, name, image },
    } = single;

    const [{ url: img }] = image;
    return { id, company, colors, featured, price, name, img };
  });

  setStorageItem('store', store);
};

const findProduct = (searchID) => {
  let searchedProduct = store.find((product) => product.id === searchID);
  return searchedProduct;
};

export { store, setupStore, findProduct };
