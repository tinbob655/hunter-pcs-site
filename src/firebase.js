import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "hunter-pcs-firebase.firebaseapp.com",
  projectId: "hunter-pcs-firebase",
  storageBucket: "hunter-pcs-firebase.appspot.com",
  messagingSenderId: "229412490217",
  appId: "1:229412490217:web:3ef37c431381fbb0bdd978",
  measurementId: "G-D23909SXE6"
};

const app = initializeApp(firebaseConfig);

export function firebaseInit() {
  initializeApp(firebaseConfig);
};
