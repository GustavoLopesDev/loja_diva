import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJFTyN-jXnKMOyl6bAgAImMYFXh6ewdyA",
  authDomain: "divafashion-630b5.firebaseapp.com",
  projectId: "divafashion-630b5",
  storageBucket: "divafashion-630b5.appspot.com", // Atenção nesse campo: storageBucket tem que ser ".appspot.com" e não ".firebasestorage.app"
  messagingSenderId: "1050199144616",
  appId: "1:1050199144616:web:f0b211a572bf233ba3ea9d",
  measurementId: "G-3MHQJ41KZ9",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app); // Agora app está declarado

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
