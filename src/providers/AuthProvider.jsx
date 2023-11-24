import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/shared/Loader';
import { selectLoggedIn } from '../redux/auth/selector';
import LayoutProvider from './LayoutProvider';
import { refreshUserSession } from '../redux/auth/actions';

const AuthProvider = props => {
  const { children } = props;
  const isAuthenticated = useSelector(selectLoggedIn);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Refresh session
  useEffect(() => {
    dispatch(refreshUserSession());
  }, [dispatch]);

  if (loading) return <Loader />;

  if (!isAuthenticated) return <Navigate replace to="/login" />;

  return <LayoutProvider>{children}</LayoutProvider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default AuthProvider;
