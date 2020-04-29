///const datosdelacuenta = document.querySelector('.datosdelacuenta'); 
    if(userlogin){  
       db.collection('usuarios').doc(userlogin.uid).get().then( doc =>{
           const html = `
               <p>Nombre: ${ doc.data().nombre }</p>
               <p>Correo: ${ userlogin.email}</p>
               <p>Teléfono: ${ doc.data().telefono }</p>
               <p>Dirección: ${ doc.data().direccion }</p>
           `;
           ////datosdelacuenta.innerHTML = html;
       });

       document.getElementById("linksalir").style.display = 'block';
       document.getElementById("linkmicuenta").style.display = 'block';
    }
    else
    {
       ///datosdelacuenta.innerHTML = '';
       document.getElementById("linksalir").style.display = 'none';
        document.getElementById("linkmicuenta").style.display = 'none';
    } 
    
const salir = document.getElementById('salir');
salir.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        alert("El usuario ha salido del sistema");
    });

});
