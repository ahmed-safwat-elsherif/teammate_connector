import { authSlice } from './reducer';
import formatTokens from '../../utils/formatTokens';

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
