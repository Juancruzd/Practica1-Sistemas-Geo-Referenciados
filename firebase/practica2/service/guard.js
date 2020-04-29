var userlogin;


auth.onAuthStateChanged( user =>{ 
    const queryString = window.location.search; 
    console.log(queryString);
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
        ///location.replace("https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/home.html")
    }
    else{
        console.log('Usuario salió va para index login register'); 
        //location.replace("https://juancruzd.github.io/Practica1-Sistemas-Geo-Referenciados/firebase/practica2/index.html")
    }

});