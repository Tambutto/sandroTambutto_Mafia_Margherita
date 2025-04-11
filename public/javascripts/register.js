const validateNameOrLastname = (input) => {
    const errorMessage = input.nextElementSibling; // Selecciona el <small> siguiente al input

    if (input.value.trim() === "") {
        // Caso: Campo vacío
        errorMessage.textContent = ""; // Limpia el mensaje de error
        input.classList.remove('invalid'); // Limpia el estilo de error
    } else if (input.value.trim().length < 2) {
        // Caso: Longitud insuficiente
        errorMessage.textContent = "Debe tener al menos 2 caracteres."; // Mensaje de error
        input.classList.add('invalid'); // Aplica estilo al campo con error
    } else {
        // Caso: Campo válido
        errorMessage.textContent = ""; // Limpia el mensaje de error
        input.classList.remove('invalid'); // Limpia el estilo de error
    }
};

document.getElementById('nombre').addEventListener('input', (e) => validateNameOrLastname(e.target));
document.getElementById('apellido').addEventListener('input', (e) => validateNameOrLastname(e.target));



const validateEmailFormat = (input) => {
    const errorMessage = input.nextElementSibling; // Selecciona el <small> después del input
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar formato de email

    if (input.value.trim() === "") {
        // Caso: Campo vacío
        errorMessage.textContent = ""; // Limpia el mensaje de error
        input.classList.remove('invalid'); // Limpia el estilo de error
    } else if (!emailRegex.test(input.value.trim())) {
        // Caso: Formato inválido
        errorMessage.textContent = "Debe ser un formato de correo válido."; // Mensaje de error
        input.classList.add('invalid'); // Aplica estilo al campo con error
    } else {
        // Caso: Email válido
        errorMessage.textContent = ""; // Limpia el mensaje de error
        input.classList.remove('invalid'); // Limpia el estilo de error
    }
};

document.getElementById('email').addEventListener('input', (e) => validateEmailFormat(e.target));



const validatePassword = (input) => {
    const errorMessage = input.nextElementSibling; // Selecciona el <small> después del input
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/; // Regla de validación de contraseña

    if (input.value.trim() === "") {
        // Caso: Campo vacío
        errorMessage.textContent = ""; // Limpia el mensaje de error
        input.classList.remove('invalid'); // Limpia el estilo de error
    } else if (!passwordRegex.test(input.value.trim())) {
        // Caso: Contraseña inválida
        errorMessage.textContent = "Debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, un número y un carácter especial.";
        input.classList.add('invalid'); // Aplica estilo al campo con error
    } else {
        // Caso: Contraseña válida
        errorMessage.textContent = ""; // Limpia el mensaje de error
        input.classList.remove('invalid'); // Limpia el estilo de error
    }
};

document.getElementById('password').addEventListener('input', (e) => validatePassword(e.target));


const validatePasswordMatch = (passwordInput, confirmPasswordInput) => {
    const errorMessage = confirmPasswordInput.nextElementSibling; // Selecciona el <small> siguiente al input

    if (confirmPasswordInput.value.trim() === "") {
        // Caso: Campo vacío
        errorMessage.textContent = ""; // Limpia el mensaje de error
        confirmPasswordInput.classList.remove('invalid'); // Limpia el estilo de error
    } else if (passwordInput.value !== confirmPasswordInput.value) {
        // Caso: Contraseñas no coinciden
        errorMessage.textContent = "Las contraseñas no coinciden.";
        confirmPasswordInput.classList.add('invalid'); // Aplica estilo al campo con error
    } else {
        // Caso: Contraseñas coinciden
        errorMessage.textContent = ""; // Limpia el mensaje de error
        confirmPasswordInput.classList.remove('invalid'); // Limpia el estilo de error
    }
};

const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm_password');

confirmPasswordInput.addEventListener('input', () => validatePasswordMatch(passwordInput, confirmPasswordInput));

// Cambia el icono del ojo para visualizar la contraseña

const togglePassword = document.getElementById('togglePassword');
const passwordEye = document.getElementById('password'); // Input de contraseña

togglePassword.addEventListener('click', () => {
    // Alterna el tipo del input entre 'password' y 'text'
    const isPassword = passwordEye.getAttribute('type') === 'password';
    passwordEye.setAttribute('type', isPassword ? 'text' : 'password'); // Cambia el tipo del input

    // Cambia la clase del ícono directamente
    togglePassword.classList.toggle('fa-eye-slash'); // Alterna clase de ojo abierto
    togglePassword.classList.toggle('fa-eye'); // Alterna clase de ojo cerrado
});


// Cambia el icono del ojo para visualizar la contraseña

const togglePasswor2 = document.getElementById('togglePassword2');
const passwordEye2 = document.getElementById('confirm_password'); // Input de contraseña

togglePassword2.addEventListener('click', () => {
    // Alterna el tipo del input entre 'password' y 'text'
    const isPassword = passwordEye2.getAttribute('type') === 'password';
    passwordEye2.setAttribute('type', isPassword ? 'text' : 'password'); // Cambia el tipo del input

    // Cambia la clase del ícono directamente
    togglePassword2.classList.toggle('fa-eye-slash'); // Alterna clase de ojo abierto
    togglePassword2.classList.toggle('fa-eye'); // Alterna clase de ojo cerrado
});




const validateImage = (input) => {
    const errorMessage = input.nextElementSibling; // Selecciona el <small> después del input
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; // Extensiones válidas

    if (input.value.trim() === "") {
        // Caso: Campo vacío
        errorMessage.textContent = ""; // Limpia el mensaje de error
        input.classList.remove('invalid'); // Limpia el estilo de error
    } else if (!allowedExtensions.test(input.value.trim())) {
        // Caso: Formato de archivo inválido
        errorMessage.textContent = "Solo se permiten archivos JPG, JPEG, PNG o GIF.";
        input.classList.add('invalid'); // Aplica estilo al campo con error
    } else {
        // Caso: Archivo válido
        errorMessage.textContent = ""; // Limpia el mensaje de error
        input.classList.remove('invalid'); // Limpia el estilo de error
    }
};

// Agregar evento al input de imagen
document.getElementById('image').addEventListener('change', (e) => validateImage(e.target));

