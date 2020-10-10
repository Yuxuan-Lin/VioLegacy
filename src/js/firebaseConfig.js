import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBiCwymuT8cMZHBqG2csQ7OnDHsyyhrhl4",
    authDomain: "violegacy-26a40.firebaseapp.com",
    databaseURL: "https://violegacy-26a40.firebaseio.com",
    projectId: "violegacy-26a40",
    storageBucket: "violegacy-26a40.appspot.com",
    messagingSenderId: "49331994721",
    appId: "1:49331994721:web:ab5255883b3f9b077a2a20",
    measurementId: "G-R9G1V3E3RE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {db, storage, timestamp, auth}