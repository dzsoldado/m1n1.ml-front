import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MenuItem, Tooltip, Avatar, Menu, Typography, IconButton, Box } from '@mui/material';
import { AuthContext } from '../../Auth';
import accountIcon from '../../account.svg';

export function NavMenuLoggedUser() {
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
        Navigate('/');
      })
      .catch((error) => {
        console.log("%c" + JSON.stringify({ code: error.code, message: error.message }), 'color: red;');
      });
  };

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
  );
}
