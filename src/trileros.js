const btnRejugar = document.getElementById("btnRejugar");
const numMix2 = 5;
const caparazones = document.getElementsByClassName("caparazon");
const ganador = document.getElementById("1");
let posicionCaparazon = ["izq", "centro", "der"];
let caparazonLevantado;

btnRejugar.addEventListener("click", volverAjugar);

function volverAjugar() {
    animar("bajar", "0.5s", caparazonLevantado);
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
            return "34%";
        case "centroder":
            return "68%";
        case "dercentro":
            return "34%";
        case "centroizq":
            return "0";
        case "derizq":
            return "0";
        case "izqder":
            return "68%";
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
    animar("levantar", "0.5s", e.target);
    caparazonLevantado = e.target;
    deshabilitarListenersCaparazones();
    setTimeout(() => {
        if (e.target.id == "1") {
            alert("ACERTASTE!");
        } else {
            alert("FALLASTE!");
        }
    }, 500)
}

function animar(animacion, velocidad, elemento) {
    elemento.style.animationDuration = velocidad;
    elemento.style.animationName = animacion;
}
//a partir de aquí lo movemos//
const btnJugar = document.getElementById("btnJugar");
btnJugar.addEventListener("click", iniciarJuego);
function iniciarJuego() {
    animar("deslizar-izquierda","1s",btnJugar);
    setTimeout(()=>{
        btnJugar.style.display="none";
    } ,1000);
    mezclarCaparazones();

}
