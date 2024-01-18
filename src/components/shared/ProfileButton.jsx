import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import { useDispatch, useSelector } from 'react-redux';
import { revokeUserSession } from '../../redux/auth/actions';
import { selectIsAdmin, selectUser } from '../../redux/auth/selector';

const ProfileButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isAdmin = useSelector(selectIsAdmin);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useSelector(selectUser) || {};
  const { firstname, lastname } = user;
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(revokeUserSession());
    handleClose();
  }, [dispatch]);

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ p: 0 }}
        onClick={handleClick}
      >
        <Avatar
          alt={`${firstname} ${lastname}`}
          sx={{ color: '#164863', fontWeight: 600, textTransform: 'uppercase' }}
          src="/static/images/avatar/2.jpg"
        />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {isAdmin && (
          <MenuItem onClick={handleClose}>
            <Link to="/users">Users</Link>
          </MenuItem>
        )}
        <MenuItem onClick={handleClose}>
          <Link to="/profile">Settings</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

ProfileButton.propTypes = {};

export default ProfileButton;
