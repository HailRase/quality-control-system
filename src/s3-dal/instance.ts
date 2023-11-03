import axios from 'axios';
import store from "../s2-bll/store";

export const instance = axios.create({
    baseURL: 'http://10.200.115.6:8080/',
    headers: {
        Accept: 'application/json',
    },
});
instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        const tokenType = localStorage.getItem('token_type');
        if (accessToken) {
            config.headers.Authorization = `${tokenType} ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);