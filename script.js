const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');

CALCULAR.addEventListener('click', () => {
  const DATO = document.getElementById('peso').value;

  // Validacion de imput
  if (DATO > 0 && DATO <= 30) {
    ERROR.style.display = 'none';

    let flujo = Math.trunc(calcFlujo(DATO));
    let mantenimiento = Math.trunc(flujo * 1.5);

    FLU.innerHTML = flujo + ' cc/hr';
    MAN.innerHTML = 'm+m/2: ' + mantenimiento + ' cc/hr';

    FLU.style.display = 'block';
    MAN.style.display = 'block';
    // Si el peso es mayor que 30 
  } else if (DATO > 30) {
    let peso = DATO;
    let superficieCorporal = ((peso * 4) + 7) / (peso + 90);
    let por1500 = Math.trunc(superficieCorporal * 1500);
    let por2000 = Math.trunc(superficieCorporal * 2000);

    FLU.innerHTML = '1500: ' + por1500 + ' cc/hr';
    MAN.innerHTML = '2000: ' + por2000 + ' cc/hr';

    FLU.style.display = 'block';
    MAN.style.display = 'block';
  } else {
    ERROR.style.display = 'block';
    FLU.style.display = 'none';
    MAN.style.display = 'none';
  }
});

// Habilitar tecla enter
document.addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && document.activeElement === document.getElementById('peso')) {
    CALCULAR.click();
    limpiarInput();
  }
});

//Cálculo del flujo de fluidos segun el peso del pasiente
function calcFlujo(peso) {
  let flujo = 0;

  if (peso <= 10 && peso >= 1) {
    flujo = peso * 100 / 24;
  }

  if (peso <= 20 && peso >= 11) {
    flujo = (((peso - 10) * 50) + 1000) / 24;
  }

  if (peso <= 30 && peso >= 21) {
    flujo = (((peso - 20) * 20) + 1500) / 24;
  }

  return flujo;
}

//Deja en blanco el input cuando se borran los elementos
const INPUT_PESO = document.getElementById('peso');

INPUT_PESO.addEventListener('focusout', () => {
  if (INPUT_PESO.value === '') {
    document.getElementById('error').style.display = 'none';
    document.getElementById('flu').innerHTML = '';
    document.getElementById('man').innerHTML = '';
  } else if (INPUT_PESO.value < 1) {
    document.getElementById('error').style.display = 'block';
    document.getElementById('flu').innerHTML = 'El peso ingresado no es válido. Ingrese un peso mayor a 0.';
    document.getElementById('man').innerHTML = '';
  }
});

