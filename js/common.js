document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;

            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');

            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => {
        observer.observe(section);
    });

    const globalSearchForm = document.querySelector('header .search-form');
    if (globalSearchForm) {
        globalSearchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchInput = globalSearchForm.querySelector('input[type="text"]');
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                alert(`Buscando em todo o site por: "${searchTerm}".`);
                searchInput.value = '';
            } else {
                alert('Por favor, insira um termo para buscar.');
            }
        });
    }
});
