import axios from './axios';
import * as Endpoints from './endpoints';

export const getLogFiles = () => axios.get(Endpoints.GET_LOGS_FILES);
export const getLogs = fileIndex => axios.get(`${Endpoints.GET_LOGS_FILES}/${fileIndex}`);
export const getLogsByName = filename => axios.get(`${Endpoints.GET_LOGS_FILES}/${filename}`);
