// Inicializa el valor del contador y el precio
let valorActual = 0;
const precioPorUnidad = parseFloat(document.querySelector('.boton').textContent.replace('$', ''));

// Función para incrementar el valor
function incrementar() {
    valorActual++;
    actualizarValor();
}

// Función para decrementar el valor (evita valores negativos)
function decrementar() {
    if (valorActual > 0) {
        valorActual--;
        actualizarValor();
    }
}

// Función para actualizar el contador y el precio total en la vista
function actualizarValor() {
    const valorSpan = document.getElementById('valor');
    valorSpan.textContent = valorActual; // Actualiza el contador

    const precioTotalSpan = document.getElementById('precio-total');
    const precioTotal = valorActual * precioPorUnidad;

    // Actualiza el precio total dinámicamente
    precioTotalSpan.textContent = `$${precioTotal.toFixed(2)}`; // Muestra el valor con dos decimales
}




