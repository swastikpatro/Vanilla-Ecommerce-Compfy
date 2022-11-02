import { getElement } from './utils.js';

const toggleBtn = getElement('.toggle-nav');
const sidebarOverlay = getElement('.sidebar-overlay');
const sidebarCloseBtn = getElement('.sidebar-close');

toggleBtn.addEventListener('click', () => {
  sidebarOverlay.classList.add('show-sidebar');
  document.body.classList.add('overlay-active');
});

sidebarCloseBtn.addEventListener('click', () => {
  sidebarOverlay.classList.remove('show-sidebar');
  document.body.classList.remove('overlay-active');
});
