import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { Container, Typography, Toolbar, Box, AppBar } from '@mui/material';

import { AuthContext } from '../Auth';

import { NavMenuMobile } from './navbar/NavMenuMobile';
import { NavMenuDesktop } from './navbar/NavMenuDesktop';
import { NavMenuLoggedUser } from './navbar/NavMenuLoggedUser';

export default function Navbar() {
  const authContext = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: 'flex' },
              flexGrow: 1,
            }}>
            <Typography
              variant="h6"
              noWrap
              to={'/'}
              component={NavLink}
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              m1n1.ml
            </Typography>
          </Box>

          {
            authContext.currentUser ?
              <NavMenuLoggedUser /> :
              <>
                <NavMenuMobile />
                <NavMenuDesktop />
              </>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}


