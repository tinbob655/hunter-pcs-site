import { initializeApp } from "firebase/app";

export function firebaseInit() {
    const firebaseConfig = {
      apiKey: "AIzaSyAePSfz7GW9ZoRW8BiQHQef8OsuoOKmDn0",
      authDomain: "hunter-pcs-firebase.firebaseapp.com",
      projectId: "hunter-pcs-firebase",
      storageBucket: "hunter-pcs-firebase.appspot.com",
      messagingSenderId: "229412490217",
      appId: "1:229412490217:web:3ef37c431381fbb0bdd978",
      measurementId: "G-D23909SXE6"
    };
    
    // Initialize Firebase
    initializeApp(firebaseConfig);
};
