//OBTENIENDO LOS ID DE HTML------------------------------------------------//
const header = document.getElementById("header");
//-------------------------------------------------------------------------//
const menuPrincipal = document.getElementById("menu-principal");
const instrucciones = document.getElementById("instrucciones");
const botonInstrucciones = document.getElementById("boton-instrucciones");
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

    constructor(nombre, imagen, vida, fotoParaElMapa) {
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
let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 3, "./assets/hipodoge.png");
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 3, "./assets/capipepo.png");
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 3, "./assets/ratigueya.png");

let hipodogeEnemigo = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 3, "./assets/hipodoge.png");
let capipepoEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 3, "./assets/capipepo.png");
let ratigueyaEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 3, "./assets/ratigueya.png");

let mokepones = [];

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

//-------------------------------------------------------------------------//
//DECLARANDO FUNCIONES
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generandoMokepones() {

    hipodoge.ataques.push(
        { nombre: "🔥", id: "boton-fuego" },
        { nombre: "💦", id: "boton-agua" },
        { nombre: "🌱", id: "boton-tierra" },
    )

    hipodogeEnemigo.ataques.push(
        { nombre: "🔥", id: "boton-fuego" },
        { nombre: "💦", id: "boton-agua" },
        { nombre: "🌱", id: "boton-tierra" }
    )

    capipepo.ataques.push(
        { nombre: "🔥", id: "boton-fuego" },
        { nombre: "💦", id: "boton-agua" },
        { nombre: "🌱", id: "boton-tierra" }
    )

    capipepoEnemigo.ataques.push(
        { nombre: "🔥", id: "boton-fuego" },
        { nombre: "💦", id: "boton-agua" },
        { nombre: "🌱", id: "boton-tierra" }
    )

    ratigueya.ataques.push(
        { nombre: "🔥", id: "boton-fuego" },
        { nombre: "💦", id: "boton-agua" },
        { nombre: "🌱", id: "boton-tierra" }
    )

    ratigueyaEnemigo.ataques.push(
        { nombre: "🔥", id: "boton-fuego" },
        { nombre: "💦", id: "boton-agua" },
        { nombre: "🌱", id: "boton-tierra" }
    )

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
    seleccionarMascota.style.display = "none";
    verMapa.style.display = "none";
    seleccionarAtaques.style.display = "none";
    botonReiniciar.style.display = "none";

    //MOSTRANDO LAS VICTORIAS
    parrafoVictoriasJugador.innerHTML = victoriasJugador;
    parrafoVictoriasEnemigo.innerHTML = victoriasEnemigo;

    //ESCUCHANDO EVENTOS
    botonInstrucciones.addEventListener("click", mostrarInstrucciones);
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
    botonReiniciar.addEventListener("click", reiniciarJuego);

    //IMAGEN DE FONDO PARA EL MAPA
    imagenFondo.src = "./assets/mokemap.png"
}

function mostrarInstrucciones() {

    if (instrucciones.style.display == "none") {
        instrucciones.style.display = "block";
    } else {
        instrucciones.style.display = "none";
    }

}

function nuevaPartida() {
    menuPrincipal.style.display = "none";
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

        extraerAtaques(nombreMascotaJugador);

        //DESHABILITAR LA SECCION DE SELECCIONAR MASCOTA
        seleccionarMascota.style.display = "none";
        header.style.display = "none";

        //HABILITAR LA SECCIÓN CANVAS
        verMapa.style.display = "flex";
        iniciarMapa();

    }

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
    hipodogeEnemigo.dibujarMokepon();
    capipepoEnemigo.dibujarMokepon();
    ratigueyaEnemigo.dibujarMokepon();

    //REVISAR SI HAY COLISIÓN CUANDO LA MASCOTA SE ESTÁ MOVIMIENDO
    if (mascotaDeJugadorParaDibujar.velocidadX != 0 || mascotaDeJugadorParaDibujar.velocidadY != 0) {

        revisarColision(hipodogeEnemigo);
        revisarColision(capipepoEnemigo);
        revisarColision(ratigueyaEnemigo);

    }
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
        seleccionarMascotaEnemigo(enemigo);

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

    mostrarNombresDeLasMascotas();
    mostrarImagenDeLasMascostas(nombreMascotaJugador, nombreMascotaEnemigo, mokepones);
}

function extraerAtaques(nombreMascotaJugador) {

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

    secuenciaAtaque();

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

            seleccionarAtaqueEnemigo();
            iniciarCombate();

        })
    })

}

function seleccionarAtaqueEnemigo() {

    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigos.length - 1);
    let ataque = ataquesMokeponEnemigos[ataqueAleatorio]; //OBTENIENDO EL ATAQUE QUE SERÁ ELIMINADO
    let nombreDelAtaque = ataque.nombre; //OBTENIENDO EL NOMBRE DEL ATAQUE PARA SER ANALIZADO
    ataquesMokeponEnemigos = ataquesMokeponEnemigos.filter((e) => { return e != ataque }); //ELIMINADO CADA ATAQUE SELECCIONADO POR EL ENEMIGO

    secuenciaAtaqueEnemigo(nombreDelAtaque);

}

function secuenciaAtaqueEnemigo(nombreDelAtaque) {

    if (nombreDelAtaque === "🔥") {
        ataquesEnemigo.push("Fuego");
    } else if (nombreDelAtaque === "💦") {
        ataquesEnemigo.push("Agua");
    } else {
        ataquesEnemigo.push("Tierra");
    }

}

function iniciarCombate() {

    if (ataquesJugador.length === 3) {
        combate();
    }

}

function combate() {

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

function reiniciarJuego() {

    location.reload();

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