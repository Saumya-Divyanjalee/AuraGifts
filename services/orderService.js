// services/orderService.js
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const ordersRef = collection(db, "orders");

// CREATE a new order (this is the core "transaction")
export const createOrder = async (userId, items, totalAmount) => {
  const docRef = await addDoc(ordersRef, {
    userId,
    items, // array of { productId, name, price, quantity, image }
    totalAmount,
    status: "pending", // pending -> paid -> shipped -> delivered
    paymentMethod: "mock", // change to "payhere" once real gateway is wired in
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// READ - realtime order history for one user
export const subscribeToUserOrders = (userId, callback) => {
  const q = query(ordersRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(orders);
  });
};

// UPDATE order status (e.g. after payment confirmation)
export const updateOrderStatus = async (orderId, status) => {
  await updateDoc(doc(db, "orders", orderId), { status });
};
