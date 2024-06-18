import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "./firebase.config";

const authContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //   gmail login setup :
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => res.json())
      .then((user) => console.log(user.email))
      .catch((e) => console.log(e.message));
  };

  //   email and password sign up setup:
  const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => res.json())
      .then((user) => {
        console.log("normal sign up : ", user.email);
      })
      .catch((e) => console.log(e.message));
  };

  //   email and password login setup:
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => res.json())
      .then((user) => console.log("logged in normally as : ", user.email))
      .catch((e) => console.log(e.message));
  };

  //   log out setup:
  const logout = () => {
    signOut(auth)
      .then(() => console.log("Logged Out"))
      .then((e) => console.log(e.message));
  };

  const values = { user, googleLogin, register, login, logout };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
