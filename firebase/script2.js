document.getElementById("mapapanel").classList.add("active");
    document.getElementById("editarpanel").style.display = "none";
    document.getElementById("mapapanel").style.display = "block";
	function tab1(){
		$('#li2').removeClass('active');
		$('#li1').addClass('active');
        $('#editarpanel').removeClass('active');
		$('#editarpanel').hide();
		$('#mapapanel').addClass('active');
        $('#mapapanel').show();
	};
    function tab2(){
        $('#li1').removeClass('active');
		$('#li2').addClass('active');
		$('#mapapanel').removeClass('active');
		$('#mapapanel').hide();
		$('#editarpanel').addClass('active');
        $('#editarpanel').show();
	};
  

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

        var intervalCarga=null;
        var intervalIniciarsesion=null;
        var intervalRegistro=null;
        var intervalload=null;
        ////Obtener lista de productos
        $(document).ready(function () {
            var id = localStorage.getItem("iddocumentupdate");
            if(id!=null){
                var nombreusuario=localStorage.getItem("nombreusuario");
                document.getElementById('txtProfilename').innerHTML = nombreusuario;
                if (navigator.geolocation) {
                    if(intervalload!=null){
                        clearInterval(intervalload);
                    }
                    iniciaMapa();
                    if(intervalIniciarsesion!=null){
                        clearInterval(intervalIniciarsesion);
                    }
                    
                    if(intervalRegistro!=null){
                        clearInterval(intervalRegistro);
                    }
                    if(intervalCarga!=null){
                        clearInterval(intervalCarga);
                    }
                    intervalCarga =  setInterval(function() {
                    actualizarPosicion();
                    }, 1000);
                } 
            }
            else{
            document.getElementById("contendorusuario").style.display = "none";
            $("#loginModal").modal({backdrop: 'static', keyboard: false});
            }
        });
        function IniciarSesion(){
            var usuario = $('#txtUsuariologin').val();
            var contrasena =sha256( $('#txtContrasenalogin').val());
            if (usuario !="" && contrasena !=""){

            db.collection("personamovil").where("usuario", "==", usuario).where("contrasena", "==",contrasena).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                        $('#contendorusuario').show();
                       $("#loginModal").modal('hide');
                        document.getElementById('txtUsuariologin').value = "";
                        document.getElementById('txtContrasenalogin').value = "";
                        
                        document.getElementById('txtProfilename').innerHTML = doc.data().nombre+" "+doc.data().apellido;
                        // doc.data() is never undefined for query doc snapshots
                        
                        ///imprimir objeto en consola
                        //console.log(doc.id, " => ", doc.data());
                        localStorage.removeItem("iddocumentupdate");
                        localStorage.setItem("iddocumentupdate", doc.id);
                        localStorage.removeItem("nombreusuario");
                        localStorage.setItem("nombreusuario", doc.data().nombre+" "+doc.data().apellido);
                        if (navigator.geolocation) {
                            iniciaMapa();
                        intervalIniciarsesion= setInterval(function() {
                        actualizarPosicion();
                        }, 1000);
                        } 
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
            
            }else{
                console.error("Ingrese Usuario y Contrasena ");
            }
        }
        function actualizarPosicion() {
                    navigator.geolocation.getCurrentPosition( posicion => {
                    var id = localStorage.getItem("iddocumentupdate");
                    var coordenadas = {
                    Latitud: posicion.coords.latitude, 
                    Longitud: posicion.coords.longitude
                    }
                    if(posicion.coords.latitude!="" && posicion.coords.longitude!="" && id != null){
                        db.collection("personamovil").doc(id).update({
                    "coordenadas": coordenadas,
                    "estado":parseInt(1)
                    }).then(function() {
                    console.log("Document successfully updated!");
                    }).catch(function(error) {
                        console.error("Error updating document: ", error);
                    });
                    }else{
                        location.reload();
                        console.error("No hay datos para actualizar");
                    }
                    });
        }
        function Registrarse(){
            var usuario = $('#txtUsuarioregistro').val();
            var contrasena = sha256($('#txtContrasenaregistro').val());
            var nombre = $('#txtNombreregistro').val();
            var apellido = $('#txtApellidoregistro').val();
            if (usuario !="" && contrasena !="" && nombre !="" && apellido !=""){
            
            db.collection("personamovil").where("usuario", "==",usuario).get()
            .then(function (querySnapshot) {

                if(querySnapshot.size>0){
                    document.getElementById('txtUsuarioregistro').value = ""; 
                }
                else{
                    var coordenadas = {
                    Latitud: 0, 
                    Longitud: 0
                    }
                    // Add a new document in collection "cities"
                db.collection("personamovil").add({
                    usuario:usuario,
                    contrasena:contrasena,
                    nombre: nombre,
                    apellido:apellido,
                    estado:parseInt(1),
                    coordenadas:coordenadas
                })
                .then(function(docRef) {
                    document.getElementById('txtProfilename').innerHTML = nombre+" "+apellido;
                    localStorage.removeItem("nombreusuario");
                    localStorage.setItem("nombreusuario", nombre+" "+apellido);
                    console.log("Document written with ID: ", docRef.id);
                    $('#contendorusuario').show();
                    $("#registroModal").modal('hide');
                    document.getElementById('txtUsuarioregistro').value = "";
                    document.getElementById('txtNombreregistro').value = "";
                    document.getElementById('txtApellidoregistro').value = "";

                    localStorage.removeItem("iddocumentupdate");
                    localStorage.setItem("iddocumentupdate", docRef.id);
                    if (navigator.geolocation) {
                        iniciaMapa();
                   intervalRegistro= setInterval(function() {
                    actualizarPosicion();
                    }, 1000);
                    } 
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });

                }
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
            }else{
                console.error("todos los datos para registro");
            }
        }
        function cerrarsesion(){
                    var id = localStorage.getItem("iddocumentupdate");
                    db.collection("personamovil").doc(id).update({
                    "estado":parseInt(0)
                    }).then(function() {
                    console.log("Document successfully updated!");
                    localStorage.removeItem("iddocumentupdate");
                    localStorage.removeItem("nombreusuario");
                    location.reload();

                    }).catch(function(error) {
                        console.error("Error updating document: ", error);
                    });
        }
        function ActualizarContrasena(){
                var id = localStorage.getItem("iddocumentupdate");
                var contrasenanueva = $('#txtContrasenaUpdate').val();
                if( contrasenanueva!="" && id != null){

                    db.collection("personamovil").doc(id).update({
                "contrasena": sha256(contrasenanueva)
                }).then(function() {
                console.log("Document successfully updated!");
                document.getElementById('txtContrasenaUpdate').value = ""; 
                }).catch(function(error) {
                    console.error("Error updating document: ", error);
                });
                }else{
                    console.error("Ingrese la contrasena");
                }
                
        } 
        
        
        var map;
        var coordenadas = {
            lat: 0, 
            lng: 0
        }
        var propiedades = {
            center: coordenadas,
            zoom: 20
        }
        function iniciaMapa() {
            var id = localStorage.getItem("iddocumentupdate");
            if(id!=null){
                document.getElementById('titleemit').innerHTML = "Emitiendo ubicacion en tiempo real";
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
                    intervalload=setInterval(function() {
                        moverPosicion(marker);
                    }, 1000);
                }

            }
            else{
                document.getElementById('titleemit').innerHTML = "";
                if(intervalload!=null){
                        clearInterval(intervalload);
                }
            }
        }

        function moverPosicion(marker) {

        navigator.geolocation.getCurrentPosition( posicion => {
            var pos = {
            lat: posicion.coords.latitude,
            lng: posicion.coords.longitude
            };

            marker.setPosition( new google.maps.LatLng( posicion.coords.latitude, posicion.coords.longitude ) );
            map.panTo( new google.maps.LatLng( posicion.coords.latitude, posicion.coords.longitude ) );

            map.setCenter(pos);

        });

        }
    