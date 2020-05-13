const formaregistrate = document.getElementById('formaregistrate');

formaregistrate.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(formaregistrate['rcorreo'].value
    +"  "+formaregistrate['rcontrasena'].value
    +"  "+formaregistrate['rnombre'].value
    +"  "+formaregistrate['rtelefono'].value
    +"  "+formaregistrate['rdireccion'].value );

    const correo = formaregistrate['rcorreo'].value;
    const contrasena = formaregistrate['rcontrasena'].value;

    
    if (navigator.geolocation) {
        auth.createUserWithEmailAndPassword(correo,contrasena).then( cred =>{  
            uidcurrentusrer=cred.user.uid;
            navigator.geolocation.getCurrentPosition(function(position) { 
                var coordenadas = {
                    Latitud: position.coords.latitude, 
                    Longitud: position.coords.longitude
                } 
                return db.collection('usuarios').doc(cred.user.uid).set({
                    "nombre": formaregistrate['rnombre'].value,
                    "telefono": formaregistrate['rtelefono'].value,
                    "direccion": formaregistrate['rdireccion'].value,
                    "coordenadas":coordenadas,
                    "dateInOut":new Date().toLocaleString(),
                    "estado":parseInt(1)
                }).then(function() { 
                    formaregistrate.reset();
                    document.getElementById('errorregistrar').innerHTML = '';
                    ///window.location.replace("https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/index.html");
                }).catch(function(error) {
                        console.error("Error regitering document: ", error);
                });
            }, function(error) {
                console.log(error);
            });
        
        
    }).then( ()=>{ 
        
    }).catch( err => {
        console.log(err);
        document.getElementById('errorregistrar').innerHTML = mensajeError(err.code);
    });
    } else {
        console.log("error ubicacion");
    }
    

});