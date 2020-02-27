var navegador=document.getElementById("navegador");
var datos= document.getElementsByTagName("li");
function obtieneDatos(){
    datos[0].innerHTML="Nombre del navegador:"+navigator.appCodeName;
    datos[1].innerHTML="Version del navegador:"+navigator.appVersion;
    datos[2].innerHTML="Estatus del internet:"+navigator.onLine;
    datos[3].innerHTML="Nombre del navegador:"+navigator.platform;
    console.log("Nombre del navegador:"+navigator.appCodeName);
    console.log("Version del navegador:"+navigator.appVersion);
    console.log("Estatus de internet:"+navigator.onLine);
    console.log("Nombre del navegador:"+navigator.platform);
}