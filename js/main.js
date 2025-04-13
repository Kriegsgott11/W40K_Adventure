// Referencias a los contenedores
const imagenSala = document.getElementById("sala-imagen");
const contenedorTerminal = document.getElementById("contenedor-terminal");

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
  cargarTemplate(data, "rooms/descent.html", contenedorTerminal);
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

  cargarTemplate(data, "rooms/archivum.html", contenedorTerminal);
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

  const contenedorInforme = document.getElementById("informe-mostrado");
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
  const salaText = `<p>${textos.IntroCapilla.replace(/\n/g, "<br>")}</p>`;

  const data = {
    salaImagen: salaImagen,
    salaText: salaText
  };

  // Load the external template
  cargarTemplate(data, "rooms/oratorium_combat.html", contenedorTerminal);

  //Hacer Preguntar a Luquitas porque usa esto aca
  //const contenedor = document.getElementById("juego");

}

function seleccionarOpcionCombate(index) {
  let resultado = "";

  switch (index) {
    case 0:
      resultado = textos.CombateA;
      break;
    case 1:
      resultado = textos.CombateB;
      break;
    case 2:
      resultado = textos.CombateC;
      break;
    default:
      resultado = "Informe no disponible.";
  }

  const contenedorResult = document.getElementById("resultado-combate");
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
  const contenedor = document.getElementById("juego");
  contenedor.innerHTML = `
    <div class="descripcion-superior">
      <h2>Altar de los Tres Signos</h2>
      <p>
        En el corazón de la Capilla del Silencio, un altar profanado espera ser purificado. Tres ranuras están talladas en piedra negra.
        Sobre los bordes, inscripciones binarizadas emiten destellos apagados. El aire huele a incienso mecánico y unguento sagrado.
        Solo un símbolo restaurará la conexión con la verdad.
      </p>
    </div>
    <div class="contenedor-opciones">
      <div class="opciones-botones">
        <button onclick="seleccionarSimbolo('aquila')">Aquila Imperialis</button>
        <button onclick="seleccionarSimbolo('rosarius')">Rosarius del Inquisidor</button>
        <button onclick="seleccionarSimbolo('mechanicus')">Símbolo del Adeptus Mechanicus</button>
      </div>
      <div class="resultado-texto" id="resultadoSimbolo">
        <p>Selecciona un símbolo para colocarlo en el altar.</p>
      </div>
    </div>
    <div id="botonContinuarSimbolo" style="display: none; text-align: center; margin-top: 20px;">
      <button onclick="mostrarLaboratorioGenetico()">Continuar</button>
    </div>
  `;
}

function seleccionarSimbolo(opcion) {
  const resultado = document.getElementById("resultadoSimbolo");
  const continuarBtn = document.getElementById("botonContinuarSimbolo");
  let texto = "";

  switch(opcion) {
    case 'aquila':
      texto = "Colocas el Aquila Imperialis. Un silencio se extiende, pero nada sucede. El altar permanece inerte.";
      continuarBtn.style.display = "none";
      break;
    case 'rosarius':
      texto = "Insertas el Rosarius del Inquisidor. Una chispa ilumina el altar, pero se desvanece. Este no es el símbolo adecuado.";
      continuarBtn.style.display = "none";
      break;
    case 'mechanicus':
      texto = "El Símbolo del Adeptus Mechanicus encaja perfectamente. Ruedas dentadas comienzan a girar. Se escucha un zumbido de aprobación mientras el altar se ilumina.";
      continuarBtn.style.display = "block";
      break;
  }
  resultado.innerHTML = `<p>${texto}</p>`;
}

//----------------------------------------------------------------

function mostrarLaboratorioGenetico() {
  const salaImagen = 'img/room_laboratorium.png';
  const descripcion = `
    <p>Te adentras en el <strong>Laboratorium Biologicus</strong>, una cámara revestida de acero y cobre, donde tubos con fluidos burbujean suavemente.</p>
    <p>Luces parpadeantes iluminan bancos de trabajo abandonados, documentos mojados por reactivos, y cuerpos parcialmente diseccionados bajo vitrinas de stasis.</p>
    <p>En una consola central hay registros genéticos protegidos por protocolos de acceso. Tres secciones están disponibles para su lectura...</p>
  `;

  const registros = {
    'Mutaciones': `Informe: Se detectaron múltiples mutaciones en los sujetos, en especial en la glándula progenoide. Esto podría indicar manipulación por entidades del Caos.`,
    'Culto Genestealer': `Informe: Señales claras de infiltración de un culto xenos. Se encontraron restos de ADN no humano en los recipientes de cultivo.`,
    'Experimentos Fusión': `Informe: El Magos Biologis intentó fusionar material genético de varias razas. El experimento fracasó catastróficamente y resultó en la pérdida de toda una escuadra de Skitarii.`
  };

  const contenedor = document.getElementById("juego");
  contenedor.innerHTML = `
    <div class="sala-imagen" style="background-image: url('${salaImagen}');"></div>
    <div id="descripcion-laboratorio">
      ${descripcion}
    </div>
    <div class="contenedor-sala">
      <div class="botones-sala">
        ${Object.keys(registros).map(
          (clave) => `<button onclick="mostrarTextoLaboratorio('${clave}')">${clave}</button>`
        ).join('')}
      </div>
      <div class="texto-sala" id="textoLaboratorio">
        <p>Selecciona un informe para visualizar su contenido...</p>
      </div>
    </div>
    <div class="continuar">
      <button onclick="mostrarCriptaHereje()">Continuar</button>
    </div>
  `;

  // Guardar registros en global para acceso posterior
  window.registrosLaboratorio = registros;
}

function mostrarTextoLaboratorio(clave) {
  const texto = window.registrosLaboratorio[clave];
  document.getElementById("textoLaboratorio").innerHTML = `<p>${texto}</p>`;
}

//-----------------------------------------

function mostrarCriptaHereje() {
  const salaImagen = 'img/cripta_hereje.jpg';
  const descripcion = `
    <p>Desciendes por una espiral de escaleras antiguas hasta llegar a la <strong>Cripta del Hereje</strong>, un santuario profanado donde la corrupción del Caos ha impregnado cada rincón.</p>
    <p>En el centro de la sala, una mesa de piedra sostiene varios <strong>viales de sustancias</strong> que aún burbujean débilmente. Un mecanismo arcano parece necesitar una combinación específica para activarse.</p>
    <p>Debes elegir tres viales. Una combinación correcta abrirá el camino, una incorrecta... podría tener consecuencias.</p>
  `;

  const opciones = ['Rojo', 'Verde', 'Azul'];

  const contenedor = document.getElementById("juego");
  contenedor.innerHTML = `
    <div id="sala-imagen" style="background-image: url('${salaImagen}')"></div>
    <div id="descripcion-cripta">
      ${descripcion}
    </div>
    <div class="contenedor-sala">
      <div class="botones-sala">
        <p>Selecciona 3 viales:</p>
        ${opciones.map(
          color => `<button onclick="seleccionarVial('${color}')">${color}</button>`
        ).join('')}
        <button onclick="probarCombinacion()">Probar combinación</button>
      </div>
      <div class="texto-sala" id="textoCripta">
        <p>Combinación actual: <span id="combinacionViales">[ ]</span></p>
        <div id="resultadoCombinacion"></div>
      </div>
    </div>
  `;

  // Inicializa variables para seleccionar
  window.combinacionViales = [];
  window.combinacionCorrecta = ['Rojo', 'Verde', 'Azul']; // puedes cambiar esto
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
  const descripcion = `
    El acólito ingresa a la cámara sellada. El aire es denso y cargado de energía disforme.
    Un círculo de cultistas entona cánticos blasfemos mientras, en el centro, un psíquico mutado tiembla, al borde de ser poseído.
    Una voz en su cabeza —¿el Emperador...?— le susurra qué hacer.
  `;

  const decisiones = [
    {
      texto: "Intentar salvar al psíquico",
      resultado: `
        El acólito interrumpe el ritual e intenta liberar al psíquico del influjo del Caos.
        Tras un sangriento combate logra romper el círculo, pero el psíquico huye y más tarde causa una masacre.
        La Inquisición castiga al acólito por su imprudencia.
      `
    },
    {
      texto: "Purgar la herejía con fuego sagrado",
      resultado: `
        Sin dudarlo, el acólito activa granadas de fusión y lanza proyectiles incendiarios.
        El ritual se interrumpe abruptamente, y los cultistas mueren entre gritos.
        El psíquico es incinerado antes de que la entidad pueda tomar control.
        El Emperador estará complacido.
      `
    },
    {
      texto: "Aceptar la voz en su mente",
      resultado: `
        Convencido de que el Emperador le habla, el acólito se arrodilla y acepta su "guía".
        La entidad demoníaca penetra su alma, y en segundos ya no queda nada humano.
        El acólito se convierte en un nuevo heraldo de la disformidad.
      `
    }
  ];

  const contenedor = document.getElementById("juego");
  contenedor.innerHTML = `
    <div class="sala-imagen" style="background-image: url('${salaImagen}');"></div>
    <div class="descripcion-sala">${descripcion}</div>
    <div class="contenedor-sala">
      <div class="botones-sala">
        ${decisiones.map((d, i) => `<button class="btn-opcion" onclick="mostrarResultadoFinal(${i})">${d.texto}</button>`).join('')}
      </div>
      <div id="resultado-final" class="texto-sala"></div>
    </div>
    <div id="boton-final" style="display: none; text-align: center; margin-top: 20px;">
      <button onclick="mostrarTextoFinal()">Continuar</button>
    </div>
  `;

  window._decisionesFinal = decisiones;
}

function mostrarResultadoFinal(index) {
  const texto = window._decisionesFinal[index].resultado;
  document.getElementById("resultado-final").innerHTML = `<p>${texto}</p>`;

  const botones = document.querySelectorAll(".btn-opcion");
  botones.forEach(btn => btn.disabled = true);

  document.getElementById("boton-final").style.display = "block";
}

