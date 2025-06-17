import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getUserData = async (uid) => {
  if (!uid) throw new Error("UID inválido para buscar dados.");
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Erro ao buscar dados do usuário [${uid}]:`, error);
    throw error;
  }
};

export const saveUserData = async (uid, data) => {
  if (!uid) throw new Error("UID inválido para salvar dados.");
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error(`Erro ao salvar dados do usuário [${uid}]:`, error);
    throw error;
  }
};
