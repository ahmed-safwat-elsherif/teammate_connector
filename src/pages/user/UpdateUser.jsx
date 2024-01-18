import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

import TextField from '../../components/shared/TextField';
import Popup from '../../components/shared/Popup';
import { refreshUserSession } from '../../redux/auth/actions';
import { selectUser } from '../../redux/auth/selector';
import { updateUser } from '../../api/user';

const initials = {
  username: '',
  firstname: '',
  lastname: '',
  email: '',
};

const UpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const user = useSelector(selectUser);
  const defaultValues = { ...initials, ...user };

  const [formValues, setFormValues] = useState(defaultValues);

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
      const { username, ...rest } = formValues;
      updateUser(rest)
        .then(() => {
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
          label="Username"
          name="username"
          id="username"
          value={formValues.username}
          disabled
        />
        <TextField
          label="First name"
          name="firstname"
          id="firstname"
          onChange={handleChange}
          value={formValues.firstname}
        />
        <TextField
          label="Last name"
          name="lastname"
          id="lastname"
          onChange={handleChange}
          value={formValues.lastname}
        />
        <TextField
          label="Email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formValues.email}
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
      <Button mt={2} sx={{ ':hover': { textDecoration: 'underline' } }}>
        <Link to="/profile/change-password">Update password</Link>
      </Button>
      <Popup
        title={error ?? 'User updated successfully!'}
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

export default UpdateUser;
