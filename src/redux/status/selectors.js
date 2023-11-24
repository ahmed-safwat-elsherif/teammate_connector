import { createSelector } from '@reduxjs/toolkit';

export const selectStatus = createSelector(
  state => state.status,
  status => status
);

export const selectLoading = createSelector(
  state => state.status,
  status => status.isLoading
);

export const selectSuccess = createSelector(
  state => state.status,
  status => status.hasSuccess
);

export const selectNotFound = createSelector(
  state => state.status,
  status => status.notFound
);

export const selectError = createSelector(
  state => state.status,
  status => status.hasError
);

export const selectErrorMessage = createSelector(
  state => state.status,
  status => status.errorMessage
);
