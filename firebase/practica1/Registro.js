class Registro{
    constructor(){
    };
    Obtener(){
        db.collection("productos").orderBy("codigo", "asc").get()
            .then(function (querySnapshot) {
                
                document.getElementById('lista').innerHTML = "";
                querySnapshot.forEach(function (doc) {

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
    Registrar(codigo,nombre){
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
    }
    Eliminar(id){
        db.collection("productos").doc(id).delete().then(function() {
                console.log("Document successfully deleted!");
        }).catch(function(error) {
                    console.error("Error removing document: ", error);
        });
    }
    Actualizar(id,codigo,nombre){
        db.collection("productos").doc(id).update({
        "codigo": parseInt(codigo),
        "nombre": nombre
        }).then(function() {
        console.log("Document successfully updated!");
        
        }).catch(function(error) {
        console.error("Error updating document: ", error);
        });        
    }
}