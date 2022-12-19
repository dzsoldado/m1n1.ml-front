import React from 'react'
import Form from '../components/Form'

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


export default function SignUp() {
  const Navigate = useNavigate();

  function signupHandler(email, password){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      
      const user = userCredential.user;
      
      Navigate('/profile')
      
    })
    .catch((error) => {
      toast.error("Wrong credentials")
      console.error({code: error.code, message: error.message})

    });
  }


  return (
    <div>
      <Toaster/>
      <Form handleSubmit={signupHandler} />
    </div>
  )
}
