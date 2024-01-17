import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

import TextField from '../../components/shared/TextField';
import Popup from '../../components/shared/Popup';
import { updatePassword } from '../../api/auth';

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [formValues, setFormValues] = useState({
    password: '',
    newPassword: '',
  });

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
        .catch(() => {
          setError('User failed to be registeded');
        })
        .finally(() => {
          setOpen(true);
          setLoading(false);
        });
    },
    [formValues]
  );

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
        />
        <TextField
          label="New Password"
          name="newPassword"
          id="newPassword"
          onChange={handleChange}
          value={formValues.newPassword}
        />
        <Stack direction="row" justifyContent="flex-end" spacing={3}>
          <LoadingButton type="submit" loading={loading} variant="contained">
            Submit
          </LoadingButton>
          <Button variant="outlined" component={Link} to="/">
            Cancel
          </Button>
        </Stack>
      </Stack>
      <Popup
        title={error ?? 'User registered successfully!'}
        titleIcon={
          error ? <CancelIcon sx={{ color: 'red' }} /> : <CheckIcon sx={{ color: 'green' }} />
        }
        maxWidth="sm"
        hasCloseIcon={!error}
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
