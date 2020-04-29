var userlogin;

const url=window.location.href;
auth.onAuthStateChanged( user =>{  
    console.log(JSON.stringify(url));
    if(user){
        userlogin=user; 

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
        
        
        if(JSON.stringify(url)=="https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/home.html"){ 
            
        }
        else{
            console.log('Usuario login home'); 
            ///location.replace("https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/home.html")
            
        }
    }
    else{
        
        if(JSON.stringify(url)=="https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/index.html"){ 

        }
        else{
            console.log('Usuario logout index login register');  
            //location.replace("https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/index.html")
        }
    }

});