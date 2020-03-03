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
const productoslista = document.querySelector("#lista");

////Obtener lista de productos
$(document).ready(function () {
    ObtenerProductos();
});
function ObtenerProductos(){
db.collection("productos").orderBy("codigo", "asc").get()
    .then(function (querySnapshot) {
        
        document.getElementById('lista').innerHTML = "";
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            var x = document.createElement("tr");
            x.setAttribute("class", "");
            x.setAttribute("id", "producto" + doc.id);
            var id = document.getElementById('lista');
            id.append(x);


            var tr = document.getElementById("producto" + doc.id);

            var td1 = document.createElement("th");
            td1.setAttribute("class", "");
            td1.textContent =  doc.data().codigo;
            td1.setAttribute("id", "codigo" + doc.id);
            tr.append(td1);

            var td2 = document.createElement("td");
            td2.setAttribute("class", "");
            td2.textContent =  doc.data().nombre;
            tr.append(td2);

            var td3 = document.createElement("td");
            td3.setAttribute("id", "tdbutton" + doc.id);
            tr.append(td3);


            var boton = document.createElement("button");
            boton.setAttribute("value", "Eliminar");
            boton.setAttribute("class", "btn btn-danger");
            boton.setAttribute("OnClick", "EliminarRegistro(" + JSON.stringify( doc.id )+ ")");
            boton.setAttribute("id", "boton" + doc.id);
            td3.append(boton);

            var i=document.createElement("i");
            i.setAttribute("class", "glyphicon glyphicon-trash");
            i.textContent =" Borrar";
            boton.append(i);

        });

        
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}
function agregarRegistro(){
    var codigo = $('#txtCodigo').val();
    var nombre = $('#txtNombre').val();
    if (codigo !='' && nombre !=""){
    // Add a new document in collection "cities"
    db.collection("productos").add({
        codigo: parseInt(codigo),
        nombre: nombre
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        ObtenerProductos();
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    }else{

    }
}
function EliminarRegistro(id){
        db.collection("productos").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        ObtenerProductos();
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
}