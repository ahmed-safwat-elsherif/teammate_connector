import { Suspense } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/shared/Navbar';
import Loader from '../components/shared/Loader';
import Footer from '../components/shared/Footer';
import Breadcrumb from '../components/shared/Breadcrumb';

const LayoutProvider = props => {
  const { children, isLoading } = props;

  return (
    <>
      {isLoading && <Loader />}
      <Stack minHeight="100vh" minWidth="100%" width="fit-content">
        <CssBaseline />
        <Navbar />
        <Breadcrumb />
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#DDF2FD' }}>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </Box>
        <Footer />
      </Stack>
    </>
  );
};

LayoutProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  isLoading: PropTypes.bool,
};

LayoutProvider.defaultProps = {
  isLoading: false,
};

export default LayoutProvider;
