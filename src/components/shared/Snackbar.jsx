import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { selectStatus } from '../../redux/status/selectors';
import { clear } from '../../redux/status/actions';

const Snackbar = () => {
  const dispatch = useDispatch();
  const { hasError, hasSuccess, errorMessage, successMessage } = useSelector(selectStatus);

  const handleClose = useCallback(() => dispatch(clear()), [dispatch]);

  return (
    <>
      <MuiSnackbar
        open={hasSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {hasSuccess ? (
          <MuiAlert
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
            onClose={handleClose}
          >
            {successMessage || 'Saved Successfully'}
          </MuiAlert>
        ) : null}
      </MuiSnackbar>

      <MuiSnackbar
        open={hasError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {hasError ? (
          <MuiAlert severity="error" variant="filled" sx={{ width: '100%' }} onClose={handleClose}>
            {errorMessage || 'Something went wrong, Please try again!'}
          </MuiAlert>
        ) : null}
      </MuiSnackbar>
    </>
  );
};

export default Snackbar;
