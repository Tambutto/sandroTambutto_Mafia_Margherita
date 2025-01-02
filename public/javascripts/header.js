// Agrega menu desplegable

function menuPizza() {
    const menu = document.getElementById('desplegable');
    const icono = document.getElementById('iconoPizza');

    if (menu.classList.contains('visible')) {
        menu.classList.remove('visible')
    } else {
        menu.classList.add('visible')
    }

    if (icono.classList.contains('rotated')) {
        icono.classList.remove('rotated');
        icono.style.transform = 'rotate(0deg)';
    } else {
        icono.classList.add('rotated');
        icono.style.transform = 'rotate(45deg)';
        
    }
}



