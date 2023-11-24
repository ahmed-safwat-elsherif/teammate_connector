import axios from './axios';
import * as Endpoints from './endpoints';

// eslint-disable-next-line import/prefer-default-export
export const login = user => axios.post(Endpoints.LOGIN, user);
