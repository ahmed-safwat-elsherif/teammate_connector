import React, { useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { revokeUserSession } from '../../redux/auth/actions';
import { selectUser } from '../../redux/auth/selector';

const ProfileButton = () => {
  const user = useSelector(selectUser) || {};
  const { firstname, lastname } = user;
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(revokeUserSession());
  }, [dispatch]);

  return (
    <Tooltip title="Log out">
      <IconButton sx={{ p: 0 }} onClick={handleLogout}>
        <Avatar alt={`${firstname} ${lastname}`} src="/static/images/avatar/2.jpg" />
      </IconButton>
    </Tooltip>
  );
};

ProfileButton.propTypes = {};

export default ProfileButton;
