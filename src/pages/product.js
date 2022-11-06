import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

import { formatPrice, getElement, singleProductUrl } from '../utils.js';
import { addToCart } from '../cart/setupCart.js';
const productPage = getElement('.single-product');
// const btn = getElement('.addToCartBtn');

function renderSkeletonData() {
  productPage.innerHTML = `
    <div class="section-center single-product-center">
      <div class="section-center single-product-center">
        <div class="skeleton-single-product-img">
          <i class="fa-regular fa-image"></i>
        </div>

        <div class="skeleton-single-product-info">
          <div>
            <div class="skeleton-single-product-title"></div>
            <div class="skeleton-single-product-company text-slanted"></div>
            <div class="skeleton-product-price"></div>
            <div class="skeleton-single-product-colors">
              <div class="skeleton-product-color product-color"></div>
              <div class="skeleton-product-color product-color"></div>
              <div class="skeleton-product-color product-color"></div>
            </div>
            <div class="skeleton-single-product-desc">
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
            <div class="skeleton-btn">add to cart</div>
          </div>
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
            <p class="single-product-price">${formatPrice(price)}</p>
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
            <button class="addToCartBtn btn" data-id="${id}">
              add to cart
            </button>
          </div>
        </article>
      `;

  productPage.innerHTML = `
  <div class="section-center single-product-center">
    ${infoOfProduct}
  </div>
  `;

  getElement('.page-hero-title').innerText = `Home / ${name}`;

  return productPage;
}

async function fetchSingleProduct(singleProductUrl) {
  const param = new URLSearchParams(window.location.search);
  const productID = param.get('id');
  try {
    const response = await fetch(`${singleProductUrl}${productID}`);
    if (response.status < 200 || response.status > 299) {
      productPage.innerHTML = `
      <div class='section-center single-product-center'>
        <div>
          <div class="error">Sorry, something went wrong.</div>
          <a href="index.html" class="home-link btn">
            home
          </a>
        </div>
      </div>`;

      return;
    }

    const singleData = await response.json();
    return singleData;
  } catch (err) {
    console.log(err);
  }
}

renderSkeletonData();

window.addEventListener('DOMContentLoaded', async () => {
  const singleProductData = await fetchSingleProduct(singleProductUrl);
  const productSection = renderData(singleProductData);

  if (!!productSection) {
    getElement('.addToCartBtn').addEventListener('click', (e) =>
      addToCart(e.currentTarget.dataset.id)
    );
  }

  // Following code works
  // window.addEventListener('click', (e) => {
  //   // console.log(e.target.className);
  //   if (e.target.closest('.addToCartBtn')) {
  //     console.log(e.target.closest('.addToCartBtn').dataset.id);
  //     return;
  //   }
  // });

  // The below one doesnot work
  // btn = document.querySelector('.btn');
});
