import axiosBase from 'axios';
import * as Endpoints from './endpoints';
import { baseURL } from '../config';

const axios = axiosBase.create({ baseURL });

export const login = user => axios.post(Endpoints.LOGIN, user);
export const refreshTokens = refreshToken => axios.post(Endpoints.REFRESH_TOKENS, { refreshToken });
