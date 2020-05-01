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

    auth.createUserWithEmailAndPassword(correo,contrasena).then( cred =>{
        console.log(cred.user.uid);
        return db.collection('usuarios').doc(cred.user.uid).set({
            nombre: formaregistrate['rnombre'].value,
            telefono: formaregistrate['rtelefono'].value,
            direccion: formaregistrate['rdireccion'].value
        });
    }).then( ()=>{ 
        formaregistrate.reset();
        document.getElementById('errorregistrar').innerHTML = '';
        window.location.replace("https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/index.html");
    }).catch( err => {
        console.log(err);
        document.getElementById('errorregistrar').innerHTML = mensajeError(err.code);
    });


});