import { formatPrice, setStorageItem } from '../utils.js';

function getSum(arr) {
  return arr.reduce((acc, curr) => {
    acc += curr.count;
    return acc;
  }, 0);
}

function getTotalAmount(arr) {
  return arr.reduce((acc, curr) => {
    acc += curr.count * curr.price;
    return acc;
  }, 0);
}

const addToCartDOM = (cartProducts, container, navCart, totalAmountEle) => {
  container.innerHTML = cartProducts
    .map((singleProduct) => {
      const { id, name, price, img, count } = singleProduct;
      // console.log(count);
      return count > 0
        ? `
    <article class="cart-item" data-id="${id}" >
      <img src="${img}" alt="${name}" class="cart-img" />
  
      <div class="cart-info">
        <h4>${name}</h4>
        <p>${formatPrice(price)}</p>
        <button class="remove-btn" data-btn>
          remove
        </button>
      </div>
  
      <div class="counter">
        <button class="count-btn increment-count" data-btn>
          +
        </button>
        <span class="cart-count">${count}</span>
        <button class="count-btn decrement-count" data-btn>
          -
        </button>
      </div>
    </article>
    `
        : '';
    })
    .join('');

  const totalCount = getSum(cartProducts);
  const totalAmount = getTotalAmount(cartProducts);

  // console.log(totalCount);
  // console.log(totalAmount);
  navCart.innerText = totalCount;
  totalAmountEle.innerText = `Total : ${formatPrice(totalAmount)}`;
  setStorageItem('cartAndOthers', {
    myCart: cartProducts,
    totalCountAndAmount: [totalCount, totalAmount],
  });

  return container;
};

export { addToCartDOM };
