const validateEmailLogin = (input) => {
    const errorMessage = document.getElementById('emailError'); // Selecciona el div para mensajes de error
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar formato de email

    if (input.value.trim() === "") {
        // Caso: Campo vacío
        errorMessage.textContent = "El campo de email es obligatorio."; // Mensaje de error
        errorMessage.style.display = "block"; // Muestra el mensaje
        input.classList.add('invalid'); // Aplica estilo al input con error
    } else if (!emailRegex.test(input.value.trim())) {
        // Caso: Email con formato inválido
        errorMessage.textContent = "Debe ser un formato de correo válido.";
        errorMessage.style.display = "block"; // Muestra el mensaje
        input.classList.add('invalid');
    } else {
        // Caso: Email válido
        errorMessage.textContent = ""; // Limpia el mensaje de error
        errorMessage.style.display = "none"; // Oculta el mensaje
        input.classList.remove('invalid'); // Limpia el estilo de error
    }
};

// Selecciona el input de email y agrega el evento
const emailInput = document.getElementById('email');
emailInput.addEventListener('input', (e) => validateEmailLogin(e.target));


const validatePasswordLogin = (input) => {
    const errorMessage = document.getElementById('passwordError'); // Selecciona el div para mensajes de error
    const minLength = 10; // Longitud mínima para la contraseña

    if (input.value.trim() === "") {
        // Caso: Campo vacío
        errorMessage.textContent = "El campo de contraseña es obligatorio.";
        errorMessage.style.display = "block"; // Muestra el mensaje
        input.classList.add('invalid'); // Aplica estilo al input con error
    } else if (input.value.trim().length < minLength) {
        // Caso: Contraseña demasiado corta
        errorMessage.textContent = `La contraseña debe tener al menos ${minLength} caracteres.`;
        errorMessage.style.display = "block"; // Muestra el mensaje
        input.classList.add('invalid');
    } else {
        // Caso: Contraseña válida
        errorMessage.textContent = ""; // Limpia el mensaje de error
        errorMessage.style.display = "none"; // Oculta el mensaje de error
        input.classList.remove('invalid'); // Limpia el estilo de error
    }
};

// Selecciona el input de contraseña y agrega el evento
const passwordInput = document.getElementById('password');
passwordInput.addEventListener('input', (e) => validatePasswordLogin(e.target));

// Validación al enviar el formulario
const loginForm = document.getElementById('loginForm'); // Asegúrate de que tu formulario tenga este ID
loginForm.addEventListener('submit', (e) => {
    validatePasswordLogin(passwordInput); // Valida antes de enviar

    if (passwordInput.classList.contains('invalid')) {
        e.preventDefault(); // Detiene el envío del formulario si hay errores
        alert("Por favor, corrige los errores en la contraseña.");
    }
});
