import axios from './axios';
import * as Endpoints from './endpoints';

export const updateUser = user => axios.patch(Endpoints.UPDATE_USER, user);
export const updatePassword = user => axios.patch(Endpoints.UPDATE_PASSWORD, user);
export const register = user => axios.post(Endpoints.REGISTER, user);
