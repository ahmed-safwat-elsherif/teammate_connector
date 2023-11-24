/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { TEAMMATE_AUTH } from '../../utils/localStorageKeys';

let initialState = {
  isLoggedIn: false,
};
const cachedAuth = localStorage.getItem(TEAMMATE_AUTH);

try {
  if (cachedAuth) initialState = { ...JSON.parse(cachedAuth) };
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(err);
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (_, action) => {
      localStorage.setItem(TEAMMATE_AUTH, JSON.stringify(action.payload));
      return action.payload;
    },
    logout: () => {
      localStorage.removeItem(TEAMMATE_AUTH);
      return { isLoggedIn: false };
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
