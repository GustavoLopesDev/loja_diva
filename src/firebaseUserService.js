import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function getUserData(uid) {
  const docRef = doc(db, "users", uid);
  const snap = await getDoc(docRef);
  return snap.exists() ? snap.data() : null;
}

export async function saveUserData(uid, data) {
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, data, { merge: true });
}

export async function uploadUserPhoto(uid, file) {
  const storageRef = ref(storage, `users/${uid}/profile.jpg`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
