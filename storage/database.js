const app_firebase = require('firebase/app');
const database_firebase = require('firebase/database');

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
    url: ""
};

// Initialize Firebase
const firebase = app_firebase.initializeApp(firebaseConfig);
const database = database_firebase.getDatabase(firebase, firebaseConfig.url);

exports.addLink_database = (hash, old_link) => {
    return database_firebase.set(database_firebase.ref(database, 'links/' + hash), old_link);
}

exports.getLink_database = (hash) => {
     return database_firebase.get(database_firebase.ref(database, 'links/' + hash));
}