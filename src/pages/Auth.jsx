import { useCallback, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import { LoadingButton } from '@mui/lab';
import { login } from '../api/auth';
import { startUserSession } from '../redux/auth/actions';
import { selectLoggedIn } from '../redux/auth/selector';

const Auth = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const isAuthenticated = useSelector(selectLoggedIn);
  const dispatch = useDispatch();

  const handleMouseDownPassword = useCallback(e => e.preventDefault(), []);

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setError(null);
    setFormValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const disabled = useMemo(
    () => !(formValues.username.trim() && formValues.password.trim()),
    [formValues]
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      setLoading(true);
      login(formValues)
        .then(res => {
          dispatch(startUserSession(res.data));
        })
        .catch(err => {
          setError(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [formValues, dispatch]
  );

  if (isAuthenticated) return <Navigate replace to="/" />;

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
          {error && <Box color="red">{error}</Box>}
          <TextField
            name="username"
            label="Username"
            onChange={handleChange}
            value={formValues.username}
            size="small"
            error={!!error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonTwoToneIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="password"
            label="Password"
            onChange={handleChange}
            value={formValues.password}
            size="small"
            type={showPassword ? 'text' : 'password'}
            error={!!error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockTwoToneIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ fontSize: 20 }} />
                    ) : (
                      <Visibility sx={{ fontSize: 20 }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack>
            <LoadingButton
              disabled={disabled}
              type="submit"
              loading={loading}
              variant="contained"
              color="secondary"
            >
              Login
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Auth;
