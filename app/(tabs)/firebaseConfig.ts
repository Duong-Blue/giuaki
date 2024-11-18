import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Cấu hình Firebase (Chỉ cần thông tin cần thiết cho Firestore)
const firebaseConfig = {
  apiKey: "AIzaSyCWaz8WOK-DrLRkC1La3C6Y8ID-waN90g4",
  authDomain: "gkandroid-afea0.firebaseapp.com",
  projectId: "gkandroid-afea0",
  storageBucket: "gkandroid-afea0.appspot.com",
  messagingSenderId: "699711306742",
  appId: "1:699711306742:web:d41468d304369c685825d7",
  measurementId: "G-P0YTMQGDV3"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Khởi tạo auth
const db = getFirestore(app); // Sử dụng getFirestore thay vì initializeFirestore

export { auth, db };
