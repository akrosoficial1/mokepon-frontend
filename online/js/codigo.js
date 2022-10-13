//OBTENIENDO LOS ID DE HTML------------------------------------------------//
const header = document.getElementById("header");
//-------------------------------------------------------------------------//
const seleccionarMascota = document.getElementById("seleccionar-mascotas");
const contenedorDeTarjetas = document.getElementById("contenedor-tarjetas");
const botonMascotaJugador = document.getElementById("boton-mascota");
//-------------------------------------------------------------------------//
const verMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");
//ESTABLECIENDO TAMAÑO DEL MAPA
mapa.width = 580;
mapa.height = 380;
//-------------------------------------------------------------------------//
const iconJugador = document.getElementById("icon-jugador");
const iconEnemigo = document.getElementById("icon-enemigo");
const parrafoVictoriasJugador = document.getElementById("victorias-jugador");
const parrafoVictoriasEnemigo = document.getElementById("victorias-enemigo");
const parrafoMascotaDelJugador = document.getElementById("mascota-jugador");
const parrafoMascotaDelEnemigo = document.getElementById("mascota-enemigo");
const contenedorAtaques = document.getElementById("contenedor-ataques");
const seleccionarAtaques = document.getElementById("seleccionar-ataques");
//-------------------------------------------------------------------------//
const ataqueDelJugador = document.getElementById("ataque-del-jugador");
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo");
//-------------------------------------------------------------------------//
const botonReiniciar = document.getElementById("boton-reiniciar");
const parrafoResultado = document.getElementById("parrafo-resultado");
//-------------------------------------------------------------------------//
//DECLARANDO CLASES
class Mokepon {

    constructor(nombre, imagen, vida, fotoParaElMapa, id = null) {
        this.id = id
        this.nombre = nombre;
        this.imagen = imagen;
        this.vida = vida;
        this.ataques = [];

        this.width = 50;
        this.height = 50;

        this.x = aleatorio(0, mapa.width - this.width);
        this.y = aleatorio(0, mapa.height - this.height);

        this.velocidadX = 0;
        this.velocidadY = 0;

        this.fotoParaElMapa = new Image();
        this.fotoParaElMapa.src = fotoParaElMapa;
    }

    dibujarMokepon() {
        lienzo.drawImage(this.fotoParaElMapa, this.x, this.y, this.width, this.height);
    }

}
//-------------------------------------------------------------------------//
//DECLARACIÓN DE VARIABLES GLOBALES
let hipodoge = new Mokepon("Hipodoge", "../assets/mokepons_mokepon_hipodoge_attack.png", 3, "../assets/hipodoge.png");
let capipepo = new Mokepon("Capipepo", "../assets/mokepons_mokepon_capipepo_attack.png", 3, "../assets/capipepo.png");
let ratigueya = new Mokepon("Ratigueya", "../assets/mokepons_mokepon_ratigueya_attack.png", 3, "../assets/ratigueya.png");

let mokepones = [];
let mokeponesEnemigos = [];

let lienzo = mapa.getContext("2d");
let imagenFondo = new Image();
let mascotaDeJugadorParaDibujar;
let intervalo;

let nombreMascotaEnemigo;
let nombreMascotaJugador;

let ataquesJugador = [];
let ataquesEnemigo = [];

let indexAtaqueJugador;
let indexAtaqueEnemigo;

let victoriasJugador = 0;
let victoriasEnemigo = 0;

let opcionDeMokepones;

let inputHipodoge;
let inputCapipepo;
let inputRatigueya;

let botonFuego;
let botonAgua;
let botonTierra;

let botonDeAtaqueAleatorioMokepon;
let botonDenombreDelAtaqueMokepon;
let botonesDeAtaques = [];

let ataquesMokeponEnemigos = [];

let jugadorId;
let enemigoId;

//-------------------------------------------------------------------------//
//DECLARANDO FUNCIONES
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generandoMokepones() {

    const HIPODOGE_ATAQUES = [
        { nombre: "🔥", id: "boton-fuego" },
        { nombre: "💦", id: "boton-agua" },
        { nombre: "🌱", id: "boton-tierra" },
    ];

    const CAPIPEPO_ATAQUES = [
        { nombre: "🔥", id: "boton-fuego" },
        { nombre: "💦", id: "boton-agua" },
        { nombre: "🌱", id: "boton-tierra" }
    ];

    const RATIGUEYA_ATAQUES = [
        { nombre: "🔥", id: "boton-fuego" },
        { nombre: "💦", id: "boton-agua" },
        { nombre: "🌱", id: "boton-tierra" }
    ];

    hipodoge.ataques.push(...HIPODOGE_ATAQUES);
    capipepo.ataques.push(...CAPIPEPO_ATAQUES);
    ratigueya.ataques.push(...RATIGUEYA_ATAQUES);

    mokepones.push(hipodoge, capipepo, ratigueya);

    //GENERANDO TARJETAS DE MOKEPONES PARA QUE EL JUGADOR SELECCIONE
    mokepones.forEach((mokepon) => {

        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjetas-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.imagen} alt=${mokepon.imagen}>
        </label>
        `

        contenedorDeTarjetas.innerHTML += opcionDeMokepones;

        inputHipodoge = document.getElementById('Hipodoge');
        inputCapipepo = document.getElementById('Capipepo');
        inputRatigueya = document.getElementById('Ratigueya');

    });

}

function iniciarJuego() {

    //TARJETAS DE MOKEPONES DINÁMICOS
    generandoMokepones();

    //DESHABILITANDO OPCIONES POSTERIORES
    verMapa.style.display = "none";
    seleccionarAtaques.style.display = "none";
    botonReiniciar.style.display = "none";

    //MOSTRANDO LAS VICTORIAS
    parrafoVictoriasJugador.innerHTML = victoriasJugador;
    parrafoVictoriasEnemigo.innerHTML = victoriasEnemigo;

    //ESCUCHANDO EVENTOS
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

    //IMAGEN DE FONDO PARA EL MAPA
    imagenFondo.src = "../assets/mokemap.png"

    //CONECTANDO AL SERVIDOR
    unirseAlJuego();
}

function unirseAlJuego() {

    fetch("http://localhost:442/unirse")
        .then((res) => {
            if (res.ok) {
                res.text()
                    .then((respuesta) => jugadorId = respuesta);
            }
        })

}

function nuevaPartida() {
    seleccionarMascota.style.display = "flex";
}

function seleccionarMascotaJugador() {

    if (inputHipodoge.checked) {

        nombreMascotaJugador = inputHipodoge.id;

    } else if (inputCapipepo.checked) {

        nombreMascotaJugador = inputCapipepo.id;

    } else if (inputRatigueya.checked) {

        nombreMascotaJugador = inputRatigueya.id;

    } else {

        alert("Selecciona una mascota válida");

    }

    validarSeleccionMascotaDelJugador();

}

function validarSeleccionMascotaDelJugador() {

    if (nombreMascotaJugador != null) {

        extraerAtaquesJugador(nombreMascotaJugador);

        //DESHABILITAR LA SECCION DE SELECCIONAR MASCOTA
        seleccionarMascota.style.display = "none";
        header.style.display = "none";

        //HABILITAR LA SECCIÓN CANVAS
        verMapa.style.display = "flex";
        iniciarMapa();

        //OBTENIENDO MASCOTA DEL JUGADOR
        enviandoMascotaDeJugadorAlServidor(nombreMascotaJugador);

    }

}

function enviandoMascotaDeJugadorAlServidor(nombreMascotaJugador) {

    fetch(`http://localhost:442/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: nombreMascotaJugador
        })
    });

}

function obtenerMascotaParaElMapa(nombreMascotaJugador) {

    for (let i = 0; i < mokepones.length; i++) {

        if (nombreMascotaJugador === mokepones[i].nombre) {

            return mokepones[i];

        }

    }
}

function iniciarMapa() {

    mascotaDeJugadorParaDibujar = obtenerMascotaParaElMapa(nombreMascotaJugador);

    dibujarEnCanvas();
    intervalo = setInterval(dibujarEnCanvas, 50);

    //ESCUCHANDO EVENTOS
    window.addEventListener("keydown", teclaPulsada);
    window.addEventListener("keyup", detenerMovimiento);

}

function dibujarEnCanvas() {

    mascotaDeJugadorParaDibujar.x += mascotaDeJugadorParaDibujar.velocidadX;
    mascotaDeJugadorParaDibujar.y += mascotaDeJugadorParaDibujar.velocidadY;

    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(imagenFondo, 0, 0, mapa.width, mapa.height);

    mascotaDeJugadorParaDibujar.dibujarMokepon();

    //ENVIAR LAS COORDENADAS AL SERVIDOR
    enviarPosicionAlServidor(mascotaDeJugadorParaDibujar.x, mascotaDeJugadorParaDibujar.y);

    mokeponesEnemigos.forEach((mokepon) => {
        mokepon.dibujarMokepon();
        revisarColision(mokepon);
    })
}

function enviarPosicionAlServidor(x, y) {

    fetch(`http://localhost:442/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })

    }).then((res) => {
        if (res.ok) {

            res.json()
                .then(({ enemigos }) => {

                    mokeponesEnemigos = enemigos.map((enemigo) => {

                        let mokeponEnemigo;
                        const mokeponNombre = enemigo.mokepon.nombre || "";

                        switch (mokeponNombre) {
                            case "Hipodoge":
                                mokeponEnemigo = new Mokepon("Hipodoge", "../assets/mokepons_mokepon_hipodoge_attack.png", 3, "../assets/hipodoge.png", enemigo.id);
                                break;
                            case "Capipepo":
                                mokeponEnemigo = new Mokepon("Capipepo", "../assets/mokepons_mokepon_capipepo_attack.png", 3, "../assets/capipepo.png", enemigo.id);
                                break;
                            case "Ratigueya":
                                mokeponEnemigo = new Mokepon("Ratigueya", "../assets/mokepons_mokepon_ratigueya_attack.png", 3, "../assets/ratigueya.png", enemigo.id);
                                break
                            default:
                                break;
                        }

                        mokeponEnemigo.x = enemigo.x;
                        mokeponEnemigo.y = enemigo.y;

                        return mokeponEnemigo;

                    })

                })

        }
    })
}

function revisarColision(enemigo) {

    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.height;
    const derechaEnemigo = enemigo.x + enemigo.width;
    const izquierdaEnemigo = enemigo.x;

    const arribaMascota = mascotaDeJugadorParaDibujar.y;
    const abajoMascota = mascotaDeJugadorParaDibujar.y + mascotaDeJugadorParaDibujar.height;
    const derechaMascota = mascotaDeJugadorParaDibujar.x + mascotaDeJugadorParaDibujar.width;
    const izquierdaMascota = mascotaDeJugadorParaDibujar.x;

    if (abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {

        return;

    } else {

        detenerMovimiento();
        clearInterval(intervalo);
        seleccionarMascotaEnemigo(enemigo);

        enemigoId = enemigo.id;

        //DESHABILITAR LA SECCIÓN DE MAPA
        verMapa.style.display = "none";

        //HABILITAR LA SECCIÓN DE ATAQUE
        seleccionarAtaques.style.display = "flex";

    }
}

function seleccionarMascotaEnemigo(enemigo) {

    let mascotaEnemigo = enemigo;
    nombreMascotaEnemigo = mascotaEnemigo.nombre;
    ataquesMokeponEnemigos = mascotaEnemigo.ataques;

    //MOSTRAR NOMBRES E IMAGENES DE LOS MOKEPONES EN LA PANTALLA DONDE VAN A BATALLAR
    mostrarNombresDeLasMascotas();
    mostrarImagenDeLasMascostas(nombreMascotaJugador, nombreMascotaEnemigo, mokepones);
}

function extraerAtaquesJugador(nombreMascotaJugador) {

    let ataques;

    //EXTRAYENDO ATAQUES DINÁMICAMENTE
    for (let i = 0; i < mokepones.length; i++) {

        if (nombreMascotaJugador === mokepones[i].nombre) {

            ataques = mokepones[i].ataques;

        }

    }

    mostrarAtaques(ataques);

}

function mostrarAtaques(ataques) {

    //GENERANDO BOTONES DINÁMICOS
    ataques.forEach((ataque) => {

        botonDeAtaqueAleatorioMokepon = `
            <button class="boton-de-ataques BAtaques" id=${ataque.id}>${ataque.nombre}</button>
        `

        contenedorAtaques.innerHTML += botonDeAtaqueAleatorioMokepon;

    })

    //SELECCIONANDO ELEMENTOS GENERADOS A TRAVÉS DE SU ID
    botonFuego = document.getElementById("boton-fuego");
    botonAgua = document.getElementById("boton-agua");
    botonTierra = document.getElementById("boton-tierra");

    botonesDeAtaques = document.querySelectorAll(".BAtaques");

    secuenciaAtaque();

}

function mostrarImagenDeLasMascostas(nombreMascotaJugador, nombreMascotaEnemigo, array) {

    array.forEach((e) => {

        if (e.nombre == nombreMascotaJugador) {

            let img = `<img src="${e.imagen}" alt="${e.nombre}">`;
            iconJugador.innerHTML = img;

        }
    })

    array.forEach((e) => {

        if (e.nombre == nombreMascotaEnemigo) {

            let img = `<img src="${e.imagen}" alt="${e.nombre}">`;
            iconEnemigo.innerHTML = img;
        }
    })

}

function mostrarNombresDeLasMascotas() {

    parrafoMascotaDelJugador.innerHTML = nombreMascotaJugador;
    parrafoMascotaDelEnemigo.innerHTML = nombreMascotaEnemigo;

}

function secuenciaAtaque() {

    botonesDeAtaques.forEach((boton) => {
        boton.addEventListener("click", (e) => {

            if (e.target.textContent === "🔥") {

                ataquesJugador.push("Fuego");
                boton.disabled = true;

            } else if (e.target.textContent === "💦") {

                ataquesJugador.push("Agua");
                boton.disabled = true;

            } else {

                ataquesJugador.push("Tierra");
                boton.disabled = true;

            }

            if (ataquesJugador.length === 3) {

                enviarAtaques();

            }

        })
    })

}

function enviarAtaques() {

    fetch(`http://localhost:442/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataquesJugador
        })
    })

    intervalo = setInterval(obtenerAtaquesEnemigo, 50);
}

function obtenerAtaquesEnemigo() {
    fetch(`http://localhost:442/mokepon/${enemigoId}/ataques`)
        .then((res) => {
            if (res.ok) {
                res.json()
                    .then(({ ataques }) => {

                        if (ataques.length === 3) {

                            ataquesEnemigo = ataques;
                            combate();

                        }

                    })
            }
        })
}

function combate() {

    clearInterval(intervalo);

    for (let i = 0; i < ataquesJugador.length; i++) {

        if (ataquesEnemigo[i] == ataquesJugador[i]) {

            indexAmbosOponentes(i, i);
            mostrarResultadoFinal();

        } else if (ataquesJugador[i] == "Fuego" && ataquesEnemigo[i] == "Tierra") {
            victoriasEnemigo += 1;
            indexAmbosOponentes(i, i);
            mostrarResultadoFinal();

        } else if (ataquesJugador[i] == "Agua" && ataquesEnemigo[i] == "Fuego") {
            victoriasEnemigo += 1;
            indexAmbosOponentes(i, i);
            mostrarResultadoFinal();

        } else if (ataquesJugador[i] == "Tierra" && ataquesEnemigo[i] == "Agua") {
            victoriasEnemigo += 1;
            indexAmbosOponentes(i, i);
            mostrarResultadoFinal();

        } else {
            victoriasJugador += 1;
            indexAmbosOponentes(i, i);
            mostrarResultadoFinal();

        }
    }
}

function indexAmbosOponentes(jugador, enemigo) {

    indexAtaqueJugador = ataquesJugador[jugador];
    indexAtaqueEnemigo = ataquesEnemigo[enemigo];

}

function mostrarResultadoFinal() {

    //ACTUALIZANDO LAS VICTORIAS
    parrafoVictoriasJugador.innerHTML = victoriasJugador;
    parrafoVictoriasEnemigo.innerHTML = victoriasEnemigo;

    //MOSTRANDO ATAQUES DE CADA JUGADOR
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);

    validarVictorias();
}

function validarVictorias() {

    if (victoriasJugador > victoriasEnemigo) {

        crearMensajeFinal("¡Felicitaciones! <strong>GANASTE</strong>🏆");

    } else if (victoriasEnemigo > victoriasJugador) {

        crearMensajeFinal("¡Que pena! <strong>LOSER</strong>🥴");

    } else {

        crearMensajeFinal("¡Que loco! Es un <strong>EMPATE</strong>");

    }

}

function crearMensajeFinal(resultadoFinalDelCombate) {

    parrafoResultado.innerHTML = resultadoFinalDelCombate;

    //MOSTRAR BOTÓN DE REINICIAR
    botonReiniciar.style.display = "inline";

}

function moverArriba() {

    mascotaDeJugadorParaDibujar.velocidadY = -5;

}

function moverIzquierda() {

    mascotaDeJugadorParaDibujar.velocidadX = -5;

}

function moverAbajo() {

    mascotaDeJugadorParaDibujar.velocidadY = 5;

}

function moverDerecha() {

    mascotaDeJugadorParaDibujar.velocidadX = 5;

}

function detenerMovimiento() {

    mascotaDeJugadorParaDibujar.velocidadX = 0;
    mascotaDeJugadorParaDibujar.velocidadY = 0;

}

function teclaPulsada(event) {

    switch (event.key) {
        case "ArrowUp":
            moverArriba();
            break;
        case "ArrowLeft":
            moverIzquierda();
            break;
        case "ArrowDown":
            moverAbajo();
            break;
        case "ArrowRight":
            moverDerecha();
            break;
        default:
            break;
    }

}

window.addEventListener("load", iniciarJuego);