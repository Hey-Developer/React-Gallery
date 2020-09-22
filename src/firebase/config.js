import * as firebase from "firebase";
import "firebase/storage"; // for storing our images..
import "firebase/firestore"; // for database

// It is our firebase initialization code but to execute the following we have to first install firebase in frontend also.. |^
//? TO do that npm install firebase and then import the files...
var firebaseConfig = {
  apiKey: "AIzaSyBOApVhmVbIc_-0Lzacgs9mWrfLrOD3nVA",
  authDomain: "cloves-gallery.firebaseapp.com",
  databaseURL: "https://cloves-gallery.firebaseio.com",
  projectId: "cloves-gallery",
  storageBucket: "cloves-gallery.appspot.com",
  messagingSenderId: "397817893904",
  appId: "1:397817893904:web:402215c202ff4b492ba695",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Now its time to initialize storage and database service..

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp; // we are creating a timestamp for our images url record..

// Now we will export our two service so that we can use it in other files..
export { projectStorage, projectFirestore, timestamp };
