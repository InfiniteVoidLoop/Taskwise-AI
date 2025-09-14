import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: 'AIzaSyB7bjizWdGwz2cLmQBeNJaQvQ2q35sLBrg',
    authDomain: 'note-taking-aa786.firebaseapp.com',
    databaseURL:  'https://note-taking-aa786-default-rtdb.firebaseio.com',
    projectId: 'note-taking-aa786',
    storageBucket: 'note-taking-aa786.firebasestorage.app',
    messagingSenderId: '806216812895',
    appId: '1:806216812895:web:8d3154c2904474acd80eea',
    measurementId:'G-5108GDVHY0'
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);