import { createSelector } from '@reduxjs/toolkit';

export const selectLoggedIn = createSelector(
  state => state.auth,
  auth => auth.isLoggedIn
);

export const selectRefreshToken = createSelector(
  state => state.auth,
  auth => auth.refresh_token
);
