import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '../../components/shared/TextField';
import { register } from '../../api/auth';
import Popup from '../../components/shared/Popup';

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    password: '',
    username: '',
  });
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      register(formValues)
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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

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
        <Typography fontSize={20}>Add user</Typography>
        <TextField
          label="First name"
          onChange={handleChange}
          name="firstname"
          id="firstname"
          value={formValues.firstname}
        />
        <TextField
          label="Last name"
          onChange={handleChange}
          name="lastname"
          id="lastname"
          value={formValues.lastname}
        />
        <TextField
          label="User name"
          onChange={handleChange}
          name="username"
          id="username"
          value={formValues.username}
          required
        />
        <TextField
          label="Password"
          onChange={handleChange}
          name="password"
          id="password"
          value={formValues.password}
          required
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

export default AddUser;
