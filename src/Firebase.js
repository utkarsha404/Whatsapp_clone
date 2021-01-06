import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDdhrjbSRTJD0L12Puy84YyC-NeJGkqYSI",
    authDomain: "whatsapp-ec7bf.firebaseapp.com",
    projectId: "whatsapp-ec7bf",
    storageBucket: "whatsapp-ec7bf.appspot.com",
    messagingSenderId: "523520436961",
    appId: "1:523520436961:web:914be3e4dbdf410575e5a0",
    measurementId: "G-FSER113XRE"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;