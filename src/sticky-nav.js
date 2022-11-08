import { getElement } from './utils.js';

const nav = getElement('.navbar');
const navbarHeight = nav.getBoundingClientRect().height;

window.addEventListener('scroll', (e) => {
  const distanceScrolledFromTop = e.currentTarget.scrollY;
  // console.log(distanceScrolledFromTop, navbarHeight);
  if (distanceScrolledFromTop > navbarHeight) {
    // console.log('entered');
    nav.classList.add('nav-sticky');
    return;
  }
  nav.classList.remove('nav-sticky');
});
