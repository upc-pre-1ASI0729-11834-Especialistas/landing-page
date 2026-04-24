const navbar = document.querySelector('.navbar');
const toggle = document.getElementById('navbarToggle');
const icon = toggle.querySelector('.material-symbols-outlined');

toggle.addEventListener('click', () => {
  navbar.classList.toggle('is-active');
  icon.textContent = navbar.classList.contains('is-active') ? 'close' : 'menu';
});

// Hero Carousel
(function () {
  const track = document.querySelector('.hero__carousel-track');
  const slides = document.querySelectorAll('.hero__carousel-slide');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track || slides.length === 0) return;

  let current = 0;
  let interval;
  const DELAY = 2000;

  // Create dots dynamically based on slide count
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('hero__carousel-dot');
    dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      goTo(i);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.hero__carousel-dot');

  function updateTransform() {
    track.style.transform = `translateX(-${slides[current].offsetLeft}px)`;
  }

  function goTo(index) {
    current = index;
    updateTransform();
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
  }

  function next() { goTo((current + 1) % slides.length); }
  function prev() { goTo((current - 1 + slides.length) % slides.length); }

  // Mantain alignment on window resize
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    updateTransform();
    setTimeout(() => {
      track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }, 50);
  });

  // Handle click on the carousel track to go next/prev
  track.addEventListener('click', (e) => {
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX > rect.width / 2) next();
    else prev();
  });

  // Pause on hover for interactivity
  const carousel = document.getElementById('heroCarousel');
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  function startAutoPlay() { interval = setInterval(next, DELAY); }
  function stopAutoPlay() { clearInterval(interval); }

  startAutoPlay();
})();
