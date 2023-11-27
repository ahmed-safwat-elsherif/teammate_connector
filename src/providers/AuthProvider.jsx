import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedIn } from '../redux/auth/selector';
import LayoutProvider from './LayoutProvider';
import { refreshUserSession } from '../redux/auth/actions';

const AuthProvider = props => {
  const { children } = props;
  const isAuthenticated = useSelector(selectLoggedIn);
  const dispatch = useDispatch();

  // Refresh session
  useEffect(() => {
    dispatch(refreshUserSession());
  }, [dispatch]);

  if (!isAuthenticated) return <Navigate replace to="/login" />;

  return <LayoutProvider>{children}</LayoutProvider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default AuthProvider;
