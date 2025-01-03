/*

	app.js galeria de proyectos

*/

document.addEventListener("DOMContentLoaded", function() {
	// navegacionFija(); // Deja fija la barra superior
	efectoScrollEnlace(); // Efecto de desplazamiento desde navegación
	resaltarEnlace();
});

function resaltarEnlace() {
	document.addEventListener("scroll", function() {
		const secciones = document.querySelectorAll("section");
		const enlaces = document.querySelectorAll(".navegacion-principal a");

		let seccionActual = '';
		secciones.forEach( section => {
			const seccionTop = section.offsetTop;
			const seccionHight = section.clientHeight;
			if (window.scrollY >= (seccionTop - seccionHight / 20 )) {
				// console.log(section.id);
				seccionActual = section.id;
			}
		});

		enlaces.forEach( link => {
			link.classList.remove("active"); // Elimino clase active para que vaya quitando el estilo en caso que no coincida 
			if (link.getAttribute("href") === '#' + seccionActual) {
				link.classList.add("active");
				// console.log(seccionActual);
			}
		})

	})
}

function efectoScrollEnlace() {
	const enlaces = document.querySelectorAll(".navegacion-principal a");

	enlaces.forEach(link => {
		link.addEventListener("click", function(e) {
			e.preventDefault();
			console.log(e.target.getAttribute("href"));
			const seccionEnlace = e.target.getAttribute("href");
			const seccion = document.querySelector(seccionEnlace);

			seccion.scrollIntoView({behavior: "smooth"});
		});
	});
}

document.addEventListener('keydown', function(e) { // Se ejecuta cuando se presiona la tecla ESC 
	if(e.keyCode == 27){
		cerrarProyecto();
	}
});

function verProyecto(i) {
	console.log(screen.width);
	if (screen.width <= 768) {
		console.log("Menos de 380px")
		return 0;
	}


	// Generar Modal
	const modal = document.createElement("DIV");
	modal.classList.add("modal");
	/*modal.onclick = function() {
		cerrarProyecto();
	};*/

	// Cargar Proyecto
	const imagen = document.createElement("IMG");
	imagen.src = `src/img/proyectos/full/${i}.png`;
	imagen.alt = "Proyecto";

	// Agregar Imagen al Modal
	modal.appendChild(imagen);


	// Generar DIV Agrupar Botones
	const agruparBotones = document.createElement("DIV");
	agruparBotones.classList.add("agrupar-botones");
	// Agregar Agrupar Botones al Modal 
	modal.appendChild(agruparBotones);

	// Botón Anterior
	const anteriorProyectoBtn = document.createElement("BUTTON");
	anteriorProyectoBtn.id = "btn-anterior";
	anteriorProyectoBtn.textContent = "<"
	anteriorProyectoBtn.classList.add("btn");
	anteriorProyectoBtn.onclick = function() {
		anteriorProyecto(i+1);
	};
	// Agregar Boton Cerrar al Modal
	agruparBotones.appendChild(anteriorProyectoBtn);		

	// Botón cerrar modal
	const cerrarModalBtn = document.createElement("BUTTON");
	cerrarModalBtn.textContent = "X"
	cerrarModalBtn.classList.add("btn");
	cerrarModalBtn.onclick = function() {
		cerrarProyecto();
	};
	// Agregar Boton Cerrar al Modal
	agruparBotones.appendChild(cerrarModalBtn);	

	// Botón Siguiente
	const siguienteProyectoBtn = document.createElement("BUTTON");
	siguienteProyectoBtn.id = "btn-siguiente";
	siguienteProyectoBtn.textContent = ">"
	siguienteProyectoBtn.classList.add("btn");
	siguienteProyectoBtn.onclick = function() {
		siguienteProyecto(i);
	};
	// Agregar Boton Cerrar al Modal
	agruparBotones.appendChild(siguienteProyectoBtn);		

	// Agregar al HTML
	const body = document.querySelector("body");
	body.classList.add("body-overflow-hidden"); // Añade estilo para evitar scroll cuando el modal está abierto
	body.appendChild(modal);

}

function cerrarProyecto() {

	const modal = document.querySelector(".modal"); 

	if (modal) { // Se aplica validación para evitar error en la llamada de ESC 
		// Agregar clase con la animación
		modal.classList.add("modal-fade-out");
}

	setTimeout(() => { // Arrow Function
		if (modal) {
			modal.remove();
			// Cuando se agrega el overflow:hidden se debe remover sino queda como clase en el body
			const body = document.querySelector("body");
			body.classList.remove("body-overflow-hidden"); // Elimina overflow:hidden utilizado para evitar desplazamiento en modal
		}		

	}, 500);
	
}

function siguienteProyecto(i) {

	document.removeEventListener('keydown', function(e) { // Se ejecuta cuando se presiona la tecla ESC 
		if(e.keyCode == 27){
			
		}
	});

	const imagen = document.querySelector(".modal img")
	imagen.src = `src/img/proyectos/full/${i+1}.png`;
	imagen.alt = "Proyecto";
}

function anteriorProyecto(i) {
	const imagen = document.querySelector(".modal img")

	if (i > 0) {
		imagen.src = `src/img/proyectos/full/${i-1}.png`;
		imagen.alt = "Proyecto";
	}
}
