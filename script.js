const inputNumero = document.getElementById('inputNumero');
const tarjetas = document.querySelectorAll('.tarjeta');
const historial = document.getElementById('historial');

// Genera un número aleatorio de 3 dígitos, incluyendo números del 000 al 999
let numeroSecreto = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
let numeroSecretoArray = numeroSecreto.split('');

console.log("Número secreto:", numeroSecreto); // Para depuración

let intentos = 0;
let maxIntentos = 10;

inputNumero.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        comprobarNumero(inputNumero.value);
    }
});

function comprobarNumero(valor) {
    // Asegurarse de que el valor tenga 3 dígitos, rellenando con ceros a la izquierda si es necesario
    const numeroIngresado = valor.padStart(3, '0');
    console.log("Número ingresado:", numeroIngresado); // Para depuración

    if (!/^\d{3}$/.test(numeroIngresado)) {
        alert('Por favor, ingresa un número de 3 cifras.');
        return;
    }

    intentos++;

    const numeroIngresadoArray = numeroIngresado.split('');

    let pistas = [];
    tarjetas.forEach(tarjeta => tarjeta.className = 'tarjeta base');

    for (let i = 0; i < 3; i++) {
        if (numeroIngresadoArray[i] === numeroSecretoArray[i]) {
            pistas.push('verde');
            tarjetas[i].classList.add('verde');
        } else if (numeroSecretoArray.includes(numeroIngresadoArray[i])) {
            pistas.push('amarillo');
            tarjetas[i].classList.add('amarillo');
        } else {
            pistas.push('rojo');
            tarjetas[i].classList.add('rojo');
        }
    }

    const intento = document.createElement('div');
    intento.textContent = `${numeroIngresado} - ${pistas.join(' ')}`;
    historial.insertBefore(intento, historial.firstChild);

    if (pistas.every(pista => pista === 'verde')) {
        setTimeout(() => {
            alert('¡Felicidades! Has adivinado el número.');
            reiniciarJuego();
        }, 100);
    } else if (intentos === maxIntentos) {
        setTimeout(() => {
            alert(`¡Has agotado todos tus intentos! El número secreto era: ${numeroSecreto}`);
            reiniciarJuego();
        }, 100);
    }

    inputNumero.value = '';
}

function reiniciarJuego() {
    numeroSecreto = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    numeroSecretoArray = numeroSecreto.split('');
    console.log("Nuevo número secreto:", numeroSecreto); // Para depuración
    intentos = 0;
    historial.innerHTML = '';
    tarjetas.forEach(tarjeta => tarjeta.className = 'tarjeta base');
}