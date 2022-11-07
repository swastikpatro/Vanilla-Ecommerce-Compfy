import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

window.addEventListener('scroll', (e) => {
  getElement('.alert').style.top = e.currentTarget.scrollY + 10 + 'px';
});
