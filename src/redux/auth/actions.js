import { authSlice } from './reducer';
import formatTokens from '../../utils/formatTokens';
import { store } from '../store';
import { refreshTokens } from '../../api/auth';
import { endLoading, startLoading } from '../status/actions';

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
    dispatch(startLoading());
    refreshTokens(refreshToken)
      .then(response => {
        console.log(response);
        dispatch(startUserSession({ ...response.data, refreshToken }));
      })
      .catch(() => {
        dispatch(revokeUserSession());
      })
      .finally(() => {
        dispatch(endLoading());
      });
  }
};
