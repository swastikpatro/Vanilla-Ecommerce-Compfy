import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

import { getElement, allProductsUrl } from '../utils.js';
import {
  displayProducts,
  fetchProducts,
  skeletonLoad,
} from '../displayProducts.js';

const productsContainer = getElement('.products-container');
const companiesDOM = getElement('.products .companies');
const searchBar = getElement('.search-input');
const rangeInput = getElement('.price-filter');
const priceValue = getElement('.price-value span');
const MAX_PRICE_VALUE = 80;
let currActive;

function getCompanies(data) {
  return ['all', ...new Set(data.map(({ fields: { company } }) => company))];
}

function removeActiveCompanyBtn() {
  currActive = document.querySelector('.active-company-btn');
  if (!!currActive) {
    currActive.classList.remove('active-company-btn');
  }
}

async function fetchAllDataAndDisplay() {
  const allProducts = await fetchProducts(allProductsUrl, productsContainer);
  productsContainer.innerHTML = displayProducts(allProducts);
}

async function setActiveToAllAndDisplayAll() {
  removeActiveCompanyBtn();
  getElement('.companies').firstElementChild.classList.add(
    'active-company-btn'
  );

  fetchAllDataAndDisplay();
}

function displayCompanies(data) {
  const myCompanies = getCompanies(data);
  companiesDOM.innerHTML = myCompanies
    .map(
      (singleCompany) =>
        `<button class="company-btn ${
          singleCompany === 'all' ? 'active-company-btn' : ''
        }" data-btn="${singleCompany}">${singleCompany}</button>`
    )
    .join('');
}

async function init() {
  productsContainer.innerHTML = skeletonLoad(12);

  const allProductData = await fetchProducts(allProductsUrl, productsContainer);

  // console.log(allProductData);

  if (allProductData === undefined) {
    return;
  }

  productsContainer.innerHTML = displayProducts(allProductData);
  displayCompanies(allProductData);

  return allProductData;
}

function debounce(func, delay) {
  let timeoutID;

  return function (...args) {
    if (!!timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function filterProducts(data) {
  return function (prop, val) {
    return [
      ...data.filter((singleData) => {
        // console.log(
        //   singleData.fields[prop],
        //   val.toLowerCase(),
        //   singleData.fields[prop].includes(val.toLowerCase())
        // );
        return singleData.fields[prop].includes(val.toLowerCase());
      }),
    ];
  };
}

async function handleSearch(e) {
  // console.log(e.target.value);

  const allProducts = await fetchProducts(allProductsUrl, productsContainer);

  const filteredProductsOnSearch = filterProducts(allProducts)(
    'name',
    e.target.value
  );

  if (e.target.value === '') {
    setActiveToAllAndDisplayAll();
  } else {
    removeActiveCompanyBtn();
  }

  if (filteredProductsOnSearch.length > 0) {
    productsContainer.innerHTML = displayProducts(filteredProductsOnSearch);
  } else if (filteredProductsOnSearch.length === 0) {
    productsContainer.innerHTML = `<div class="filter-error">No Match found for "${e.target.value}"</div>`;
  }
}

async function handleCompanyBtnsClick(e) {
  if (!e.target.classList.contains('company-btn')) {
    return;
  }

  // debugger;
  searchBar.value = '';
  removeActiveCompanyBtn();
  setPriceValue(MAX_PRICE_VALUE);
  const btnClickedEle = e.target;
  btnClickedEle.classList.add('active-company-btn');
  const btnClickedName = btnClickedEle.dataset.btn;
  const allProducts = await fetchProducts(allProductsUrl, productsContainer);
  if (btnClickedName === 'all') {
    productsContainer.innerHTML = displayProducts(allProducts);
    return;
  }

  const filteredProductsOnCompanyClick = filterProducts(allProducts)(
    'company',
    btnClickedName
  );

  productsContainer.innerHTML = displayProducts(filteredProductsOnCompanyClick);
}

function setPriceValue(val) {
  rangeInput.value = val;
  priceValue.innerText = '$' + val;
}

async function handlePriceFilter(e) {
  removeActiveCompanyBtn();
  searchBar.value = '';
  const price = e.target.valueAsNumber;
  setPriceValue(price);
  const allProducts = await fetchProducts(allProductsUrl, productsContainer);

  const filteredProductsOnPrice = allProducts.filter((single) => {
    const singlePrice = single.fields.price / 100;
    return singlePrice <= price;
  });

  if (filteredProductsOnPrice.length > 0) {
    productsContainer.innerHTML = displayProducts(filteredProductsOnPrice);
  } else if (filteredProductsOnPrice.length === 0) {
    productsContainer.innerHTML = `<div class="filter-error">No Match found for "$${e.target.value}"</div>`;
  }
}

window.addEventListener('DOMContentLoaded', init);

searchBar.addEventListener(
  'input',
  debounce((e) => {
    handleSearch(e);
  }, 500)
);

searchBar.addEventListener('click', async () => {
  setPriceValue(MAX_PRICE_VALUE);
  if (!searchBar.value) {
    removeActiveCompanyBtn();
    fetchAllDataAndDisplay();
    return;
  }
});

rangeInput.addEventListener('change', handlePriceFilter);

companiesDOM.addEventListener('click', handleCompanyBtnsClick);
