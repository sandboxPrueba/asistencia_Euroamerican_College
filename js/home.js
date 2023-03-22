if (localStorage.getItem("usuario") ==null) {
    window.location="/index.html";
    //window.location="/matricula_Euroamerican_College/";
}

function cerrarSesion(){
    localStorage.clear();
    //para local
    //window.location="/index.html";
    //para git pages
    window.location="/asistencia_Euroamerican_College/";
}
function AsistenciaFamilia(){
    //para local
    //window.location="/pages/reporte.html";
    //para git pages
    window.location="/asistencia_Euroamerican_College/pages/asistenciaFamilia.html";
}

