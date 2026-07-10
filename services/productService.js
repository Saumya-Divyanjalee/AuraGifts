// services/productService.js
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const productsRef = collection(db, "products");

// CREATE
export const addProduct = async (product) => {
  const docRef = await addDoc(productsRef, {
    ...product,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// READ (one-time fetch)
export const getProducts = async () => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// READ (realtime listener - use in useEffect, returns unsubscribe function)
export const subscribeToProducts = (callback) => {
  return onSnapshot(productsRef, (snapshot) => {
    const products = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(products);
  });
};

// READ single product
export const getProductById = async (productId) => {
  const docSnap = await getDoc(doc(db, "products", productId));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

// UPDATE
export const updateProduct = async (productId, updatedFields) => {
  await updateDoc(doc(db, "products", productId), updatedFields);
};

// DELETE
export const deleteProduct = async (productId) => {
  await deleteDoc(doc(db, "products", productId));
};
