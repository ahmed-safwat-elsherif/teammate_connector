import { statusSlice } from './reducer';

export const { startLoading, endLoading, showSuccess, showNotFound, alertError, clear } =
  statusSlice.actions;
