// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // IMPORTAR Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCJFTyN-jXnKMOyl6bAgAImMYFXh6ewdyA",
  authDomain: "divafashion-630b5.firebaseapp.com",
  projectId: "divafashion-630b5",
  storageBucket: "divafashion-630b5.appspot.com",

  messagingSenderId: "1050199144616",
  appId: "1:1050199144616:web:f0b211a572bf233ba3ea9d",
  measurementId: "G-3MHQJ41KZ9",
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços que precisa
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app); // CRIA a instância do Firestore

// Exporta para usar em outros arquivos
export { app, auth, storage, db };
