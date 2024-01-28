import { statusSlice } from './reducer';

export const { startLoading, endLoading, showSuccess, showNotFound, alertError, refresh, clear } =
  statusSlice.actions;
