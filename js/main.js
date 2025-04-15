// Referencias a los contenedores
const imagenSala = document.getElementById("sala-imagen");
const contenedorTerminal = document.getElementById("contenedor-terminal");
const contenedorJuego = document.getElementById("juego");

// Efecto de tipeo
function typeText(text, container, callback, speed = 30) {
  let i = 0;
  container.innerHTML = ""; // limpiar
  function type() {
    if (i < text.length) {
      container.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      if (callback) callback();
    }
  }
  type();
}

// Cambiar imagen de fondo de la sala
function setSalaImagen(url) {
  imagenSala.style.backgroundImage = `url('${url}')`;
}

// Pantalla de introducción
function mostrarIntroduccion() {
  imagenSala.style.display = "none";

  contenedorTerminal.className = "intro-terminal";

  // Crear contenedor general
  const introDiv = document.createElement("div");
  introDiv.id = "intro";
  introDiv.classList.add("typewriter");

  // Crear el form desde el principio
  const form = document.createElement("div");
  $(form).load("inputs/player_name.html");

  // Insertar en la terminal
  contenedorTerminal.innerHTML = "";
  contenedorTerminal.appendChild(introDiv);
  contenedorTerminal.appendChild(form);

  // Iniciar efecto de tipeo, sin bloquear el form
  typeText(textos.introduccion, introDiv);
}

// Input para el nombre del acólito
function pedirNombre() {
  const form = document.createElement("div");
  form.innerHTML = `
    <p>Introduce tu nombre, acólito:</p>
    <input type="text" id="nombreInput" placeholder="Nombre del acólito">
    <button onclick="iniciarMision()">Comenzar misión</button>
  `;
  contenedorTerminal.appendChild(form);
}

// Guardar el nombre y avanzar
function iniciarMision() {
  const input = document.getElementById("nombreInput");
  const nombre = input.value.trim();
  if (nombre === "") {
    alert("Debes introducir un nombre.");
    return;
  }
  sessionStorage.setItem("acolito", nombre);

  // Mostrar imagen de sala cuando arranca el juego
  imagenSala.style.display = "block";

  cargarSalaDesembarco();
}

// Pantalla 2: Sala de Desembarco
function cargarSalaDesembarco() {
  const salaImagen = 'img/room_CaldriaIV.png';
  //setSalaImagen("img/room_CaldriaIV.png");
  contenedorTerminal.className = ""; // reset estilo terminal

  const nombre = sessionStorage.getItem("acolito");

  //$(contenedorTerminal).load(".html");

  const data = {
    salaImagen: salaImagen,
    nombre: nombre
  };

  // Load the external template
  cargarTemplate(data, "rooms/descent.html", contenedorJuego);
}

function cargarTemplate(data, template, container)
{
  $.get(template, function(templateSource) {
    const template = Handlebars.compile(templateSource);
    const html = template(data);
    $(container).html(html);
  });
}

// Iniciar juego
mostrarIntroduccion();

//---------------------------------------------------

function cargarSalaArchivo() {
  const salaImagen = 'img/room_Archivum.png';

  const data = {
    salaImagen: salaImagen
  };

  cargarTemplate(data, "rooms/archivum.html", contenedorJuego);
}

function mostrarInforme(index) {
  let informeTexto = "";

  switch (index) {
    case 0:
      informeTexto = textos.informeA;
      break;
    case 1:
      informeTexto = textos.informeB;
      break;
    case 2:
      informeTexto = textos.informeC;
      break;
    default:
      informeTexto = "Informe no disponible.";
  }

  const contenedorInforme = document.getElementById("resultado-sala");
  contenedorInforme.innerHTML  = informeTexto.replace(/\n/g, "<br>");
}

function verificarCodigoArchivo() {
  const codigo = document.getElementById("codigo").value.trim();
  if (codigo === "5284493177") {
    alert("Código correcto. Avanzando a la siguiente sala...");
    mostrarCapillaCombate();
  } else {
    alert("Código incorrecto. Vuelve a analizar los informes.");
  }
}

//---------------------------------------------------

// Fragmento JavaScript actualizado para la Capilla del Silencio - Encuentro con herejes

function mostrarCapillaCombate() {
  const salaImagen = 'img/room_capilla_herejes.png';
  const salaText = textos.IntroCapilla;

  const data = {
    salaImagen: salaImagen,
    salaText: salaText
  };

  // Load the external template
  cargarTemplate(data, "rooms/oratorium_combat.html", contenedorJuego);

  //Hacer Preguntar a Luquitas porque usa esto aca
  //const contenedor = document.getElementById("juego");

}

function seleccionarOpcionCombate(index) {
  let resultado = "";

  switch (index) {
    case 0:
      resultado = textos.CombateA;
      sessionStorage.setItem("combate", "1");
      break;
    case 1:
      resultado = textos.CombateB;
      sessionStorage.setItem("combate", "2");
      break;
    case 2:
      resultado = textos.CombateC;
      sessionStorage.setItem("combate", "3");
      break;
    default:
      resultado = "Informe no disponible.";
  }

  const contenedorResult = document.getElementById("resultado-sala");
  contenedorResult.innerHTML  = `<p>${resultado.replace(/\n/g, "<br>")}</p>`;
  //document.getElementById("resultado-combate").innerHTML = `<p>${resultado.replace(/\n/g, "<br>")}</p>`;

  // Desactivar todos los botones después de elegir
  const btn0 = document.getElementById("0");
  btn0.disabled = true;
  btn0.style.opacity = 0.5;
  const btn1 = document.getElementById("1");
  btn1.disabled = true;
  btn1.style.opacity = 0.5;
  const btn2 = document.getElementById("2");
  btn2.disabled = true;
  btn2.style.opacity = 0.5;

  document.getElementById("btn-continuar-combate").style.display = "inline-block";
}

//----------------------------------------------------------

function mostrarCapillaSimbolos() {

  const salaImagen = 'img/room_capilla_puzzle.png';
  const emblemaAst = 'img/puzzle_stone_astartes.png';
  const emblemaInq = 'img/puzzle_stone_Inquisition.png';
  const emblemaMec = 'img/puzzle_stone_mechanicum.png';

  const data = {
    salaImagen: salaImagen,
    emblemaAst: emblemaAst,
    emblemaInq: emblemaInq,
    emblemaMec: emblemaMec,
  };

  // Load the external template
  cargarTemplate(data, "rooms/oratorium_puzzle.html", contenedorJuego);

}

function seleccionarSimbolo(index) {
  const resultado = document.getElementById("resultado-sala-img");
  const continuarBtn = document.getElementById("btn-continuar-puzzle");
  const imagenes = document.querySelectorAll('.opciones-sala-imagenes img');

  imagenes.forEach((img, i) => {
    if (i === indice) {
      img.classList.add('seleccionada');
    } else {
      img.classList.remove('seleccionada');
    }
  });

  let texto = "";

  switch(index) {
    case 0:
      texto = "Colocas el emblema del Adeptus Astartes. Un silencio se extiende, pero nada sucede. El altar permanece inerte.";
      continuarBtn.style.display = "none";
      break;
    case 1:
      texto = "Insertas el emblema de la santa Inquisición. Una chispa ilumina el altar, pero se desvanece. Este no es el símbolo adecuado.";
      continuarBtn.style.display = "none";
      break;
    case 2:
      texto = "El emblema del Adeptus Mechanicus encaja perfectamente. Ruedas dentadas comienzan a girar. Se escucha un zumbido de aprobación mientras el altar se ilumina.";
      continuarBtn.style.display = "block";
      break;
  }
  resultado.innerHTML = `<p>${texto}</p>`;
}

//----------------------------------------------------------------

function mostrarLaboratorioGenetico() {
  const salaImagen = 'img/room_laboratorium.png';

  const data = {
    salaImagen: salaImagen
  };

  // Load the external template
  cargarTemplate(data, "rooms/lab_biologicus.html", contenedorJuego);

}

function mostrarTextoLaboratorio(index) {

  let informeTexto = "";

  switch (index) {
    case 0:
      informeTexto = textos.LabInfoA;
      break;
    case 1:
      informeTexto = textos.LabInfoB;
      break;
    case 2:
      informeTexto = textos.LabInfoC;
      break;
    default:
      informeTexto = "Informe no disponible.";
  }

  const contenedorInforme = document.getElementById("resultado-sala");
  contenedorInforme.innerHTML  = `<p>${informeTexto.replace(/\n/g, "<br>")}</p>`;

}

//-----------------------------------------

function mostrarCriptaHereje() {
  const salaImagen = 'img/room_cripta_hereje.png';

  const data = {
    salaImagen: salaImagen
  };

  // Load the external template
  cargarTemplate(data, "rooms/crypta_haeretici.html", contenedorJuego);

  // Inicializa variables para seleccionar
  window.combinacionViales = [];
  window.combinacionCorrecta = ['rojo', 'verde', 'azul']; // puedes cambiar esto
}

function seleccionarVial(color) {
  if (window.combinacionViales.length < 3) {
    window.combinacionViales.push(color);
    document.getElementById("combinacionViales").textContent = `[ ${window.combinacionViales.join(', ')} ]`;
  }
}

function probarCombinacion() {
  const combinacion = window.combinacionViales;
  const resultado = document.getElementById("resultadoCombinacion");

  if (combinacion.length < 3) {
    resultado.innerHTML = `<p style="color: orange;">Debes elegir 3 viales primero.</p>`;
    return;
  }

  if (JSON.stringify(combinacion) === JSON.stringify(window.combinacionCorrecta)) {
    resultado.innerHTML = `
      <p style="color: lightgreen;">La mezcla brilla intensamente. El mecanismo se activa y una puerta oculta se abre lentamente...</p>
      <button onclick="mostrarSalaFinal()">Continuar</button>
    `;
  } else {
    resultado.innerHTML = `
      <p style="color: red;">La mezcla reacciona violentamente pero se disipa. No era la correcta... puedes volver a intentarlo.</p>
    `;
    // Reinicia para permitir otro intento
    window.combinacionViales = [];
    document.getElementById("combinacionViales").textContent = `[ ]`;
  }
}

//---------------------------------------------------------------------------

function mostrarSalaFinal() {
  const salaImagen = 'img/room_camarasellada.png';

  const data = {
    salaImagen: salaImagen
  };

  // Load the external template
  cargarTemplate(data, "rooms/claustrum_clausum.html", contenedorJuego);

  //window._decisionesFinal = decisiones;
}

function mostrarResultadoFinal(index) {

  let resultado = "";

  switch (index) {
    case 0:
      resultado = textos.FinalCamaraSelladaA;
      sessionStorage.setItem("final", "A");
      break;
    case 1:
      resultado = textos.FinalCamaraSelladaB;
      sessionStorage.setItem("final", "B");
      break;
    case 2:
      resultado = textos.FinalCamaraSelladaC;
      sessionStorage.setItem("final", "C");
      break;
    default:
      resultado = "Informe no disponible.";
  }

  const contenedorInforme = document.getElementById("resultado-sala");
  contenedorInforme.innerHTML  = `<p>${resultado.replace(/\n/g, "<br>")}</p>`;

  //const botones = document.querySelectorAll(".btn-opcion");
  //botones.forEach(btn => btn.disabled = true);
// Desactivar todos los botones después de elegir
const btn0 = document.getElementById("0");
btn0.disabled = true;
btn0.style.opacity = 0.5;
const btn1 = document.getElementById("1");
btn1.disabled = true;
btn1.style.opacity = 0.5;
const btn2 = document.getElementById("2");
btn2.disabled = true;
btn2.style.opacity = 0.5;

  document.getElementById("boton-final").style.display = "block";
}

function MostrarInformeFinal() {

  const salaImagen = 'img/room_laboratorium.png';

  const data = {
    salaImagen: salaImagen
  };

  // Load the external template
  cargarTemplate(data, "rooms/informe_final.html", contenedorJuego);
}

function SetInforme() {
  const decisionCombate = sessionStorage.getItem("combate");
  const decisionFinal = sessionStorage.getItem("final");
  const nombre = sessionStorage.getItem("acolito");

  if (!decisionCombate || !decisionFinal) {
    document.getElementById("contenedor-informe").textContent =
      "Error: decisiones no registradas.";
    return;
  }

  const clave = decisionCombate + decisionFinal;
  let texto = "";

  switch (clave) {
    case "1A":
      texto = textos.Final1;
      break;
    case "1B":
      texto = textos.Final2;
      break;
    case "1C":
    case "2C":
    case "3C":
      texto = textos.Final3;
      break;
    case "2A":
      texto = textos.Final4;
      break;
    case "2B":
      texto = textos.Final5;
      break;
    case "3A":
      texto = textos.Final6;
      break;
    case "3B":
      texto = textos.Final7;
      break;
    default:
      texto = "Error: combinación de decisiones inválida.";
  }

  texto = texto.replaceAll("[NOMBRE ARCHIVADO]", nombre);

  const contenedorInforme = document.getElementById("texto-informe");
  contenedorInforme.innerHTML  = `<p>${texto.replace(/\n/g, "<br>")}</p>`;
}

