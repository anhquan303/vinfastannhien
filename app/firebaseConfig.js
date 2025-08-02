import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAM695ZloM9ziAYGUm_jyfJ7M8JK1WU29E",
  authDomain: "vinfas-7fc94.firebaseapp.com",
  projectId: "vinfas-7fc94",
  storageBucket: "vinfas-7fc94.firebasestorage.app",
  messagingSenderId: "953620575264",
  appId: "1:953620575264:web:b5ff6b72110aa0f6f6b845"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage };