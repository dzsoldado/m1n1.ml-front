import React, { useEffect, useState } from 'react'
import { signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

export const AuthContext = React.createContext(null);

export default function AuthProvider({children}) {

  const [currentUser, setCurrentUser] = useState(null);

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
    const unsubscribe = auth.onAuthStateChanged(setCurrentUser);
    return unsubscribe;
  },[])

  return (
    <AuthContext.Provider value={context}>
      {children}  
    </AuthContext.Provider>
  )
}
