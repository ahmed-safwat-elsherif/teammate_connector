import axios from './axios';
import * as Endpoints from './endpoints';

export const createSettings = settings => axios.post(Endpoints.SYNC_SETTINGS, settings);
export const getSettings = () => axios.get(Endpoints.SYNC_SETTINGS);
export const runSync = () => axios.post(Endpoints.SYNC_RUN);

export const getOsxData = () => axios.get(Endpoints.GET_OSX_DATA);
export const clearSystemTables = () => axios.delete(Endpoints.CLEAR_TABLES);
