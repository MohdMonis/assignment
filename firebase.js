var firebaseConfig = {
    apiKey: "AIzaSyBmv2owzeyfbetn0rw8eOfpHhH4uq04SQM",
    authDomain: "assignment-4f000.firebaseapp.com",
    projectId: "assignment-4f000",
    storageBucket: "assignment-4f000.appspot.com",
    messagingSenderId: "115334166208",
    appId: "1:115334166208:web:f3239bd231474a190edf25",
    measurementId: "G-M4YEBB0L89"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

firebase.analytics();


