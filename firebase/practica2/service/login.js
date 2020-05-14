function mensajeError(codigo) {

    let mensaje = '';

    switch(codigo) {
        case 'auth/wrong-password':
          mensaje = 'Su contraseña no es correcta';
          break;
        case 'auth/user-not-found':
            mensaje = 'El usuario no existe o el correo no esta registrado';
            break;
        case 'auth/weak-password':
            mensaje = 'Contraseña débil debe tener al menos 6 caracteres';
            break;
        case 'auth/network-request-failed':
            mensaje = 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.';
            break;
        case 'auth/weak-password':
            mensaje = 'Password should be at least 6 characters';
            break;
        case 'auth/email-already-in-use':
            mensaje = 'The email address is already in use by another account.';
            break;
        default:
            mensaje = 'Ocurrió un error al ingresar con este usuario';
      }
    return mensaje;
}
const formaingresar =  document.getElementById('formaingresar');

formaingresar.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(formaingresar['correo'].value
    +"  "+formaingresar['contrasena'].value );

    
    let correo = formaingresar['correo'].value;
    let contrasena = formaingresar['contrasena'].value;

    if (navigator.geolocation) {
        auth.signInWithEmailAndPassword(correo,contrasena).then( cred =>{ 
            uidcurrentusrer=cred.user.uid;
        formaingresar.reset(); 
        document.getElementById('erroringrear').innerHTML = '';
        console.log(cred); 
            navigator.geolocation.getCurrentPosition(function(position) { 
                var coordenadas = {
                    Latitud: position.coords.latitude, 
                    Longitud: position.coords.longitude
                } 
                return db.collection('usuarios').doc(cred.user.uid).update({
                    "coordenadas":coordenadas,
                    "estado":parseInt(1),
                    "dateInOut":new Date().toLocaleString()
                });
                iniciaMapa();
            }, function(error) { 
                console.log(error);
            });
        
        ///window.location.replace("https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/index.html");
    }).catch( err => {  
        document.getElementById('erroringrear').innerHTML = mensajeError(err.code);
        console.log(err);
    });
    } else {
        console.log("error ubicacion");
    }
    
});





entrarGoogle = () => {
 
    var provider = new firebase.auth.GoogleAuthProvider(); 
    firebase.auth().signInWithPopup(provider).then(function(result) {

        var token = result.credential.accessToken;
        console.log(token);

        var user = result.user;

            console.log(user);
            const html = `
                <p>Nombre: ${ user.displayName }</p>
                <p>Correo: ${ user.email}</p>
                <img src="${ user.photoURL }" width="50px">
            `;
            datosdelacuenta.innerHTML = html; 
            formaingresar.reset();
            document.getElementById('error').innerHTML = '';


        // ...
        }).catch(function(error) {
            console.log(error);
    });

}