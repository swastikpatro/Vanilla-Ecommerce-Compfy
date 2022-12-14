import { getStorageItem, setStorageItem } from './utils.js';

let store = getStorageItem('store');
const setupStore = (products) => {
  store = products
    .map((single) => {
      const {
        id,
        fields: { company, colors, featured, price, name, image },
      } = single;

      const { url: img } = image[0].thumbnails.full;
      return { id, company, colors, featured, price, name, img };
    })
    .sort(({ price: price1 }, { price: price2 }) => price1 - price2);

  setStorageItem('store', store);
};

const findProduct = (searchID, data) => {
  let searchedProduct = data.find((product) => product.id === searchID);
  return searchedProduct;
};

export { store, setupStore, findProduct };
