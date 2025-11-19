// js/produtos.js

document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.getElementById('category-filter');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const searchInput = document.getElementById('catalog-search');
    const produtosList = document.getElementById('produtos-list');
    const produtos = produtosList ? produtosList.querySelectorAll('.produto') : [];
    const noResultsMessage = document.getElementById('no-results');

    // Função principal de filtragem
    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        const maxPrice = parseFloat(priceRange.value);
        const searchTerm = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        produtos.forEach(produto => {
            const productCategory = produto.getAttribute('data-category');
            const productPrice = parseFloat(produto.getAttribute('data-price'));
            const productName = produto.querySelector('p').textContent.toLowerCase();

            // 1. Filtrar por Categoria
            const matchesCategory = selectedCategory === 'all' || productCategory.includes(selectedCategory);

            // 2. Filtrar por Preço
            const matchesPrice = productPrice <= maxPrice;
            
            // 3. Filtrar por Busca (Nome)
            const matchesSearch = productName.includes(searchTerm);

            if (matchesCategory && matchesPrice && matchesSearch) {
                produto.style.display = 'block';
                visibleCount++;
            } else {
                produto.style.display = 'none';
            }
        });

        // Exibir mensagem de 'Nenhum resultado'
        if (noResultsMessage) {
            noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // Listener para o filtro de preço (range)
    priceRange.addEventListener('input', () => {
        const price = priceRange.value;
        priceValue.textContent = `R$${price}`;
        filterProducts();
    });

    // Listener para o filtro de categoria (select)
    categoryFilter.addEventListener('change', filterProducts);
    
    // Listener para o campo de busca (input)
    searchInput.addEventListener('input', filterProducts);
    
    // Inicializa o filtro no carregamento
    filterProducts();
    
    // Adiciona a interatividade de clique/adicionar ao carrinho, similar ao index.js
    produtos.forEach(produto => {
        // Simulação de Adicionar ao Carrinho
        const cartButton = produto.querySelector('.add-to-cart');
        if (cartButton) {
            cartButton.addEventListener('click', (event) => {
                const nomeProduto = produto.querySelector('p').textContent;
                console.log(`Produto ${nomeProduto} adicionado ao carrinho.`);
                alert(`"${nomeProduto}" foi adicionado ao seu carrinho!`);
                event.stopPropagation(); 
            });
        }
        
        // Interatividade de clique (navegação)
        produto.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-to-cart')) {
                return;
            }
            const nomeProduto = produto.querySelector('p').textContent;
            alert(`Você está sendo redirecionado para a página de detalhes do produto: ${nomeProduto}`);
        });
    });
});