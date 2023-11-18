import axiosBase from 'axios';
import { baseURL } from '../config';

const axios = axiosBase.create({ baseURL });
export default axios;
