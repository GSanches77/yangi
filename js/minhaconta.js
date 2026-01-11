document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('account-form');
    if (!form) return; // Segurança: só executa se o formulário existir na página

    const telefoneInput = document.getElementById('telefone');
    const cpfInput = document.getElementById('cpf');

    function applyMask(input, mask) {
        if (!input) return;
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            let maskedValue = '';

            if (mask === 'cpf') {
                if (value.length > 0) maskedValue += value.substring(0, 3) + (value.length > 3 ? '.' : '');
                if (value.length > 3) maskedValue += value.substring(3, 6) + (value.length > 6 ? '.' : '');
                if (value.length > 6) maskedValue += value.substring(6, 9) + (value.length > 9 ? '-' : '');
                if (value.length > 9) maskedValue += value.substring(9, 11);
                e.target.value = maskedValue;
            } else if (mask === 'tel') {
                if (value.length > 0) maskedValue += '(' + value.substring(0, 2) + (value.length > 2 ? ') ' : '');
                if (value.length > 2) {
                    if (value.length > 10) { // Celular com 9 dígitos
                        maskedValue += value.substring(2, 7) + (value.length > 7 ? '-' : '');
                        if (value.length > 7) maskedValue += value.substring(7, 11);
                    } else { // Fixo com 8 dígitos
                        maskedValue += value.substring(2, 6) + (value.length > 6 ? '-' : '');
                        if (value.length > 6) maskedValue += value.substring(6, 10);
                    }
                }
                e.target.value = maskedValue;
            }
        });
    }

    applyMask(telefoneInput, 'tel');
    applyMask(cpfInput, 'cpf');

    function validateField(input) {
        const errorMessage = document.getElementById(`error-${input.id}`);
        if (errorMessage) errorMessage.textContent = '';
        input.classList.remove('error');

        // Validação básica de campo vazio
        if (input.validity.valueMissing) {
            if (errorMessage) errorMessage.textContent = 'Este campo é obrigatório.';
            input.classList.add('error');
            return false;
        }

        // Validação de E-mail
        if (input.id === 'email' && !input.validity.valid) {
            if (errorMessage) errorMessage.textContent = 'Insira um e-mail válido.';
            input.classList.add('error');
            return false;
        }

        // Validação de CPF (tamanho)
        if (input.id === 'cpf' && input.value.replace(/\D/g, '').length !== 11) {
            if (errorMessage) errorMessage.textContent = 'O CPF deve ter 11 dígitos.';
            input.classList.add('error');
            return false;
        }

        // Validação de Telefone (tamanho)
        if (input.id === 'telefone' && input.value.replace(/\D/g, '').length < 10) {
            if (errorMessage) errorMessage.textContent = 'Telefone incompleto.';
            input.classList.add('error');
            return false;
        }

        return true;
    }

    // Valida ao sair do campo
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        // Remove o erro enquanto o usuário digita para melhorar a experiência
        input.addEventListener('input', () => {
            input.classList.remove('error');
            const err = document.getElementById(`error-${input.id}`);
            if (err) err.textContent = '';
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let formIsValid = true;

        form.querySelectorAll('input').forEach(input => {
            if (!validateField(input)) formIsValid = false;
        });

        if (formIsValid) {
            // Efeito visual de carregamento no botão (opcional)
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'PROCESSANDO...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Conta Yangi acessada com sucesso!');
                console.log('Dados:', Object.fromEntries(new FormData(form)));
                btn.textContent = originalText;
                btn.disabled = false;
                // form.reset(); // Opcional
            }, 1500);
        }
    });
});