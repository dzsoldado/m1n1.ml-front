import React from 'react'
import Form from '../components/Form'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


export default function SignIn() {
  const Navigate = useNavigate();

  function signinHandler(email, password){
    signInWithEmailAndPassword(auth, email, password)
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
      <Form handleSubmit={signinHandler} mode='signin'/>
    </div>
  )
}
