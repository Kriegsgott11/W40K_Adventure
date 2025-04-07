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
  setSalaImagen("assets/intro.jpg");
  contenedorTerminal.className = "intro-terminal";

  const introDiv = document.createElement("div");
  introDiv.id = "intro";
  introDiv.classList.add("typewriter");

  contenedorTerminal.innerHTML = "";
  contenedorTerminal.appendChild(introDiv);

  typeText(textos.introduccion, introDiv, pedirNombre);
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
  cargarSalaDesembarco();
}

// Pantalla 2: Sala de Desembarco
function cargarSalaDesembarco() {
  setSalaImagen("assets/sala-desembarco.jpg");
  contenedorTerminal.className = ""; // reset estilo terminal
  contenedorTerminal.innerHTML = `
    <p>Has descendido en la superficie de Caldria VI, <strong>${sessionStorage.getItem("acolito")}</strong>.</p>
    <p>El aire es denso y el olor a ozono lo invade todo. Las puertas de la antigua instalación se alzan frente a ti.</p>
    <button onclick="cargarSalaArchivo()">Entrar a la instalación</button>
  `;
}



// Iniciar juego
mostrarIntroduccion();

//---------------------------------------------------

function cargarSalaArchivo() {
  const salaImagen = 'img/sala_archivo.jpg';
  const informes = [
    "[Informe A] El experimento 112 muestra inestabilidad genética, pero la fórmula parece contener patrones clave en el ADN. El número 3 aparece repetido.",
    "[Informe B] Los cultistas dejaron grabado en la pared el símbolo 'XIV'. Aparentemente reverencian ese número como sagrado.",
    "[Informe C] Los sistemas indican que el último acceso exitoso utilizó el código 3-14-9."
  ];

  const contenedor = document.getElementById("juego");
  contenedor.innerHTML = `
    <div id="sala-imagen" style="background-image: url('${salaImagen}')"></div>
    <div id="texto-informes" style="display: flex; gap: 1em; margin-top: 1em;">
      <div id="botones-informes" style="flex: 3; display: flex; flex-direction: column; gap: 0.5em;">
        <button onclick="mostrarInforme(0)">Leer Informe A</button>
        <button onclick="mostrarInforme(1)">Leer Informe B</button>
        <button onclick="mostrarInforme(2)">Leer Informe C</button>
      </div>
      <div id="informe-mostrado" style="flex: 7; border: 1px solid #555; padding: 1em; min-height: 100px; color: white;"></div>
    </div>
    <div id="input-codigo" style="margin-top: 1em;">
      <label for="codigo">Código de acceso:</label>
      <input type="text" id="codigo" placeholder="_ _ _">
      <button onclick="verificarCodigoArchivo()">Validar</button>
    </div>
  `;

  window.informesArchivo = informes; // Guardamos los informes para accederlos desde mostrarInforme
}

function mostrarInforme(index) {
  const informeTexto = window.informesArchivo[index];
  const contenedorInforme = document.getElementById("informe-mostrado");
  contenedorInforme.textContent = informeTexto;
}

function verificarCodigoArchivo() {
  const codigo = document.getElementById("codigo").value.trim();
  if (codigo === "3-14-9") {
    alert("Código correcto. Avanzando a la siguiente sala...");
    mostrarCapillaCombate();
  } else {
    alert("Código incorrecto. Vuelve a analizar los informes.");
  }
}

//---------------------------------------------------

// Fragmento JavaScript actualizado para la Capilla del Silencio - Encuentro con herejes

function mostrarCapillaCombate() {
  const salaImagen = 'img/capilla_combate.jpg';
  const descripcionSala = `
    <p>Ingresas a la Capilla del Silencio. La atmósfera es opresiva. Columnas góticas se alzan en ruinas y símbolos del Caos profanan los muros. Aquí, entre las sombras, patrullan tres herejes, corrompidos por su depravada fe. Debes actuar con sabiduría y decisión.</p>
  `;

  const opciones = [
    {
      id: "purgar",
      texto: "Enfrentarlos y purgarlos",
      resultado: "Empuñas tu arma y sorprendes a los herejes con fuego y fe. La batalla es brutal, pero sales victorioso. La capilla queda momentáneamente limpia de corrupción."
    },
    {
      id: "ignorar",
      texto: "Esconderte y evitarlos",
      resultado: "Decides esquivarlos y pasar desapercibido. Aunque logras seguir avanzando, una sensación de culpa pesa sobre tus hombros."
    },
    {
      id: "enganar",
      texto: "Intentar engañarlos",
      resultado: "Finges ser uno de ellos, pero tu mentira se desvanece rápidamente. El combate es inevitable y terminas herido, aunque logras sobrevivir."
    }
  ];

  const contenedor = document.getElementById("juego");
  contenedor.innerHTML = `
    <div id="sala-imagen" style="background-image: url('${salaImagen}')"></div>
    <div id="descripcion-capilla">${descripcionSala}</div>
    <div id="interaccion-capilla" style="display: flex; gap: 1rem;">
      <div style="width: 30%; display: flex; flex-direction: column; gap: 1rem;">
        ${opciones.map(op => `
          <button id="${op.id}" onclick="seleccionarOpcionCombate('${op.id}')">${op.texto}</button>
        `).join('')}
      </div>
      <div id="resultado-combate" style="width: 70%; border: 1px solid #555; padding: 1rem; background-color: #111; color: white; min-height: 150px;">
        <p>Selecciona una opción para ver el resultado...</p>
      </div>
    </div>
    <div style="margin-top: 2rem; text-align: center;">
      <button id="btn-continuar-combate" style="display:none;" onclick="mostrarCapillaSimbolos()">Continuar</button>
    </div>
  `;
}

function seleccionarOpcionCombate(id) {
  const resultados = {
    purgar: "Empuñas tu arma y sorprendes a los herejes con fuego y fe. La batalla es brutal, pero sales victorioso. La capilla queda momentáneamente limpia de corrupción.",
    ignorar: "Decides esquivarlos y pasar desapercibido. Aunque logras seguir avanzando, una sensación de culpa pesa sobre tus hombros.",
    enganar: "Finges ser uno de ellos, pero tu mentira se desvanece rápidamente. El combate es inevitable y terminas herido, aunque logras sobrevivir."
  };

  document.getElementById("resultado-combate").innerHTML = `<p>${resultados[id]}</p>`;

  // Desactivar todos los botones después de elegir
  ["purgar", "ignorar", "enganar"].forEach(op => {
    const btn = document.getElementById(op);
    btn.disabled = true;
    btn.style.opacity = 0.5;
  });

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
  const salaImagen = 'img/laboratorio_genetico.jpg';
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
    <div id="sala-imagen" style="background-image: url('${salaImagen}')"></div>
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
