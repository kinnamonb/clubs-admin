import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBlVNB389Oojl7wIutaKyb4UV0vgPq1pCQ",
  authDomain: "cc4h-clubs.firebaseapp.com",
  projectId: "cc4h-clubs"
});

const database = firebase.firestore();
database.settings({ timestampsInSnapshots: true });
export { database };

export default firebase;
