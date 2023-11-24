/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import axiosBase from 'axios';
import { baseURL } from '../config';
import { store } from '../redux/store';
import { refreshTokens } from './auth';
import { revokeUserSession, startUserSession } from '../redux/auth/actions';
import { alertError, showNotFound } from '../redux/status/actions';

const axios = axiosBase.create({ baseURL });

axios.interceptors.request.use(async config => {
  const { idToken, refreshToken, exp } = store ? store.getState().auth : {};

  // case no tokens
  if (!idToken) return config;

  // case tokens are not expired
  const isIdTokenExpired = exp * 1000 - Date.now() < 600;

  if (!isIdTokenExpired) {
    config.headers['Authorization'] = `Bearer ${idToken}`;
    return config;
  }

  // case token has expired
  try {
    const response = await refreshTokens(refreshToken);
    store?.dispatch(startUserSession({ ...response.data, refreshToken }));
    const refreshedIdToken = response?.data?.idToken;
    if (idToken) {
      config.headers['Authorization'] = `Bearer ${refreshedIdToken}`;
    }
  } catch {
    store?.dispatch(revokeUserSession());
  }
  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_CANCELED') return Promise.reject(error);
    const errorStatus = error.response?.status;
    const errorMessage = error.response?.data?.details?.[0];
    if (errorStatus === 404) store?.dispatch(showNotFound());
    else {
      store.dispatch(alertError(errorMessage));
    }
    return Promise.reject(error);
  }
);

export default axios;
