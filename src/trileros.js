const btnRejugar = document.getElementById("btnRejugar");
const numMix2 = 5;
const caparazones = document.getElementsByClassName("caparazon");
const ganador = document.getElementById("1");
const pGanadas = document.getElementById("ganadas");
const pPerdidas = document.getElementById("perdidas");
const musicaFondo = document.getElementById("musicaFondo");

const imgSonido = document.getElementById("imgSonido");
let posicionCaparazon = ["izq", "centro", "der"];
let caparazonLevantado;
let puntuaciones = [0, 0];

btnRejugar.addEventListener("click", volverAjugar);
imgSonido.addEventListener('click', alternarSilencio);
window.addEventListener('load', playMusic);
musicaFondo.loop = true;
musicaFondo.preload = "auto";




function volverAjugar() {
    animar("bajar", "0.5s", caparazonLevantado);
    cambiarImgCaparazon("../images/caparazon-ii.svg");
    darPista();
    mezclarCaparazones();
}

function darPista() {
    if (caparazonLevantado.id != "1") {
        animar("darPista", "2s", ganador);
    }
}

function mezclarCaparazones() {
    btnRejugar.disabled = true;
    let contador = 0;
    const intervalId = setInterval(() => {
        if (contador < numMix2) {
            let posicionesRand = randomizador();
            for (let i = 0; i < caparazones.length; i++) {
                caparazones[i].style.left = calcularMovimiento(
                    posicionCaparazon[i] + posicionesRand[i]
                );
                posicionCaparazon[i] = posicionesRand[i];
            }
            contador++;
        } else {
            clearInterval(intervalId);
            iniciarListenersCaparazones();
            btnRejugar.disabled = false;
        }
    }, 2000);
}

function randomizador() {
    let nuevasPos = [];
    let posicionesDisponibles = [...posicionCaparazon];

    for (let i = 0; i < 3; i++) {
        // random crea num del 0 al 0.99 multiplicando por el largo del array sera por ej(si es 3) un num del 0 al 2.99
        // con floor redondeamos el resultado a la baja y ya conseguimos un entero del 0 al 2
        let pos = Math.floor(Math.random() * posicionesDisponibles.length);
        nuevasPos.push(posicionesDisponibles[pos]);
        posicionesDisponibles.splice(pos, 1)[0];
    }
    return nuevasPos;
}

function calcularMovimiento(pos) {
    switch (pos) {
        case "izqcentro":
            return "28%";
        case "centroder":
            return "58%";
        case "dercentro":
            return "28%";
        case "centroizq":
            return "-2%";
        case "derizq":
            return "-2%";
        case "izqder":
            return "58%";
        default:
    }
}

function iniciarListenersCaparazones() {
    for (let i = 0; i < caparazones.length; i++) {
        caparazones[i].style.cursor = "pointer";
        caparazones[i].addEventListener("click", mostrarResultado);
    }
}

function deshabilitarListenersCaparazones() {
    for (let i = 0; i < caparazones.length; i++) {
        caparazones[i].style.cursor = "initial";
        caparazones[i].removeEventListener("click", mostrarResultado);
    }
}

function mostrarResultado(e) {
    deshabilitarListenersCaparazones();
    let img;
    if (e.target.id == "1" || e.target.id == "pelotita") {
        caparazonLevantado = ganador;
        img = "../images/acertaste-ii.svg";
        puntuaciones[0]++;
        pGanadas.innerText = puntuaciones[0];
    } else {
        caparazonLevantado = e.target;
        img = "../images/fallaste-ii.svg";
        puntuaciones[1]++;
        pPerdidas.innerText = puntuaciones[1];
    }
    animar("levantar", "0.3s", caparazonLevantado);
    cambiarImgCaparazon(img);
}

function cambiarImgCaparazon(url) {
    caparazonLevantado.src = url;
}

function animar(animacion, velocidad, elemento) {
    elemento.style.animationDuration = velocidad;
    elemento.style.animationName = animacion;
}



//a partir de aquí lo movemos//
const btnJugar = document.getElementById("btnJugar");
const zonaJuego = document.getElementById("juego");

btnJugar.addEventListener("click", iniciarJuego);

function iniciarJuego() {
    animar("deslizar-izquierda", "1s", btnJugar);
    setTimeout(() => {
        btnJugar.style.display = "none";
    }, 1000);
    setTimeout(() => {
        zonaJuego.style.display = "block";
    }, 1000);
    setTimeout(() => {
        animar("fade-in", "3s", zonaJuego);
    }, 1001);
    setTimeout(() => {
        animar("darPista", "2s", ganador);
        temporizadorEmpieza();
        mezclarCaparazones();
    }, 4000);
  
}

const btnReiniciar = document.getElementById("btn-reiniciar");
btnReiniciar.addEventListener("click", reiniciarJuego);
function reiniciarJuego() {
    animar("scale-in-center","1s", btnJugar);
    
}


//temporizador
let [segundos, minutos] = [0,0];
let temporizadorDisplay = document.querySelector(".temporizador");

function temporizador() {
    segundos++;
    if(segundos == 60) {
        segundos = 0;
        minutos++;
        if (minutos == 60){
            segundos = 0;
            minutos = 0;
        }
    }

    let m = minutos < 10 ? "0" + minutos : minutos;
    let s = segundos < 10 ? "0" + segundos : segundos;

    temporizadorDisplay.innerHTML = `${m}:${s}`;
}

function temporizadorEmpieza() {
    setInterval(temporizador, 1000);
}

//sonido

function playMusic() {
    musicaFondo.play()
    };



function alternarSilencio() {
    if (musicaFondo.muted) {
        musicaFondo.muted = false;
        imgSonido.src = "./images/volumen-on-boton.svg"
    } else {
        musicaFondo.muted = true;
        imgSonido.src = "./images/boton-volumen-ii.svg"
    }
}

window.addEventListener('click', (event) => {
    
    if (event.target.id !== 'imgSonido') {
        playMusic();
        window.removeEventListener('click', arguments.callee); 
    }
}, { once: true });
