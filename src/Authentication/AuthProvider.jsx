import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
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
  const googleLogin = signInWithPopup(auth, googleProvider)
    .then((res) => res.json())
    .then((user) => console.log(user.email))
    .catch((e) => console.log(e.message));

  //   email and password sign up setup:
  const signUp = (email, password) => {
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

  const values = { user, googleLogin, signUp, login };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
