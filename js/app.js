const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');



//listeners
cargaEventListeners();



function cargaEventListeners() {
    //dispara cuando se presiona "Agregar al carrito"
    cursos.addEventListener('click', comprarCurso);

    //Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Cuando se presiona el boton de vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Al cargar la pagina, cargamos lo que este en LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);


}


//Funciones   ---------------------------------------------------------------------

//Funcion que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    //Delegation para agregar carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        //enviamos los datos del curso que se le dio click
        leerDatosCurso(curso);

    }
}


//Funcion para leer los datos del curso
function leerDatosCurso(curso){
	const infoCurso ={
		imagen: curso.querySelector('img').getAttribute('src'),
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id')
	}
	insertarCarrito(infoCurso);
}


//funcion Mostrar el curso seleccionado en el carrito
function insertarCarrito(curso){
	const row = document.createElement('tr');
	row.innerHTML = `
		<td>
			<img src="${curso.imagen}" width="100">
		<td>
		<td>${curso.titulo}</td>
		<td>${curso.precio}</td>
		<td>
			<a href="#"  class="borrar-curso" data-id="${curso.id}"</td>X</a>
		</td>

	`;
	listaCursos.appendChild(row);
	guardarCursoLocalStorage(curso);
}


// Funcion para eliminar cursos del carrito
function eliminarCurso(e){
	e.preventDefault();
	let curso, cursoId;
	if (e.target.classList.contains('borrar-curso')){
		e.target.parentElement.parentElement.remove();
		curso = e.target.parentElement.parentElement;
		cursoId = curso.querySelector('a').getAttribute('data-id');
		eliminarCursoLS(cursoId);

	}


}


// Funcion para vaciar los elementos que esten en el carrito
function vaciarCarrito(){
	// forma lenta
	listaCursos.innerHTML = '';

	// forma rapida
	while(listaCursos.firstChild){
		listaCursos.removeChild(listaCursos.firstChild);
	}

	//vaciar el LocalStorage
	vaciarLocalStorage();

	return false;

}


// Funcion para almacenar los cursos del carrito al LocalStorage
function guardarCursoLocalStorage(curso){
 	let cursos;
 	cursos = obtenerCursosLocalStorage();
 	// el curso seleccionado se agrega al arreglo
 	cursos.push(curso);

 	localStorage.setItem('cursos', JSON.stringify(cursos));
}


// Funcion para buscar el contenido de LocalStorage
function obtenerCursosLocalStorage(){
	let cursosLS;
	if (localStorage.getItem('cursos')=== null){
		cursosLS = [];
	}
	else{
		cursosLS = JSON.parse(localStorage.getItem('cursos'));
	}

	return cursosLS

}


// funcion para leer los acticulos del localStorage
function leerLocalStorage(){
	let cursosLS;
	cursosLS = obtenerCursosLocalStorage();

	cursosLS.forEach(function(curso){
		// vamos a construir el tremplate para agregarlo al carrito con los elementos del LS
		// este codigo es igual al codigo de insterar al carrito
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>
				<img src="${curso.imagen}" width="100">
			<td>
			<td>${curso.titulo}</td>
			<td>${curso.precio}</td>
			<td>
				<a href="#"  class="borrar-curso" data-id="${curso.id}"</td>X</a>
			</td>

		`;
		listaCursos.appendChild(row);
	});
}


// Elimina el curso que seleccionamos del LocalStorage
function eliminarCursoLS (curso){
	let cursosLS;
	//obtenemos el arreglo de cursos guardados en localStorage
	cursosLS = obtenerCursosLocalStorage();

	// Recorremos el arreglo para buscar "curso" que es el id del que queremos borrar
	cursosLS.forEach(function(cursoLS, index){
		if (cursoLS.id === curso){
			console.log(cursoLS.id+' - '+ curso+' - '+ index);
			cursosLS.splice(index, 1);
		}

	});

	localStorage.setItem('cursos', JSON.stringify(cursosLS));
}


// Vacia todos los cursos del LocalStorage
function vaciarLocalStorage(){
	localStorage.clear();
}
















