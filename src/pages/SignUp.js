import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import Form from '../components/Form'
import { AuthContext } from '../Auth';

export default function SignUp() {
  const Navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if(authContext.currentUser) return Navigate('/profile');
  }, [])

  function signupHandler(email, password){
    authContext.signUp(email, password)
    .then(() => { 
      Navigate('/profile')
    })
    .catch((error) => {
      toast.error("Wrong credentials")
      console.log("%c"+JSON.stringify({code: error.code, message: error.message}), 'color: red;')
    });
  }

  return (
    <div>
      <Toaster/>
      <Form handleSubmit={signupHandler} />
    </div>
  )
}
