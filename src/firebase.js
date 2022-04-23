import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCjUGiVn1X-CDnnEncizZ4QCVaYZcAJjmw",
    authDomain: "datings-e7077.firebaseapp.com",
    projectId: "datings-e7077",
    storageBucket: "datings-e7077.appspot.com",
    messagingSenderId: "278783351769",
    appId: "1:278783351769:web:5cd8cdae6380827d2b97c8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
