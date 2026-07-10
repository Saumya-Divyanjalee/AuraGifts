// services/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export const updateProfilePhoto = async (uid, photoBase64) => {
  await setDoc(doc(db, "users", uid), { photoURL: photoBase64 }, { merge: true });
};
export const signup = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });

  // Also store a user profile document in Firestore
  await setDoc(doc(db, "users", userCredential.user.uid), {
    name,
    email,
    createdAt: serverTimestamp(),
  });

  return userCredential.user;
};

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};
