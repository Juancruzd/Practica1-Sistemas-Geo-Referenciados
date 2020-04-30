var userlogin;

const url=window.location.href;
auth.onAuthStateChanged( user =>{  
    console.log(url);
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
    } 

});