import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

import TextField from '../../components/shared/TextField';
import Popup from '../../components/shared/Popup';
import { updatePassword } from '../../api/user';
import { refreshUserSession } from '../../redux/auth/actions';

const initials = {
  password: '',
  newPassword: '',
};

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [formValues, setFormValues] = useState(initials);

  const dispatch = useDispatch();

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      updatePassword(formValues)
        .then(() => {
          setFormValues(initials);
          dispatch(refreshUserSession());
        })
        .catch(() => {
          setError('Failed to update!');
        })
        .finally(() => {
          setOpen(true);
          setLoading(false);
        });
    },
    [formValues, dispatch]
  );

  const disabled = useMemo(() => {
    const { password, newPassword } = formValues;

    return !(password.trim().length >= 6 && newPassword.trim().length >= 6);
  }, [formValues]);

  return (
    <>
      <Stack
        component="form"
        maxWidth={400}
        p={2}
        border="2px solid #9BBEC8"
        borderRadius={1}
        onSubmit={handleSubmit}
        spacing={2}
      >
        <TextField
          label="Password"
          name="password"
          id="password"
          onChange={handleChange}
          value={formValues.password}
          helperText="Password should be minimum 6 characters"
        />
        <TextField
          label="New Password"
          name="newPassword"
          id="newPassword"
          onChange={handleChange}
          value={formValues.newPassword}
          helperText="Password should be minimum 6 characters"
        />
        <Stack direction="row" justifyContent="flex-end" spacing={3}>
          <LoadingButton disabled={disabled} type="submit" loading={loading} variant="contained">
            Submit
          </LoadingButton>
          <Button variant="outlined" component={Link} to="/">
            Cancel
          </Button>
        </Stack>
      </Stack>
      <Popup
        title={error ?? 'Password updated successfully!'}
        titleIcon={
          error ? <CancelIcon sx={{ color: 'red' }} /> : <CheckIcon sx={{ color: 'green' }} />
        }
        maxWidth="sm"
        hasCloseIcon={!!error}
        open={open}
        setOpen={setOpen}
      >
        {!error && (
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Button component={Link} to="/" variant="outlined">
              Back to home
            </Button>
          </Stack>
        )}
      </Popup>
    </>
  );
};

export default ChangePassword;
