import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJFTyN-jXnKMOyl6bAgAImMYFXh6ewdyA",
  authDomain: "divafashion-630b5.firebaseapp.com",
  projectId: "divafashion-630b5",
  storageBucket: "divafashion-630b5-qwtku.appspot.com", // alterado para novo bucket
  messagingSenderId: "1050199144616",
  appId: "1:1050199144616:web:f0b211a572bf233ba3ea9d",
  measurementId: "G-3MHQJ41KZ9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app, "gs://divafashion-630b5-qwtku"); // explicitando bucket novo
const db = getFirestore(app);

export { app, auth, storage, db };
