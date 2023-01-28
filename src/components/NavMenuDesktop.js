import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Box } from '@mui/material';

export function NavMenuDesktop() {

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button
        to={'/'}
        component={NavLink}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Home
      </Button>

      <Button
        to={'/signin'}
        component={NavLink}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Sign in
      </Button>

      <Button
        to={'/signup'}
        component={NavLink}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
        Sign up
      </Button>
    </Box>
  );
}
