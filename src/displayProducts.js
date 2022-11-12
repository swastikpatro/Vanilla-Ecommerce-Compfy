import { addToCart } from './cart/setupCart.js';
import { createRange, formatPrice } from './utils.js';

function displayProducts(dataArr = [], container, hasCalledOnInit = false) {
  container.innerHTML = dataArr
    .map((singleProduct) => {
      const { name, price, img: myImage, id } = singleProduct;
      return `
      <article class="product skeleton-product">
          <div class="product-container">
            <img src="${myImage}" alt="${name}" class="product-img img skeleton-img" />

            <div class="product-overlay">
              <div class="product-icons">
                <a
                  href="product.html?id=${id}"
                  class="product-icon"
                >
                  More info
                  <i class="fa-solid fa-search"></i>
                </a>

                <button class="product-cart-btn product-icon" data-id="${id}">
                  Add To
                  <i class="fa-solid fa-cart-plus"></i>
                </button>
              </div>
            </div>
          </div>

          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article>
    `;
    })
    .join('');

  if (!hasCalledOnInit) return;

  container.addEventListener('click', (e) => {
    const clickedOnProductIcon = e.target.closest('.product-cart-btn');
    if (!clickedOnProductIcon) {
      return;
    }

    addToCart(clickedOnProductIcon.dataset.id);
  });
}

function skeletonLoad(productCount) {
  return [...createRange(productCount)]
    .map((singleProduct) => {
      return `
      <article class="skeleton-product">
          <div class="skeleton-img">
            <i class="fa-regular fa-image"></i>
          </div>

          <footer class="skeleton-footer">
            <div class="skeleton-product-name"></div>
            <div class="skeleton-product-price"></div>
          </footer>
        </article>
    `;
    })
    .join('');
}

async function fetchProducts(url = '', myContainer) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Can't fetch data");
    }

    const data = await response.json();

    // console.log(data);
    return data;
  } catch (err) {
    myContainer.innerHTML = `<div class="filter-error">${
      `${'' + err}`.split(':')[1]
    }</div>`;
  }
}

export { displayProducts, skeletonLoad, fetchProducts };
