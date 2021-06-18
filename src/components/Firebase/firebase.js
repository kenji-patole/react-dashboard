import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDR_WjA6waRxpfLpBawHy5sDrzadsvvkoY",
    authDomain: "food-app-1204e.firebaseapp.com",
    projectId: "food-app-1204e",
    storageBucket: "food-app-1204e.appspot.com",
    messagingSenderId: "548275671883",
    appId: "1:548275671883:web:b5880b5b937b6568e58ece"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
        this.db = app.firestore()
        this.storage = app.storage()
    }

    // INSCRIPTION
    signupUser = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password)
    

    // CONNEXION
    loginUser = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password)
    

    // DECONNEXION
    signoutUser = () => this.auth.signOut()

    // RÉCUPÉRER LE MOT DE PASSE
    passwordReset = email => this.auth.sendPasswordResetEmail(email)

    // BASE DE DONNÉES FIRESTORE
    user = uid => this.db.doc(`users/${uid}`);

    // GESTION DES MENUS
    queryMenu = () => this.db.collection("menu")
    queryMenus = () => this.queryMenu().orderBy('position','desc');
    queryOneMenu = (id) => this.queryMenu().doc(id);

   
    // GESTION DES PRODUITS
    queryProduit = () => this.db.collection("produits");
    queryProduits = () => this.queryProduit().orderBy('price','desc')
    queryOneProduit = (id) => this.queryProduit().doc(id)
    
}

export default Firebase