// Desplazarse hacia arriba cuando el usuario hace clic en el botón

document.querySelector('.arrow').addEventListener('click', function() {
    document.body.scrollTop = 0; // Para Safari
    document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
});
