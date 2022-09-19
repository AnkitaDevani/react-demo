import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyCAeKo39LWM32dLjRZ_CZJJq1s9WOi61EM",
    authDomain: "fir-login-78951.firebaseapp.com",
    projectId: "fir-login-78951",
    storageBucket: "fir-login-78951.appspot.com",
    messagingSenderId: "921351756958",
    appId: "1:921351756958:web:4f460ccced4b01ed616f8f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initialize Firebase
export {db};