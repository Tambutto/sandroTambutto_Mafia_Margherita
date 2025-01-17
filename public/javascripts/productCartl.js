let contador = 0;

function incrementar() {
    contador++;
    document.getElementById('valor').innerText = contador;
}

function decrementar() {
    if (contador > 0) {
        contador--;
        document.getElementById('valor').innerText = contador;
    }
}
