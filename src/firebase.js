import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAzqL3k4LbYGyekF2NHpnFBHNNKuRa72Ks",
    authDomain: "herbal-digest.firebaseapp.com",
    projectId: "herbal-digest",
    storageBucket: "herbal-digest.appspot.com",
    messagingSenderId: "911947160069",
    appId: "1:911947160069:web:693e32478e787346e51a6c",
    measurementId: "G-HSGLWRJFJ4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;