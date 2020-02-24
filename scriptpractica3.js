
var x="";
function getLocation(){
    x = document.getElementById("demo");
if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(showPosition);

}
else{
    x.innerHTML ="No tiene geolocalizacions";
}
}
function showPosition(position){
    x.innerHTML = "Latitud" + position.coords.latitude + "<br>"+ "Longitud: " + position.coords.longitude;
}