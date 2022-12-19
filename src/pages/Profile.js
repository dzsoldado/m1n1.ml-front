import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

export default function Profile() {
  
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  function logOut(){
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/')
    }).catch((error) => {
      // An error happened.
    });
  }

  useEffect(() => {
    user??navigate('/signin')
  }, [])


  return (
    <div>
      Home page for current user <button onClick={()=>logOut()}>Logout</button>
      
      current user: {user?.email}
    </div>
    
  )
}
