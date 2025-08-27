import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAM695ZloM9ziAYGUm_jyfJ7M8JK1WU29E',
  authDomain: 'vinfas-7fc94.firebaseapp.com',
  projectId: 'vinfas-7fc94',
  storageBucket: 'vinfas-7fc94.firebasestorage.app',
  messagingSenderId: '953620575264',
  appId: '1:953620575264:web:b5ff6b72110aa0f6f6b845',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

// Tự đăng nhập ẩn danh sớm
const authReady = new Promise(resolve => {
  auth.onAuthStateChanged(async u => {
    if (u) return resolve(u);
    try {
      await auth.signInAnonymously();
    } catch (e) {
      console.error('signInAnonymously error:', e);
    }
    // onAuthStateChanged sẽ gọi lại và resolve
  });
});

export { db, storage, auth, firebase, authReady };
