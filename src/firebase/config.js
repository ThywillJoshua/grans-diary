import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChncOplNbfrSneRGQ_b4ZzdPUl_U51AbI",
  authDomain: "grans-diary.firebaseapp.com",
  projectId: "grans-diary",
  storageBucket: "grans-diary.appspot.com",
  messagingSenderId: "201912906674",
  appId: "1:201912906674:web:b7c98b8fba98aebf26aaab",
};

//initialize firebase
firebase.initializeApp(firebaseConfig);

//initialize services
const projectFirestore = firebase.firestore();

export { projectFirestore };
