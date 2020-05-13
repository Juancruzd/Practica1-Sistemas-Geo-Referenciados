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
       document.getElementById("linkingresar").style.display = 'none';
       document.getElementById("linkregistro").style.display = 'none';
       document.getElementById("linkingresar2").style.display = 'none';
       document.getElementById("linkregistro2").style.display = 'none'; 
    }
    else
    {
     datosdelacuenta.innerHTML = '';  
     document.getElementById("linkmicuenta").style.display = 'none';
     document.getElementById("linkingresar").style.display = 'block';
     document.getElementById("linkregistro").style.display = 'block';
     
     document.getElementById("linkingresar2").style.display = 'block';
     document.getElementById("linkregistro2").style.display = 'block'; 
    } 
});
const salir = document.getElementById('linksalir');
salir.addEventListener('click', (e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        return db.collection('usuarios').doc(uidcurrentusrer).update({ 
            "estado":parseInt(0),
            "dateInOut":new Date().toLocaleString()
        });
    });

});
function consultarmapa(){ 
    var divsToHide = document.getElementsByClassName("bannerimagenes"); //divsToHide is an array
    for(var i = 0; i < divsToHide.length; i++){ 
        divsToHide[i].style.display = "none"; // depending on what you're doing
    }
    var divsToHide1 = document.getElementsByClassName("bannermapactivedrestaurants"); //divsToHide is an array
    for(var i = 0; i < divsToHide1.length; i++){ 
        divsToHide1[i].style.display = "block"; // depending on what you're doing
    } 
}