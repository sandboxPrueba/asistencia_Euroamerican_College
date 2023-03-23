const url = 'https://espartano.azurewebsites.net/listarFamilia';
const urlGuardar = 'https://espartano.azurewebsites.net/actualizarAsistencia';
const urlReporte ='https://espartano.azurewebsites.net/listarFamiliaAsitida'

let rellenar = document.querySelector("#rellenar"); 
let rellenar2 = document.querySelector("#rellenar2"); 
let rellenar3 = document.querySelector("#rellenar3"); 

var nombreAlumno;
var cantidadResultados;
var total;

var input = document.getElementById("nombreAlumno");

if (localStorage.getItem("usuario") ==null) {
    //window.location="/index.html";
    window.location="/asistencia_Euroamerican_College/";
}
window.onload = () => {
    mostrarSpinner();
    obtenerDatos()
}
obtenerNombreAlumno();
function mostrarSpinner() {
    document.getElementById("spinner-container").style.display = "block";
    document.getElementById("formulario-container").style.display = "none";
}
function mostrarFormulario() {
    document.getElementById("spinner-container").style.display = "none";
    document.getElementById("formulario-container").style.display = "block";
}

function obtenerNombreAlumno(){

    fetch(url)
    .then(response => response.json())
    .then(json=>{
        imprimir2(json.data);
        mostrarFormulario();
    });

    let imprimir2 = (array)=>{

        var informacionAlumno ="";

        array.forEach((alumno) => {

            informacionAlumno+=
            ` 
            <option value="${alumno.nombreFamilia}"></option>
            `  
        });
        rellenar2.innerHTML= informacionAlumno
    }
}

function obtenerValorSeleccionado() {
    nombreAlumno2=document.getElementById("nombreAlumno2").value;

    // console.log(nombreAlumno2);
    
    // BuscarAlumno(nombreAlumno2)
  }

function regresar(){
    //para local
    //window.location="/pages/home.html/";
    //para git pages
    window.location="/asistencia_Euroamerican_College/pages/home.html";
}

async function obtenerDatos(){
    await fetch(urlReporte)
        .then(response => response.json())
        .then(json=>{
            imprimir(json.data),
            cantidadResultados=(json.mensaje);
            total=(json.total);
            console.log(total);
        });
    if(cantidadResultados =="Se encontraron 0 resultado(s)."){
        alert("No se encontraron resultados")
    }
    rellenar3.innerHTML = ` <h1>Total ${total}</h1>`
}

let imprimir = (array)=>{

    var informacionAlumno ="";

    array.forEach((alumno) => {

        const fechaOriginal = new Date(alumno.fecha);
        const year = fechaOriginal.getFullYear();
        const month = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0');
        const day = fechaOriginal.getDate().toString().padStart(2, '0');
        const hours = fechaOriginal.getHours().toString().padStart(2, '0');
        const minutes = fechaOriginal.getMinutes().toString().padStart(2, '0');
        const seconds = fechaOriginal.getSeconds().toString().padStart(2, '0');
        const fechaFormateada = `${day}-${month}-${year}  ${hours}:${minutes}:${seconds}`; 
    
        // console.log(index);
        informacionAlumno+=
        ` 
        <tr>
            <th>${alumno.nombreFamilia}</th>
            <td>${alumno.asistio}</td>
            <td>${fechaFormateada}</td>
        </tr>
        `   
    });
    rellenar.innerHTML= informacionAlumno

}

function guardar(){
    var check;
    nombreAlumno2=document.getElementById("nombreAlumno2").value;

    console.log(nombreAlumno2);

    checkbox = document.getElementById("flexSwitchCheckChecked");
    if (checkbox.checked) {
        check ="Si"
        console.log("El checkbox está seleccionado");
    } else {
        check="No"
        console.log("El checkbox no está seleccionado");
    }


    if(nombreAlumno2==""){
        alert("Debe ingresar el nombre del alumno")
    }else{
        let body =  {
            "nombrefamilia": nombreAlumno2,
            "asistio": check,
        }
        fetch(urlGuardar, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => {
          console.log(json);
          alert(json.mensaje)
          location.reload();
         })
        .catch(err => console.log(err));
    }
}


