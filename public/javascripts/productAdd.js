// Validar Nombre
const validateName = (input) => {
    const errorMessage = document.getElementById('nameError');
    if (input.value.trim() === "") {
        errorMessage.textContent = "El campo 'Nombre' es obligatorio.";
        errorMessage.style.display = "block";
        input.classList.add('invalid');
    } else if (input.value.trim().length < 5) {
        errorMessage.textContent = "El nombre debe tener al menos 5 caracteres.";
        errorMessage.style.display = "block";
        input.classList.add('invalid');
    } else {
        errorMessage.textContent = "";
        errorMessage.style.display = "none";
        input.classList.remove('invalid');
    }
};

// Validar Descripción
const validateDescription = (input) => {
    const errorMessage = document.getElementById('descriptionError');
    if (input.value.trim().length < 20) {
        errorMessage.textContent = "La descripción debe tener al menos 20 caracteres.";
        errorMessage.style.display = "block";
        input.classList.add('invalid');
    } else {
        errorMessage.textContent = "";
        errorMessage.style.display = "none";
        input.classList.remove('invalid');
    }
};

// Validar Imagen
const validateImage = (input) => {
    const errorMessage = document.getElementById('imageError');
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (!allowedExtensions.test(input.value.trim())) {
        errorMessage.textContent = "Debe ser un archivo válido (JPG, JPEG, PNG, GIF).";
        errorMessage.style.display = "block";
        input.classList.add('invalid');
    } else {
        errorMessage.textContent = "";
        errorMessage.style.display = "none";
        input.classList.remove('invalid');
    }
};

// Asignar Eventos
const nameInput = document.getElementById('nombre');
const descriptionInput = document.getElementById('descripcion');
const imageInput = document.getElementById('imagen');

nameInput.addEventListener('input', () => validateName(nameInput));
descriptionInput.addEventListener('input', () => validateDescription(descriptionInput));
imageInput.addEventListener('change', () => validateImage(imageInput));

// Validación al enviar el formulario
const productForm = document.querySelector('.form__productAdd');
productForm.addEventListener('submit', (e) => {
    validateName(nameInput);
    validateDescription(descriptionInput);
    validateImage(imageInput);

    if (
        nameInput.classList.contains('invalid') ||
        descriptionInput.classList.contains('invalid') ||
        imageInput.classList.contains('invalid')
    ) {
        e.preventDefault(); // Detiene el envío del formulario si hay errores
        alert("Por favor, corrige los errores antes de guardar el producto.");
    }
});
