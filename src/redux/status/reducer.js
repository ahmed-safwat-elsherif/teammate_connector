/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  hasError: false,
  hasSuccess: false,
  notFound: false,
  errorMessage: '',
  successMessage: '',
  refreshes: 0,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    startLoading: state => {
      state.isLoading = true;
    },
    endLoading: state => {
      state.isLoading = false;
    },
    showSuccess: (state, action) => {
      state.isLoading = false;
      state.hasSuccess = true;
      state.successMessage = action.payload;
    },
    showNotFound: state => {
      state.isLoading = false;
      state.notFound = true;
    },
    alertError: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.errorMessage = action.payload;
    },
    clear: state => ({ ...initialState, isLoading: state.isLoading, refreshes: state.refreshes }),
  },
});

export default statusSlice.reducer;
