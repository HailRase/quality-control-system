import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://10.200.115.6:8080/',
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.ilicBx5cGODrDpHQyhWs4Io_H5Da6xhxtYUFwePWcOs'
    },
});
instance.interceptors.request.use(
    (config) => {
        const accessToken = ''; // Замените на свой access token
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);