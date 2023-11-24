import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/reducer';
// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    auth,
  },
});
