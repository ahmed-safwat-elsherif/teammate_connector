import { Suspense } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from '../components/shared/Navbar';
import Loader from '../components/shared/Loader';
import Footer from '../components/shared/Footer';
import Breadcrumb from '../components/shared/Breadcrumb';
import Snackbar from '../components/shared/Snackbar';
import { selectLoading } from '../redux/status/selectors';

const LayoutProvider = props => {
  const { children } = props;
  const isLoading = useSelector(selectLoading);

  return (
    <>
      {isLoading && <Loader />}
      <Snackbar />
      <Stack minHeight="100vh" minWidth="100%" width="fit-content">
        <CssBaseline />
        <Navbar />
        <Breadcrumb />
        <Stack component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#DDF2FD' }}>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </Stack>
        <Footer />
      </Stack>
    </>
  );
};

LayoutProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default LayoutProvider;
