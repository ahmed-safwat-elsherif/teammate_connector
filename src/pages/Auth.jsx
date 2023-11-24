import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { login } from '../api/auth';
import { startUserSession } from '../redux/auth/actions';

const Auth = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      setLoading(true);
      login(formValues)
        .then(res => {
          dispatch(startUserSession(res.data.token));
          navigate('/', { replace: true });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [formValues, dispatch, navigate]
  );

  return (
    <Stack bgcolor="#20516b" minHeight="100vh">
      <Stack>
        <Box m={3} fontSize={25} color="white" fontWeight={500}>
          Teammate+ Connector
        </Box>
      </Stack>
      <Stack flex={1} justifyContent="center" alignItems="center">
        <Stack
          component="form"
          spacing={2}
          padding={3}
          minWidth={400}
          borderRadius={2}
          bgcolor="white"
          onSubmit={handleSubmit}
        >
          <TextField
            name="username"
            label="Username"
            onChange={handleChange}
            value={formValues.username}
            size="small"
          />
          <TextField
            name="password"
            label="Password"
            onChange={handleChange}
            value={formValues.password}
            size="small"
            type="password"
          />
          <Stack>
            <LoadingButton type="submit" loading={loading} variant="contained" color="secondary">
              Login
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Auth;
