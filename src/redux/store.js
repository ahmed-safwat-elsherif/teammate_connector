import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/reducer';
import status from './status/reducer';
// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    auth,
    status,
  },
});
