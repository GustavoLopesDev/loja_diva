import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseConfig"; // seu arquivo de configuração do Firebase

const storage = getStorage(app);

export async function uploadUserPhoto(userId, file) {
  try {
    const photoRef = ref(storage, `UsersFt/${userId}/profile.jpg`);
    await uploadBytes(photoRef, file);
    const url = await getDownloadURL(photoRef);
    return url;
  } catch (error) {
    console.error("Erro no upload da foto:", error);
    throw error;
  }
}
