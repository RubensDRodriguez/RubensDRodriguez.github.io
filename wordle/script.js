let intentos = 6;

//se estiran los datos de la api
const API = "https://random-word-api.vercel.app/api?words=1&length=5";
fetch(API)
    .then((response) => response.json())
    //se asigna la palabra y se convierte a mayuscula
    .then((response) => {
        palabra = response[0].toUpperCase();
    })
    .catch((err) => {
        console.log("La API no responde, se usa lista local");
        let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
        palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
    });

const INPUT = document.getElementById("guess-input");
const VALOR = INPUT.value;

const BUTTON = document.getElementById("guess-button");
BUTTON.addEventListener("click", intentar, limpiarInput);
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13 && intentos != 0) {
        intentar();
        limpiarInput();
    }
});

function limpiarInput(){
    INPUT.value = ""; //vaciamos el input cuando intenta
}

function intentar(){
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.style.textAlign = "center";
    ROW.style.margin = "10px";
    ROW.className = 'row';
    if (INTENTO === palabra){
        terminar("<h1>GANASTE!😀</h1>")
        for (let i in palabra){
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            SPAN.innerHTML = palabra[i];
            SPAN.style.backgroundColor = '#79b851'; //verde
            ROW.appendChild(SPAN);
        }
        GRID.appendChild(ROW);

        return
    }
    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i]===palabra[i]){ //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851';
        } else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237';
        } else {      //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#a4aec4';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)

    intentos --;
    if (intentos == 0){
        const ROW_RESPUESTA = document.createElement('div');
        ROW_RESPUESTA.style.textAlign = "center";
        ROW_RESPUESTA.style.margin = "10px";
        ROW_RESPUESTA.className = 'row';
        for (let i in palabra){
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            SPAN.innerHTML = palabra[i];
            SPAN.style.backgroundColor = '#79b851'; //verde
            ROW_RESPUESTA.appendChild(SPAN);
        }
        GRID.appendChild(ROW_RESPUESTA);
        terminar("<h1>PERDISTE!😖</h1>")
    }
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();

    return intento;
}
