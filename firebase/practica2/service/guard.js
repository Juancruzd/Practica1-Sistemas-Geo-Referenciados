auth.onAuthStateChanged( user =>{ 
    if(user){
        console.log('Usuario entró va para home');

        db.collection('platillos').onSnapshot(snapshot =>{
            console.log(snapshot.docs);
            //configuraMenu(user);
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
        ///location.replace("https://www.w3schools.com")
    }
    else{
        console.log('Usuario salió va para index login register'); 
        //location.replace("/index.html")
    }

});