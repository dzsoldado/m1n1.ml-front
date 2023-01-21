import React, { useEffect, useState } from 'react'
import { getAuth, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from './firebase';
import {CircularProgress} from "@mui/material";
const auth = getAuth(app)

export const AuthContext = React.createContext(null);

export default function AuthProvider({children}) {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const context = {
    currentUser,
    signOut,
    signUp,
    signIn
  }

  function signOut(){
    return firebaseSignOut(auth);
  }

  function signUp(email, password){
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function signIn(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  },[])

  return (
    <AuthContext.Provider value={context}>
      {loading? <CircularProgress sx={{ mt: 2, mb: 2 }} /> : children}  
    </AuthContext.Provider>
  )
}
