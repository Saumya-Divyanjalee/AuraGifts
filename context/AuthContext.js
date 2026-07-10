// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { login as loginService, signup as signupService, logout as logoutService } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [loading, setLoading] = useState(true); // true while checking auth state on app start
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          setIsAdmin(userDoc.exists() && userDoc.data().isAdmin === true);
          setPhotoURL(userDoc.exists() ? userDoc.data().photoURL || null : null);
        } catch (e) {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
        setPhotoURL(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const login = async (email, password) => {
    setError(null);
    try {
      setLoading(true);
      await loginService(email, password);
    } catch (e) {
      setError(mapAuthError(e.code));
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setError(null);
    try {
      setLoading(true);
      await signupService(name, email, password);
    } catch (e) {
      setError(mapAuthError(e.code));
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutService();
  };

  return (
     <AuthContext.Provider value={{ user, isAdmin, photoURL, setPhotoURL, loading, error, login, signup, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Convert Firebase error codes to friendly messages
function mapAuthError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    default:
      return "Something went wrong. Please try again.";
  }
}
