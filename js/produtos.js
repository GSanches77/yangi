document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.getElementById('category-filter');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const searchInput = document.getElementById('catalog-search');
    const produtosList = document.getElementById('produtos-list');
    const produtos = produtosList ? produtosList.querySelectorAll('.produto') : [];
    const noResultsMessage = document.getElementById('no-results');

    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        const maxPrice = parseFloat(priceRange.value);
        const searchTerm = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        produtos.forEach(produto => {
            const productCategory = produto.getAttribute('data-category');
            const productPrice = parseFloat(produto.getAttribute('data-price'));
            const productName = produto.querySelector('p').textContent.toLowerCase();

            const matchesCategory = selectedCategory === 'all' || productCategory.includes(selectedCategory);
            const matchesPrice = productPrice <= maxPrice;
            const matchesSearch = productName.includes(searchTerm);

            if (matchesCategory && matchesPrice && matchesSearch) {
                produto.style.display = 'block';
                visibleCount++;
            } else {
                produto.style.display = 'none';
            }
        });

        if (noResultsMessage) {
            noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    priceRange.addEventListener('input', () => {
        const price = priceRange.value;
        priceValue.textContent = `R$${price}`;
        filterProducts();
    });

    categoryFilter.addEventListener('change', filterProducts);
    searchInput.addEventListener('input', filterProducts);
    filterProducts();

    produtos.forEach(produto => {
        const cartButton = produto.querySelector('.add-to-cart');
        if (cartButton) {
            cartButton.addEventListener('click', (event) => {
                const nomeProduto = produto.querySelector('p').textContent;
                console.log(`Produto ${nomeProduto} adicionado ao carrinho.`);
                alert(`"${nomeProduto}" foi adicionado ao seu carrinho!`);
                event.stopPropagation();
            });
        }

        produto.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-to-cart')) {
                return;
            }
            const nomeProduto = produto.querySelector('p').textContent;
            alert(`Você está sendo redirecionado para a página de detalhes do produto: ${nomeProduto}`);
        });
    });
});
