const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.addTransaction = functions.https.onRequest((req, res) => {
  const timestamp = new Date().getTime()
  const data = req.body
  return admin.database().ref('/transactions').push({
    date: data.date,
    category: data.category,
    paymentMethod: data.paymentMethod,
    payee: data.payee,
    note: data.note,
    amount: data.amount,
    createdAt: timestamp,
    updatedAt: timestamp
  }).then((snapshot) => {
    return res.redirect(303, snapshot.ref.toString());
  });
});
