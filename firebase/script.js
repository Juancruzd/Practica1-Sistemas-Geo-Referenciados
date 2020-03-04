
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

        db.collection("productos").onSnapshot({
        // Listen for document metadata changes
        includeMetadataChanges: true
        }, function(snapshot) {
            ObtenerProductos();
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
                    
                    ///imprimir objeto en consola
                    //console.log(doc.id, " => ", doc.data());

                    var x = document.createElement("tr");
                    x.setAttribute("class", "");
                    x.setAttribute("id", "producto" + doc.id);

                    var id = document.getElementById('lista');
                    id.appendChild(x);


                    var tr = document.getElementById("producto" + doc.id);

                    var td1 = document.createElement("th");
                    td1.setAttribute("class", "");
                    td1.textContent =  doc.data().codigo;
                    td1.setAttribute("id", "codigo" + doc.id);
                    tr.appendChild(td1);

                    var td2 = document.createElement("td");
                    td2.setAttribute("class", "");
                    td2.textContent =  doc.data().nombre;
                    tr.appendChild(td2);

                    var td3 = document.createElement("td");
                    td3.setAttribute("id", "tdbutton" + doc.id);
                    tr.appendChild(td3);


                    var botonborrar = document.createElement("button");
                    botonborrar.setAttribute("value", "Eliminar");
                    botonborrar.setAttribute("class", "btn btn-danger m-1");
                    botonborrar.setAttribute("OnClick", "EliminarRegistro(" + JSON.stringify( doc.id )+ ")");
                    botonborrar.setAttribute("id", "botonborrar" + doc.id);
                    td3.appendChild(botonborrar);

                    var iborrar=document.createElement("i");
                    iborrar.setAttribute("class", "glyphicon glyphicon-trash");
                    iborrar.textContent =" Borrar";
                    botonborrar.appendChild(iborrar);


                    var botonactualizar = document.createElement("button");
                    botonactualizar.setAttribute("value", "Actualizar");
                    botonactualizar.setAttribute("class", "btn btn-success m-1");
                    botonactualizar.setAttribute("OnClick", "saveidlocalstorage(" + JSON.stringify( doc.id )+ ")");
                    botonactualizar.setAttribute("id", "botonactualizar" + doc.id);
                    td3.appendChild(botonactualizar);

                    var iactualizar=document.createElement("i");
                    iactualizar.setAttribute("class", "glyphicon glyphicon-pencil");
                    iactualizar.textContent =" Actualizar";
                    botonactualizar.appendChild(iactualizar);



                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        }
        function agregarRegistro(){
            var codigo = $('#txtCodigo').val();
            var nombre = $('#txtNombre').val();
            if (parseInt(codigo) >0 && nombre !=""){
            // Add a new document in collection "cities"
            db.collection("productos").add({
                codigo: parseInt(codigo),
                nombre: nombre
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            }else{
                console.error("Ingrese Codigo y Nombre ");
            }
        }
        function EliminarRegistro(id){
                db.collection("productos").doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
        }
        function saveidlocalstorage(id){
            ///delete
            localStorage.removeItem("iddocumentupdate");
            // Store
            localStorage.setItem("iddocumentupdate", id);
            document.getElementById('txtCodigoupdate').value = "";
            document.getElementById('txtNombreupdate').value = "";
            $("#myModal").modal('show');
        }
        function cancelarActualizacion(){
            ///delete
            localStorage.removeItem("iddocumentupdate");
        }
        function ActualizarRegistro(){
                var id = localStorage.getItem("iddocumentupdate");
                var codigo = $('#txtCodigoupdate').val();
                var nombre = $('#txtNombreupdate').val();
                if(parseInt(codigo) >0 && nombre!="" && id != ""){
                    db.collection("productos").doc(id).update({
                "codigo": parseInt(codigo),
                "nombre": nombre
                }).then(function() {
                console.log("Document successfully updated!");
                $("#myModal").modal('hide');
                }).catch(function(error) {
                    console.error("Error updating document: ", error);
                });
                }else{
                    console.error("Ingrese codigo y nombre valido y el id");
                }
                
        }
    