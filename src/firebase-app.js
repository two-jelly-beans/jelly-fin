import firebase from '@firebase/app';
import 'firebase/firestore';

// Imports a module without throwing and error
const tryRequire = (path) => {
    try {
        return require(`${path}`);
    } catch (err) {
        return null;
    }
};

// A config file that contains your firebase project credentials (not included in the repo)
const CONFIG = tryRequire('./firebase-config.json') || {
    apiKey: "AIzaSyAcq_Vr-wbCjctpWIXJdeXBHnQgSqCLRY8",
    authDomain: "jellyfin-a9ff6.firebaseapp.com",
    databaseURL: "https://jellyfin-a9ff6.firebaseio.com",
    projectId: "jellyfin-a9ff6",
    storageBucket: "",
    messagingSenderId: "505439361090"
};


// Initialize Cloud Firestore through Firebase
const app = firebase.initializeApp(CONFIG);

const db = firebase.firestore();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true,
});

// Add a document to a collection
db.collection("test-collection").add({
    title: 'This is the post title...',
    content: 'This is the test post content. It should be longeeer...',
    date: new Date(),
})
    .then(docRef => console.log('Document written with ID: ', docRef))
    .catch(error => console.error('Error adding document: ', error));


export default app;