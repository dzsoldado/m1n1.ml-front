import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth';

export default function Profile() {
  const Navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.currentUser??Navigate('/signin')
  }, [])

  function handleLogout(e){
    authContext.signOut()
    .then(() => { 
      Navigate('/')
    })
    .catch((error) => {
      console.log("%c"+JSON.stringify({code: error.code, message: error.message}), 'color: red;')
    });
  }

  return (
    <div>
      Home page for current user <button onClick={handleLogout}>Logout</button>
      
      current user: {authContext.currentUser?.email}
    </div>
  )
}
