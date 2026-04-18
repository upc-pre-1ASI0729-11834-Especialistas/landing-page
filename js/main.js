const navbar = document.querySelector('.navbar');
const toggle = document.getElementById('navbarToggle');
const icon = toggle.querySelector('.material-symbols-outlined');

toggle.addEventListener('click', () => {
  navbar.classList.toggle('is-active');
  icon.textContent = navbar.classList.contains('is-active') ? 'close' : 'menu';
});
