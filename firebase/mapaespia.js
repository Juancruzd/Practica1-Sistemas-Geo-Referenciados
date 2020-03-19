// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAehJe1oQZOYjOWxWoMSAI1bASKm5uM7IY",
    authDomain: "jdk-67024.firebaseapp.com",
    databaseURL: "https://jdk-67024.firebaseio.com",
    projectId: "jdk-67024",
    storageBucket: "jdk-67024.appspot.com",
    messagingSenderId: "156274067262",
    appId: "1:156274067262:web:ce191148ff46b892f88e6f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
////
var db = firebase.firestore();
//const productoslista = document.querySelector("#lista");

db.collection("personamovil").onSnapshot({
// Listen for document metadata changes
includeMetadataChanges: true
}, function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        obtenerusuarios();
    if (change.type === "added") {
        console.log("New: ", change.doc.data());
    }
    if (change.type === "modified") {
        console.log("Modified: ", change.doc.data());
    }
    if (change.type === "removed") {
        console.log("Removed: ", change.doc.data());
    }
    });
});

var listOfObjects = [];
var interval=null;
function obtenerusuarios(){
db.collection("personamovil").where("estado", "==",1).get()
    .then(function (querySnapshot) {
        ///vaciar objetos
        listOfObjects=[];
        document.getElementById('lista').innerHTML = "";
        querySnapshot.forEach(function (doc) {
            var singleObj = {
                nombre:"",
                apellido:"",
                usuario:"",
                lat: 0, 
                lng: 0
            };
            singleObj.nombre = doc.data().nombre;
            singleObj.apellido = doc.data().apellido;
            singleObj.usuario = doc.data().usuario;
            singleObj.lat = doc.data().coordenadas.Latitud;
            singleObj.lng = doc.data().coordenadas.Longitud;
            listOfObjects.push(singleObj);

            var x = document.createElement("tr");
            x.setAttribute("class", "");
            x.setAttribute("id", "usuario" + doc.id);

            var id = document.getElementById('lista');
            id.appendChild(x);


            var tr = document.getElementById("usuario" + doc.id);

            var td1 = document.createElement("th");
            td1.setAttribute("class", "");
            td1.textContent =  doc.id;
            td1.setAttribute("id", "codigo" + doc.id);
            tr.appendChild(td1);

            var td2 = document.createElement("td");
            td2.setAttribute("class", "");
            td2.textContent =  doc.data().nombre +" "+doc.data().apellido;
            tr.appendChild(td2);

            var td3 = document.createElement("td");
            td3.setAttribute("id", "tdbutton" + doc.id);
            tr.appendChild(td3);


            var botonseleccionar = document.createElement("button");
            botonseleccionar.setAttribute("value", "Ver ubicacion");
            botonseleccionar.setAttribute("class", "btn btn-success m-1");
            botonseleccionar.setAttribute("OnClick", "Seleccionarusuariomapa(" + JSON.stringify( doc.id )+ ")");
            botonseleccionar.setAttribute("id", "botonborrar" + doc.id);
            td3.appendChild(botonseleccionar);

            var iseleccionar=document.createElement("i");
            iseleccionar.setAttribute("class", "glyphicon glyphicon-trash");
            iseleccionar.textContent =" Ver ubicacion";
            botonseleccionar.appendChild(iseleccionar);
        });
        //iniciaMapa();
           

    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

var coordenadasiniciales = {
lat: 0, 
lng: 0
}

var map;
var propiedades = {
    center: coordenadasiniciales,
    zoom: 40,
    mapTypeId: 'terrain'
}
function Seleccionarusuariomapa(id){
     ///delete
     localStorage.removeItem("idusuarioseleccionado");
    // Store
    localStorage.setItem("idusuarioseleccionado", id);
    if(interval!=null){
    clearInterval(interval);
    }
    iniciaMapa();
}

function iniciaMapa() {
    var id = localStorage.getItem("idusuarioseleccionado");
    if(id!=null){
    map = new google.maps.Map(document.getElementById('map'), propiedades);
    var icono = {
            url: "https://www.interbolivia.com/wp-content/uploads/2018/12/pulse.gif", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0,0) // anchor
        };

    var marker = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        icon: icono,
        scaledSize: new google.maps.Size(50, 50), 
        map: map
    });


    if (navigator.geolocation) {
       interval= setInterval(function() {
            moverPosicion(marker);
        }, 1000);
    }  
    }

}

function moverPosicion(marker) {
   
    var id = localStorage.getItem("idusuarioseleccionado");
    if(id!=null){
    db.collection("personamovil").doc(id).get()
            .then(function(doc) {
                var pos = {
                lat: 0,
                lng: 0
                };
                if(doc.data().estado==1){
                    pos.lat=doc.data().coordenadas.Latitud;
                    pos.lng=doc.data().coordenadas.Longitud;
                    marker.setPosition( new google.maps.LatLng( pos.lat, pos.lng ) );
                    marker.setMap(map);
                    map.panTo( new google.maps.LatLng( pos.lat, pos.lng) );
                    map.setCenter(pos);
                }
                else{
                ///delete
                localStorage.removeItem("idusuarioseleccionado");
                    marker.setMap(null);
                    
                }
                }).catch(function(error) {
                    console.error("Error getting document: ", error);
                });
    }
    
}