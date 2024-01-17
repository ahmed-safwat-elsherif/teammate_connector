import { createSelector } from '@reduxjs/toolkit';

export const selectLoggedIn = createSelector(
  state => state.auth,
  auth => auth.isLoggedIn
  // () => true
);

export const selectRefreshToken = createSelector(
  state => state.auth,
  auth => auth.refresh_token
);

export const selectUser = createSelector(
  state => state.auth,
  auth => auth.user
);
