import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';
import './src/sticky-nav.js';

import { getElement, allProductsUrl } from './src/utils.js';
import {
  displayProducts,
  fetchProducts,
  skeletonLoad,
} from './src/displayProducts.js';

import { setupStore, store } from './src/store.js';

const featuredContainer = getElement('.featured-center');

async function indexInit() {
  featuredContainer.innerHTML = skeletonLoad(3);
  const allProductData = await fetchProducts(allProductsUrl, featuredContainer);

  setupStore(allProductData);

  if (allProductData === undefined) {
    return;
  }

  const featuredProducts = store.filter((single) => {
    const { featured } = single;
    return featured;
  });

  displayProducts(featuredProducts, featuredContainer);
}

window.addEventListener('DOMContentLoaded', indexInit);
