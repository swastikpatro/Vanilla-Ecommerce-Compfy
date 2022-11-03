import { createRange } from './utils.js';

function displayProducts(dataArr = []) {
  return dataArr
    .map((singleProduct) => {
      const {
        fields: { name, price, image },
        id,
      } = singleProduct;
      const [{ url: myImage }] = image;
      return `
      <article class="product">
          <div class="product-container">
            <img src="${myImage}" alt="${name}" class="product-img img skeleton-img" />

            <div class="product-overlay">
              <div class="product-icons">
                <a
                  href="product.html?id=${id}"
                  target="_blank"
                  class="product-icon"
                >
                  <i class="fa-solid fa-search"></i>
                </a>

                <button class="product-cart-btn product-icon" data-id="1">
                  <i class="fa-solid fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          </div>

          <footer>
            <p class="product-name">${name}</p>
            <h4 class="product-price">$${price / 100}</h4>
          </footer>
        </article>
    `;
    })
    .join('');
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

    return data;
  } catch (err) {
    myContainer.innerHTML = `<div class="filter-error">${err}</div>`;
  }
}

export { displayProducts, skeletonLoad, fetchProducts };
