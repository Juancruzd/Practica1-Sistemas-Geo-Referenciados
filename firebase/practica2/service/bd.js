// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAehJe1oQZOYjOWxWoMSAI1bASKm5uM7IY",
    authDomain: "jdk-67024.firebaseapp.com",
    databaseURL: "https://jdk-67024.firebaseio.com",
    projectId: "jdk-67024",
    storageBucket: "jdk-67024.appspot.com",
    messagingSenderId: "156274067262",
    appId: "1:156274067262:web:ce191148ff46b892f88e6f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig); 
const auth = firebase.auth(); 
const db = firebase.firestore();

