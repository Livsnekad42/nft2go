import axios from 'axios';

//export const baseURL = 'http://192.168.88.246:3000';
//export const baseURL = 'http://192.168.1.58:3000';
export const baseURL = 'http://localhost:3000';

const _axios = axios.create({
    baseURL
});

export default _axios;
