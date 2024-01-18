import { createSelector } from '@reduxjs/toolkit';
import userRoles from '../../utils/userRoles';

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

export const selectIsAdmin = createSelector(
  state => state.auth?.user,
  user => user?.role === userRoles.ADMIN
  // () => true
);
