import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { Container, Grid, Typography, Link, Button, TextField, Box } from '@mui/material';

import { AuthContext } from '../Auth';

export default function SignUp() {
  const Navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailField = useRef(null);
  const passwordConfirmField = useRef(null);

  useEffect(() => {
    emailField.current.focus();
    if(authContext.currentUser) return Navigate('/profile');
  }, [])

  function confirmPasswordValidity(){
    if(password !== passwordConfirm){
      passwordConfirmField.current.setCustomValidity('Passwords do not match');
    }else{
      passwordConfirmField.current.setCustomValidity(''); 
    }
  }

  function handleFormSubmit(e){
    e.preventDefault();
    setIsLoading(true);
    confirmPasswordValidity();
    const isValid = e.target.reportValidity();
    if (isValid){
      handleSignup(email, password);
    }else{
      setIsLoading(false);
    }
  }
  
  function handleSignup(email, password){
    authContext.signUp(email, password)
    .then(() => { 
      Navigate('/profile')
    })
    .catch((error) => {
      setIsLoading(false);
      setPassword('')
      setPasswordConfirm('')

      toast.error("Wrong credentials")
      console.log("%c"+JSON.stringify({code: error.code, message: error.message}), 'color: red;')
    });
  }

  return (
    <div>
      <Toaster/>
      <Container component="main" maxWidth="xs">
        <Box
          component="form"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          noValidate
          autoComplete="on"
          onSubmit={handleFormSubmit}
        >
          <Typography component="h1" variant="h4">
            SIGN UP
          </Typography>
        
          <TextField 
            margin="normal"
            id="email" 
            name="email"
            label="Email" 
            type='email'
            variant="outlined" 
            fullWidth
            required
            autoFocus
            autoComplete='email'
            value={email}
            inputRef={emailField}
            onChange={(e)=>{setEmail(e.target.value)}}
          />

          <TextField 
            margin="normal"
            id="password" 
            name='password'
            label="Password" 
            type="password" 
            variant="outlined" 
            fullWidth
            required
            value={password}
            inputProps={{ minLength: 4 }}
            onChange={(e)=>{setPassword(e.target.value)}}
          />

          <TextField 
            margin="normal"
            id="passwordConfirm" 
            name='passwordConfirm'
            label="Confirm Password" 
            type="password" 
            variant="outlined" 
            fullWidth
            required
            value={passwordConfirm}
            inputRef={passwordConfirmField}
            inputProps={{ minLength: 4 }}
            onChange={(e)=>{setPasswordConfirm(e.target.value);}}
          />

          <Button 
            disabled={isLoading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            type='submit'
          >
            Sign up
          </Button>
        
        </Box>
        
        <Grid container>
          <Grid item>
            <Link to='/signin' component={RouterLink} variant="body2">
              Already have an account? Sign In
            </Link>
          </Grid>
        </Grid>

      </Container>
    </div>
  )
}
