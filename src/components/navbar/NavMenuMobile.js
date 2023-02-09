import React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItem, Avatar, Menu, Typography, IconButton, Box } from '@mui/material';
import hamburgerIcon from '../../assets/hamburger.svg';

export function NavMenuMobile() {
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
        <Avatar src={hamburgerIcon} alt="menu" color='inherit' />
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
  );
}
