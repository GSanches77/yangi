document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('account-form');
    const telefoneInput = document.getElementById('telefone');
    const cpfInput = document.getElementById('cpf');
    const emailInput = document.getElementById('email');

    function applyMask(input, mask) {
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
                    if (value.length > 10) {
                        maskedValue += value.substring(2, 7) + (value.length > 7 ? '-' : '');
                        if (value.length > 7) maskedValue += value.substring(7, 11);
                    } else {
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
        errorMessage.textContent = '';
        input.classList.remove('error');

        if (input.validity.valueMissing) {
            errorMessage.textContent = 'Este campo é obrigatório.';
            input.classList.add('error');
            return false;
        }

        if (input.id === 'email' && !input.validity.valid) {
            errorMessage.textContent = 'Por favor, insira um e-mail válido.';
            input.classList.add('error');
            return false;
        }

        if (input.id === 'cpf' && input.value.replace(/\D/g, '').length !== 11) {
            errorMessage.textContent = 'CPF inválido (necessita de 11 dígitos).';
            input.classList.add('error');
            return false;
        }

        if (input.id === 'telefone' && input.value.replace(/\D/g, '').length < 10) {
            errorMessage.textContent = 'Telefone inválido (mínimo 10 dígitos com DDD).';
            input.classList.add('error');
            return false;
        }

        return true;
    }

    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        let formIsValid = true;

        form.querySelectorAll('input').forEach(input => {
            if (!validateField(input)) {
                formIsValid = false;
            }
        });

        if (formIsValid) {
            alert('Formulário enviado com sucesso! Simulando criação de conta/login.');
            console.log('Dados submetidos:', Object.fromEntries(new FormData(form)));
            form.reset();
        } else {
            alert('Por favor, corrija os erros no formulário antes de prosseguir.');
        }
    });
});
