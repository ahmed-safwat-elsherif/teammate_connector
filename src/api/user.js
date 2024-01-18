import axios from './axios';
import * as Endpoints from './endpoints';

export const updateUser = user => axios.patch(Endpoints.UPDATE_USER, user);
export const updatePassword = user => axios.patch(Endpoints.UPDATE_PASSWORD, user);

// Users
export const register = user => axios.post(Endpoints.REGISTER, user);
export const getUsers = () => axios.get(Endpoints.USERS);
export const deleteUserById = userId => axios.delete(`${Endpoints.USERS}/${userId}`);

export const updateUserById = userId => axios.patch(`${Endpoints.USERS}/${userId}`);

export const updateUserRoleById = (userId, role) =>
  axios.patch(`${Endpoints.USERS}/${userId}`, { role });
