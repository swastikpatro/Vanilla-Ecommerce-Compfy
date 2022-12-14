import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
import '../sticky-nav.js';

import { allProductsUrl, debounce, getElement } from '../utils.js';
import { displayProducts, fetchProducts } from '../displayProducts.js';
import { store } from '../store.js';

const productsContainer = getElement('.products-container');
const companiesDOM = getElement('.products .companies');
const searchBar = getElement('.search-input');
const rangeInput = getElement('.price-filter');
const priceValue = getElement('.price-value span');

const getCompanies = (data) => {
  return ['all', ...new Set(data.map(({ company }) => company))];
};

const removeActiveCompanyBtn = () => {
  const currActive = document.querySelector('.active-company-btn');
  if (!!currActive) {
    currActive.classList.remove('active-company-btn');
  }
};

const setActiveToAllAndDisplayAll = () => {
  removeActiveCompanyBtn();
  getElement('.companies').firstElementChild.classList.add(
    'active-company-btn'
  );

  displayProducts(store, productsContainer, false);
};

const displayError = (errorMsg) => {
  productsContainer.innerHTML = `
  <div class="filter-error">
    ${errorMsg}  
  </div>
  `;
};

const filterOnSearchAndPriceThenDisplay = (searchValue, sliderValue) => {
  const filteredProducts = store.filter((singleData) => {
    const singlePrice = singleData.price / 100;
    return (
      singlePrice <= sliderValue &&
      singleData.name.includes(searchValue.trim().toLowerCase())
    );
  });

  if (filteredProducts.length > 0) {
    displayProducts(filteredProducts, productsContainer, false);
  } else {
    displayError(
      `${
        searchValue === ''
          ? `No Products found Under $${sliderValue}`
          : `No Match found for "${searchValue} under $${sliderValue}"`
      }`
    );
  }
};

const getMaxPrice = (data) => {
  const pricesArr = data.map((singleData) => singleData.price);
  const maxPrice = Math.max(...pricesArr) / 100;
  return Math.ceil(maxPrice);
};

const setPriceValue = (val) => {
  rangeInput.value = val;
  priceValue.innerText = '$' + val;
};

const displayPrice = (data) => {
  const maxValue = getMaxPrice(data);
  setPriceValue(maxValue);
};

const displayCompanies = (data) => {
  const myCompanies = getCompanies(data);
  companiesDOM.innerHTML = myCompanies
    .map(
      (singleCompany) =>
        `<button class="company-btn ${
          singleCompany === 'all' ? 'active-company-btn' : ''
        }" data-btn="${singleCompany}">${singleCompany}</button>`
    )
    .join('');
};

const handlePriceFilter = (e) => {
  removeActiveCompanyBtn();

  const price = e.target.valueAsNumber;

  setPriceValue(price);

  filterOnSearchAndPriceThenDisplay(searchBar.value, price);
};

const handleCompanyBtnsClick = (e) => {
  if (!e.target.classList.contains('company-btn')) {
    return;
  }

  searchBar.value = '';

  removeActiveCompanyBtn();

  setPriceValue(getMaxPrice(store));

  const btnClickedEle = e.target;

  btnClickedEle.classList.add('active-company-btn');

  const btnClickedName = btnClickedEle.dataset.btn;

  if (btnClickedName === 'all') {
    displayProducts(store, productsContainer, false);
    return;
  }

  const filteredProductsOnCompanyClick = store.filter((single) => {
    return single.company === btnClickedName.toLowerCase();
  });

  displayProducts(filteredProductsOnCompanyClick, productsContainer, false);
};

const handleSearch = (e) => {
  // console.log(e.target.value);

  if (e.target.value === '') {
    setActiveToAllAndDisplayAll();
  } else {
    removeActiveCompanyBtn();
  }

  filterOnSearchAndPriceThenDisplay(e.target.value, rangeInput.valueAsNumber);
};

const init = async () => {
  if (store.length < 1) {
    const allData = fetchProducts(allProductsUrl, productsContainer);
    displayProducts(allData, productsContainer, true);
  } else {
    displayProducts(store, productsContainer, true);
  }

  displayCompanies(store);
  displayPrice(store);
};

window.addEventListener('DOMContentLoaded', init);

searchBar.addEventListener(
  'keyup',
  debounce((e) => {
    handleSearch(e);
  }, 500)
);

searchBar.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    filterOnSearchAndPriceThenDisplay(
      searchBar.value,
      rangeInput.valueAsNumber
    );
  }
});

searchBar.addEventListener('click', () => {
  // setPriceValue(MAX_PRICE_VALUE);
  if (!searchBar.value) {
    removeActiveCompanyBtn();

    displayProducts(store, productsContainer, false);
  }
});

rangeInput.addEventListener('input', handlePriceFilter);

companiesDOM.addEventListener('click', handleCompanyBtnsClick);
