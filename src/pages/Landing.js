import { Button, TextField, Box, Container, Typography, CircularProgress, Card, CardContent, Link } from '@mui/material';
import React, { useState, useRef } from 'react'
import { getAuth } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';

import Navbar from '../components/Navbar';
import {HOST} from '../config'

function isValidUrl(urlString) {
  try { 
    return Boolean(new URL(urlString)); 
  }
  catch(e){ 
    return false; 
  }
}

export default function Landing() {

  const [isLoading, setLoading] = useState(false);
  const [URL, setURL] = useState('')
  const [generatedLink, setGeneratedLink] = useState(null)
  const [isValid, setValid] = useState(true)
  const isValidRef = useRef(true);

  async function handleSubmit(e){
    e.preventDefault()

    isValidRef.current = isValidUrl(URL);
    setValid(isValidRef.current)

    if (isValidRef.current){
      setLoading(old=>true)
      
      try{
        const auth = getAuth();
        const id_token = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
        
        let body = { 
          link: URL ,
          id_token,
        }

        let result = await fetch(`${HOST}/api/add/`, { 
          method: 'POST', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        });
        let jsonResult = await result.json()
        
        if(jsonResult.error){
          toast.error(jsonResult.error)
        } 
        setLoading(old=>false)
        setGeneratedLink(old=>jsonResult.generated_url)


      }catch(err){
        setLoading(old=>true)
        toast.error("A problem accured")
        console.log(err)
      }
    }
  }

  return (
    <>
      <Navbar />

      <Toaster/>

      <Container component="main" maxWidth="sm" >
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
          onSubmit={handleSubmit}
        >
          <Typography component="h1" variant="h4">
            Shorten your link!
          </Typography>
        
          <TextField 
            margin="normal"
            id="url" 
            label="Link" 
            type='text'
            variant="outlined" 
            fullWidth
            autoFocus
            value={URL}
            onChange={(e)=>{setURL(e.target.value);isValidRef.current=true;setValid(isValidRef.current)}}
            error={!isValid}
            helperText={!isValid && "Invalid link."}
            />

          {generatedLink &&
          
            <Card 
            variant="outlined"
            sx={{ width: 1 }}
            >
              <CardContent >

              <Typography variant="body2">
                <Link 
                  underline="hover" 
                  href={generatedLink}
                  target="_blank"
                  rel="noopener"
                >
                  {generatedLink}

                </Link>
                <Button 
                  sx={{ml: 2}} 
                  variant="outlined"
                  onClick={(e)=>{navigator.clipboard.writeText(generatedLink); e.target.textContent = 'Copied!'}}
                >
                  Copy
                </Button>
              </Typography>
              </CardContent>
            </Card>
          }
          
          <Button 
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            type='submit'
            >
            Shorten it! 
          </Button>
        
        </Box>

      
        { isLoading && <CircularProgress sx={{ mt: 2, mb: 2 }}/> }
      </Container>


    </>
  )
}
