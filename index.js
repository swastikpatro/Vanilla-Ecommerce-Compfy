import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';

import { getElement, allProductsUrl } from './src/utils.js';
import {
  displayProducts,
  fetchProducts,
  skeletonLoad,
} from './src/displayProducts.js';

const featuredContainer = getElement('.featured-center');

async function indexInit() {
  featuredContainer.innerHTML = skeletonLoad(3);
  const allProductData = await fetchProducts(allProductsUrl, featuredContainer);

  if (allProductData === undefined) {
    return;
  }

  const featuredProducts = allProductData.filter((single) => {
    const {
      fields: { featured },
    } = single;

    return featured;
  });

  featuredContainer.innerHTML = displayProducts(featuredProducts);
}

window.addEventListener('DOMContentLoaded', indexInit);
