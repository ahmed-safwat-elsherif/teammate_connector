import axios from './axios';
import * as Endpoints from './endpoints';

export const createSettings = settings => axios.post(Endpoints.SYNC_SETTINGS, settings);
export const getSettings = () => axios.get(Endpoints.SYNC_SETTINGS);
