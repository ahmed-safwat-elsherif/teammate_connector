import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/shared/Loader';
import { selectLoggedIn } from '../redux/auth/selector';
import LayoutProvider from './LayoutProvider';

const AuthProvider = props => {
  const { children } = props;
  const isAuthenticated = useSelector(selectLoggedIn);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <Loader />;

  if (!isAuthenticated) return <Navigate replace to="/login" />;

  return <LayoutProvider>{children}</LayoutProvider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default AuthProvider;
