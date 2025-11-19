// js/index.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Interatividade de clique nos produtos
    const produtos = document.querySelectorAll('#destaques .produto');

    produtos.forEach(produto => {
        // Ao clicar no card (simula navegação)
        produto.addEventListener('click', (event) => {
            // Evita disparar ao clicar no botão "Adicionar ao Carrinho"
            if (event.target.classList.contains('add-to-cart')) {
                return;
            }
            const nomeProduto = produto.getAttribute('data-nome');
            alert(`Você está sendo redirecionado para a página de detalhes do produto: ${nomeProduto}`);
            // Exemplo de redirecionamento real: window.location.href = `detalhes.html?id=${produto.dataset.id}`;
        });
        
        // Simulação de Adicionar ao Carrinho
        const cartButton = produto.querySelector('.add-to-cart');
        if (cartButton) {
            cartButton.addEventListener('click', (event) => {
                const nomeProduto = produto.getAttribute('data-nome');
                console.log(`Produto ${nomeProduto} adicionado ao carrinho.`);
                alert(`"${nomeProduto}" foi adicionado ao seu carrinho!`);
                event.stopPropagation(); // Previne que o clique dispare o evento do produto pai (navegação)
            });
        }
    });

    // 2. Animação do botão CTA
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