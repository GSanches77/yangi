document.addEventListener('DOMContentLoaded', () => {
    const produtos = document.querySelectorAll('#destaques .produto');

    produtos.forEach(produto => {
        produto.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-to-cart')) {
                return;
            }
            const nomeProduto = produto.getAttribute('data-nome');
            alert(`Você está sendo redirecionado para a página de detalhes do produto: ${nomeProduto}`);
        });
        
        const cartButton = produto.querySelector('.add-to-cart');
        if (cartButton) {
            cartButton.addEventListener('click', (event) => {
                const nomeProduto = produto.getAttribute('data-nome');
                console.log(`Produto ${nomeProduto} adicionado ao carrinho.`);
                alert(`"${nomeProduto}" foi adicionado ao seu carrinho!`);
                event.stopPropagation();
            });
        }
    });

    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.style.transform = 'scale(1.05)';
            ctaButton.style.backgroundColor = '#333';
        });
        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = 'scale(1)';
            ctaButton.style.backgroundColor = '#000';
        });
    }
});
