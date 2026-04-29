document.addEventListener('DOMContentLoaded', function() {
  // Theme switcher
  const body = document.body;
  const themeBtn = document.querySelector('.theme-btn');
  const menuBtn = document.querySelector('.menu-btn');
  const links = document.querySelector('.links');
  
  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Theme switcher functionality
  if (themeBtn) {
    if (localStorage.getItem('mode') === 'light') {
      body.classList.add('light');
      themeBtn.textContent = 'Light';
    }
    
    themeBtn.addEventListener('click', () => {
      body.classList.toggle('light');
      const isLight = body.classList.contains('light');
      localStorage.setItem('mode', isLight ? 'light' : 'dark');
      themeBtn.textContent = isLight ? 'Light' : 'Dark';
    });
  }
  
  // Mobile menu toggle
  if (menuBtn && links) {
    menuBtn.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn')) {
      const dropdowns = document.querySelectorAll('.dropdown-content');
      dropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
      });
    }
  });
  
  // Scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.show');
    elements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < window.innerHeight - 100) {
        el.classList.add('done');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
});