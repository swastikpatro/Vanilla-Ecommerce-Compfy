import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

import { getElement, singleProductUrl } from '../utils.js';
const productPage = getElement('.single-product');

function renderSkeletonData() {
  productPage.innerHTML = `
    <div class="section-center single-product-center">
      <div class="skeleton-single-product-img">
        <i class="fa-regular fa-image"></i>
      </div>

      <div class="skeleton-single-product-info">
        <div>
          <div class="single-product-title"></div>
          <div class="single-product-company text-slanted"></div>
          <div class="skeleton-product-price"></div>
          <div class="single-product-colors">
            <div class="skeleton-product-color product-color"></div>
            <div class="skeleton-product-color product-color"></div>
            <div class="skeleton-product-color product-color"></div>
          </div>
          <div class="single-product-desc">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="addToCartBtn btn" data-id="id">add to cart</div>
        </div>
      </div>
    </div>
  `;
}

function renderData(data) {
  const {
    fields: { colors, company, name, price, image, description },
    id,
  } = data;
  const [{ url: myImage }] = image;
  const infoOfProduct = `
      <img
          src="${myImage}"
          alt="${name}"
          class="single-product-img img skeleton-single-product-img"
        />

        <article class="single-product-info">
          <div>
            <h2 class="single-product-title">${name}</h2>
            <p class="single-product-company text-slanted">by ${company}</p>
            <p class="single-product-price">$${price / 100}</p>
            <div class="single-product-colors">
              ${colors
                .map(
                  (singleColor) =>
                    `<div style='background: ${singleColor}' class="product-color"></div>`
                )
                .join('')}
            </div>
            <p class="single-product-desc">
              ${description}
            </p>
            <button class="addToCartBtn btn" data-id="id">add to cart</button>
          </div>
        </article>
      `;

  productPage.innerHTML = `
  <div class="section-center single-product-center">
    ${infoOfProduct}
  </div>
  `;
}

async function displaySingleProduct(singleProductUrl) {
  try {
    const param = new URLSearchParams(window.location.search);
    const productID = param.get('id');

    const response = await fetch(`${singleProductUrl}${productID}`);
    if (!response.ok) {
      throw new Error("Can't fetch data");
    }

    const singleData = await response.json();
    renderData(singleData);
  } catch (err) {
    console.log(err);
  }
}

renderSkeletonData();

window.addEventListener('DOMContentLoaded', () => {
  displaySingleProduct(singleProductUrl);
});
