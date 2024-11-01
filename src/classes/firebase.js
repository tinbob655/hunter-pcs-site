import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "hunter-pcs-firebase.firebaseapp.com",
    projectId: "hunter-pcs-firebase",
    storageBucket: "hunter-pcs-firebase.appspot.com",
    messagingSenderId: "229412490217",
    appId: "1:229412490217:web:3ef37c431381fbb0bdd978",
    measurementId: "G-D23909SXE6"
};

initializeApp(firebaseConfig);

class Firebase {

    //make firebase variables private so they cannot be edited
    #firebaseAuth;
    #firebaseStorage;
    #firebaseFirestore

    constructor() {
        this.#firebaseAuth = getAuth();
        this.#firebaseStorage = getStorage();
        this.#firebaseFirestore = getFirestore();
    };

    get getFirebaseAuth() {
        return this.#firebaseAuth;
    };

    get getFirebaseStorage() {
        return this.#firebaseStorage;
    };

    get getFirebaseFirestore() {
        return this.#firebaseFirestore;
    };
};

const firebaseInstance = new Firebase();
export default firebaseInstance;