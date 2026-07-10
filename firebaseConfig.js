// firebaseConfig.js
// 1. Go to https://console.firebase.google.com
// 2. Create a new project
// 3. Enable Authentication > Email/Password
// 4. Enable Firestore Database (start in test mode for development)
// 5. Project Settings > General > Your apps > Web app > copy the config below

import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkgIwug8Hu3Olp5IUKxjrUZHLV4pW-iHU",
  authDomain: "gift-app-4a520.firebaseapp.com",
  projectId: "gift-app-4a520",
  storageBucket: "gift-app-4a520.firebasestorage.app",
  messagingSenderId: "592311374853",
  appId: "1:592311374853:web:162eb480201a6ea87d786c",
};

const app = initializeApp(firebaseConfig);

// Persist auth session across app restarts using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };
