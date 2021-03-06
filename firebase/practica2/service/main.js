const datosdelacuenta = document.getElementById('listaccount'); 
auth.onAuthStateChanged( user =>{     
if(user){  
       db.collection('usuarios').doc(user.uid).get().then( doc =>{
           const html = `
               <p class="hint-text">Nombre: ${ doc.data().nombre }</p>
               <p class="hint-text">Correo: ${ doc.data().correo}</p>
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
    var uid = sessionStorage.getItem("uid");
    auth.signOut().then(()=>{  
        sessionStorage.removeItem("uid");
        return db.collection('usuarios').doc(uid).update({ 
            "estado":parseInt(0),
            "dateInOut":new Date().toLocaleString()
        }); 
        
    });

});
function consultarmapa(){ 
    var divsToHide = document.getElementsByClassName("bannerimagenes"); 
    for(var i = 0; i < divsToHide.length; i++){ 
        divsToHide[i].style.display = "none"; 
    }
    var divsToHide1 = document.getElementsByClassName("bannermapactivedrestaurants");  
    for(var i = 0; i < divsToHide1.length; i++){ 
        divsToHide1[i].style.opacity = "1"; 
        divsToHide1[i].style.animation = "fade 1s"; 
        divsToHide1[i].style.display = "block"; 
    } 
    var divbanner=document.getElementsByClassName("banner-images");
    for(var i = 0; i < divbanner.length; i++){ 
        divbanner[i].style.height= "715px"; 
    }
}
function salirmapa(){ 
    var divsToHide = document.getElementsByClassName("bannermapactivedrestaurants");
    for(var i = 0; i < divsToHide.length; i++){ 
        divsToHide[i].style.opacity = "1"; 
        divsToHide[i].style.animation = "fade 1s"; 
        divsToHide[i].style.display = "none";
    }
    var divsToHide1 = document.getElementsByClassName("bannerimagenes"); 
    for(var i = 0; i < divsToHide1.length; i++){ 
        divsToHide1[i].style.display = "block"; 
    } 
    var divbanner=document.getElementsByClassName("banner-images");
    for(var i = 0; i < divbanner.length; i++){ 
        divbanner[i].style.height= "415px"; 
    }
}