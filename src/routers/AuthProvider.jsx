import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
const provider = new GoogleAuthProvider();
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const googleSingIn = () => {
    setLoader(true);
    return signInWithPopup(auth, provider);
  };
  const signInUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOutUser = () => {
    setLoader(true);
    return signOut(auth);
  };
  const updateUser = (name, photo) => {
    setLoader(true);
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email
      const loggedUser = {email : userEmail}
      console.log(loggedUser);


      setUser(currentUser);
      setLoader(false);
    //   if (currentUser) {
    //     axios.post('/jwt', loggedUser, {withCredentials: true})
    //     .then(res=>{
    //       console.log(res.data);
    //     })
    //   }
    //   else{
    //     axios.post('/logout', loggedUser, {withCredentials: true})
    //     .then(res=>{
    //       console.log(res.data);
    //     })
    //   }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    loader,
    user,
    signInUser,
    logOutUser,
    googleSingIn,
    createUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
