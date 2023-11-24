import { authSlice } from './reducer';
import formatTokens from '../../utils/formatTokens';
import { store } from '../store';
import { refreshTokens } from '../../api/auth';

export const {
  login,
  logout,
  setCurrentAccount,
  setUserInfo,
  setAuthorizations,
  removeAuthorizations,
} = authSlice.actions;

export const startUserSession = tokens => dispatch => {
  dispatch(login(formatTokens(tokens)));
};

export const revokeUserSession = () => dispatch => {
  dispatch(logout());
};

export const refreshUserSession = () => dispatch => {
  const { isLoggedIn, refreshToken } = store?.getState().auth || {};

  if (isLoggedIn) {
    refreshTokens(refreshToken)
      .then(response => {
        dispatch(startUserSession({ ...response.data, refreshToken }));
      })
      .catch(() => {
        dispatch(revokeUserSession());
      });
  }
};
