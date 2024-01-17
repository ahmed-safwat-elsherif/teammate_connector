import axiosBase from 'axios';
import * as Endpoints from './endpoints';
import { baseURL } from '../config';

const axios = axiosBase.create({ baseURL });

export const login = user => axios.post(Endpoints.LOGIN, user);
export const register = user => axios.post(Endpoints.REGISTER, user);
export const refreshTokens = refreshToken => axios.post(Endpoints.REFRESH_TOKENS, { refreshToken });
export const updateUser = user => axios.patch(Endpoints.UPDATE_USER, user);
export const updatePassword = user => axios.patch(Endpoints.UPDATE_PASSWORD, user);
