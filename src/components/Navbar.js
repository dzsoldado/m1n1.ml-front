import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { AuthContext } from '../Auth';

import accountIcon from '../account.svg'
import hamburgerIcon from '../hamburger.svg'

function NavMenuMobile(){
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <Avatar src={hamburgerIcon} alt="menu" color='inherit'/>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <MenuItem to={'/'} component={NavLink} onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Home</Typography>
        </MenuItem>
        <MenuItem to={'/signin'} component={NavLink} onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Sign in</Typography>
        </MenuItem>
        <MenuItem to={'/signup'} component={NavLink} onClick={handleCloseNavMenu}>
          <Typography textAlign="center">Sign up</Typography>
        </MenuItem>

      </Menu>
    </Box>
  )
}

function NavMenuDesktop(){

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
  )
}

function NavMenuLoggedUser() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const Navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (e) => {
    handleCloseUserMenu(e);
    authContext.signOut()
    .then(() => { 
      Navigate('/')
    })
    .catch((error) => {
      console.log("%c"+JSON.stringify({code: error.code, message: error.message}), 'color: red;')
    });
  }

  return (
    <>
      <Box>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ m: 0 }}>
            <Avatar alt='User' src={accountIcon} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem to='/profile' component={NavLink} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem to='/dashboard' component={NavLink} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Dashboard</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>

        </Menu>
      </Box>
    </>
  )
}

export default function Navbar() {
  const authContext = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            to={'/'} 
            component={NavLink}
            sx={{
              mr: 2,
              display: { xs: 'flex'},
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            m1n1.ml
          </Typography>

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


