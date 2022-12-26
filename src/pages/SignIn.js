import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { Box, TextField, Button, Container, Grid, Typography, Link } from '@mui/material';

import { AuthContext } from '../Auth';

export default function SignIn() {
  const Navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailField = useRef(null)
  
  useEffect(() => {
    emailField.current.focus()
    if(authContext.currentUser) return Navigate('/profile');
  }, [])

  function handleFormSubmit(e){
    e.preventDefault();
    setIsLoading(true);
    const isValid = e.target.reportValidity();
    if (isValid){
      setIsLoading(false);
      handleSignin(email, password);
      setPassword('')
    }
  }

  async function handleSignin(email, password){
    try{
      await authContext.signIn(email, password)
      Navigate('/profile')
    }catch(error){
      toast.error("Wrong credentials")
      console.log("%c"+JSON.stringify({code: error.code, message: error.message}), 'color: red;')
    }
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
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <Typography component="h1" variant="h4">
            SIGN IN
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

          <Button 
            disabled={isLoading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            type='submit'
          >
            Sign in
          </Button>
        
        </Box>
        
        <Grid container>
          <Grid item>
            <Link to='/signup' component={RouterLink} variant="body2">
              Already have an account? Sign In
            </Link>
          </Grid>
        </Grid>

      </Container>
    </div>
  )
}
