import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB0bPGwGk-COqwSRgGmtnkCgZAhKPFd8lQ",
    authDomain: "botforge-488814.firebaseapp.com",
    projectId: "botforge-488814",
    storageBucket: "botforge-488814.firebasestorage.app",
    messagingSenderId: "270670761517",
    appId: "1:270670761517:web:3b36905b644918f36432a4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
