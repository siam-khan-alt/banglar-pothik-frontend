import {useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/Firbase.config";


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const SignUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const profileUpdate = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    });
  };

  const Login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const SignInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const PasswordReset = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  
  const Logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Current User:", currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    setUser,
    SignUp,
    Login,
    Logout,
    profileUpdate,
    PasswordReset,
    SignInGoogle,
  };

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;