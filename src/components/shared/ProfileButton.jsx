import React, { useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from 'react-redux';
import { revokeUserSession } from '../../redux/auth/actions';

const ProfileButton = () => {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(revokeUserSession());
  }, [dispatch]);

  return (
    <Tooltip title="Open settings">
      <IconButton sx={{ p: 0 }} onClick={handleLogout}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
      </IconButton>
    </Tooltip>
  );
};

ProfileButton.propTypes = {};

export default ProfileButton;
