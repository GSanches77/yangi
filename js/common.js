// js/common.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuração do Menu Responsivo (Hamburguer)
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            
            // Alterna a classe 'active' para mostrar/esconder o menu via CSS
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');

            // Atualiza o atributo de acessibilidade
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // 2. Animação de Aparecer ao Rolar (Scroll Animation)
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // Observa a viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% do item precisa estar visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se o elemento estiver visível, adiciona a classe de animação
                entry.target.classList.add('is-visible');
                // Para de observar depois de animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa todos os elementos com a classe .fade-in-section
    fadeInSections.forEach(section => {
        observer.observe(section);
    });

    // 3. Simulação de Busca Global (do Header)
    const globalSearchForm = document.querySelector('header .search-form');
    if (globalSearchForm) {
        globalSearchForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const searchInput = globalSearchForm.querySelector('input[type="text"]');
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                // Em um projeto real, você redirecionaria para a página de resultados
                alert(`Buscando em todo o site por: "${searchTerm}".`);
                searchInput.value = ''; // Limpa o campo
            } else {
                alert('Por favor, insira um termo para buscar.');
            }
        });
    }
});