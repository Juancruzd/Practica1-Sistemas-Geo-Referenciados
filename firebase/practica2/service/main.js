const datosdelacuenta = document.getElementById('listaccount'); 
auth.onAuthStateChanged( user =>{     
if(user){  
       db.collection('usuarios').doc(user.uid).get().then( doc =>{
           const html = `
               <p class="hint-text">Nombre: ${ doc.data().nombre }</p>
               <p class="hint-text">Correo: ${ user.email}</p>
               <p class="hint-text">Teléfono: ${ doc.data().telefono }</p>
               <p class="hint-text">Dirección: ${ doc.data().direccion }</p>
           `; 
           datosdelacuenta.innerHTML = html;
       }); 
       document.getElementById("linkmicuenta").style.display = 'block';
    }
    else
    {
     datosdelacuenta.innerHTML = '';  
     document.getElementById("linkmicuenta").style.display = 'none';
    } 
});
const salir = document.getElementById('linksalir');
salir.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        
    });

});
