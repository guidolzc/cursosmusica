//variables
const carrito = document.getElementById('carrito');
const curso = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//listeners
cargarcursosListeners();
function cargarcursosListeners(){
    // Disparar cuando se presiona "agregar Carrito"
    curso.addEventListener('click', comprarCurso);
    // Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    // al vaciar carrito 
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    //al cargar el documento , mostrar localstorage
    document.addEventListener('DOMContentLoaded',leerLocalStorage);
}
//funciones 
// funcion que añade el curso al carrito
function comprarCurso(e){
    // delegation para agregar - carrito 
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        // enviamos el cursoselecionado para tomar datos
        leerDatosCursos (curso);


    }

}
//leer los datos del curso 
function leerDatosCursos(curso){
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
   //console.log(infoCurso);
}

// muestra el curso seleccionado en el carrito
    function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td> 
         <img src= "${curso.imagen}" width = 100>
        </td> 
        <td> ${curso.titulo}</td>
        <td> ${curso.precio}</td>
        <td> 
            <a href="#" class = "borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
  listaCursos.appendChild(row);
  guardarCursoLocalStorage(curso);
}
// funcion eliminar el curso del carrito en el DOM
function eliminarCurso(e){
    e.preventDefault();

    
    let curso,
    cursoId;
 if(e.target.classList.contains('borrar-curso') ) {
      e.target.parentElement.parentElement.remove();
      curso = e.target.parentElement.parentElement;
      cursoId = curso.querySelector('a').getAttribute('data-id');
        //console.log(cursoId);
    //console.log(e.target.parentElement.parentElement);
    }
    eliminarCursoLocalStorage(cursoId);
}
// elimina los cursos del carrito en el DOM
function vaciarCarrito() { 
    // forma lenta
    //listaCursos.innerHTML = '';
    // forma rapida  (recomendada)
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    return false;

}
// almacena cursos en el carrito a local Storage
function guardarCursoLocalStorage(curso) {
    let cursos;
    //console.log(curso);
    // TOMA EL VALOR DE UN ARREGLO CON DATOS DE LS O VACIO
    cursos = obtenerCursosLocalStorage();
    //console.log(cursos);
    // CURSO SELECCIONADO SE AGREGA AL ARREGLO
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));

}
// comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage() {
    let cursosLS;
    // comprobamos si hay algo en localstorage
    if (localStorage.getItem('cursos') === null){
        cursosLS = [];

    }else {
        cursosLS = JSON.parse( localStorage.getItem('cursos') );
    }
    return cursosLS;
}
// IMPRIME LOS CURSOS DE LOCAL STORAGE EN EL CARRITO

function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();
    //console.log(cursosLS);
    
    cursosLS.forEach(function(curso){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>  
            <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
                
            </td>
        `;
      listaCursos.appendChild(row);

    });
}

// ELIMINA EL CURSO POR ID EN EL LOCALSTORAGE


function eliminarCursoLocalStorage(curso){
    //console.log(curso);
    let cursosLS;
    //console.log(curso);
    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(cursoLS , index){
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1);

        }
     //console.log(cursosLS);
     //--   console.log(curso.id);
      

    });

    localStorage.setItem('cursos', JSON.stringify(cursosLS) ); 
}
