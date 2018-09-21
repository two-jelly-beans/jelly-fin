import firebase from '@firebase/app';
import 'firebase/firestore';

// A config file that contains your firebase project credentials (not included in the repo)
import config from './firebase-config.json';

// Initialize Cloud Firestore through Firebase
const app = firebase.initializeApp(config);

const db = firebase.firestore();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true,
});

// Add a document to a collection
db.collection("test-collection").add({
    title: 'This is the post title',
    content: 'This is the test post content. It should be longeeer...',
    date: new Date(),
})
    .then(docRef => console.log('Document written with ID: ', docRef))
    .catch(error => console.error('Error adding document: ', error));


export default app;