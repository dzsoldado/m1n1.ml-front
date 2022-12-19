import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWyvZjqisTPNhjBt56OwkWMOXZrB8nszs",
  authDomain: "newagent-xuvwwy.firebaseapp.com",
  databaseURL: "https://newagent-xuvwwy.firebaseio.com",
  projectId: "newagent-xuvwwy",
  storageBucket: "newagent-xuvwwy.appspot.com",
  messagingSenderId: "1029445415029",
  appId: "1:1029445415029:web:7276586da8f716dc35883c",
  measurementId: "G-RNSBVG1RED"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { app, db, auth }
