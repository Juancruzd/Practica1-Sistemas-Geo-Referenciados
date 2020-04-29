var userlogin;

const url=window.location.href;
auth.onAuthStateChanged( user =>{  
    console.log(window.location.href);
    if(user){
        userlogin=user;
        console.log('Usuario entró va para home');

        db.collection('platillos').onSnapshot(snapshot =>{
            console.log(snapshot.docs); 
        }, err => {
            console.log(err.message);
        }); 
        var name, email, photoUrl, uid, emailVerified; 

        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;   
        console.log(name,email,photoUrl,emailVerified,uid);
        
        
        if(url=="https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/home.html"){ 
        }
        else{
            console.log('Usuario salió va para index login register'); 
            ///location.replace("https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/home.html")
        }
    }
    else{
        
        if(url=="https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/index.html"){ 
        }
        else{
            console.log('Usuario salió va para index login register'); 
            //location.replace("https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/index.html")
        }
    }

});