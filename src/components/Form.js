import { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Grid, Typography, Link } from '@mui/material';


export default function Form(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailField = useRef(null)
  
  useEffect(()=>{
    emailField.current.focus()
  }, [])

  function generateLink(mode){
    if(mode==='signin'){
      return (
        <Link to='/signup' component={RouterLink} variant="body2">
          Don't have an account? Sign Up
        </Link>
      )
    }else{
      return (
        <Link to='/signin' component={RouterLink} variant="body2">
          Already have an account? Sign In
        </Link>
      )
    }
  }

  function handleFormSubmit(e){
    e.preventDefault();
    const isValid = e.target.reportValidity();
    
    if (isValid){
      props.handleSubmit(email, password);
      setPassword(old=>'')
    }
  }

  return (
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
          {props.mode==='signin'? ('SIGN IN') : ('SIGNUP')}
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
          ref={emailField}
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
          inputProps={{ minLength: 4 }}
          onChange={(e)=>{setPassword(e.target.value)}}
        />

        <Button 
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type='submit'
        >{props.mode==='signin'? ('Sign in') : ('Sign up')}</Button>
      
      </Box>
      
      <Grid container>
        <Grid item>
          {generateLink(props.mode)}
        </Grid>
      </Grid>


    </Container>
  );
}