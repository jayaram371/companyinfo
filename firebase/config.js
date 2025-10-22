import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9ikooOOt04dqjpGH0FmdDHh92u8u1kk4",
  authDomain: "companyinfoapp-68b94.firebaseapp.com",
  projectId: "companyinfoapp-68b94",
  storageBucket: "companyinfoapp-68b94.firebasestorage.app",
  messagingSenderId: "314583170323",
  appId: "1:314583170323:web:fe9aec932c61d4937f2ee6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;