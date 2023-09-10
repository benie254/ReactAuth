import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// base URL for the API
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
})

// request interceptor 
instance.interceptors.request.use (
    (config) => {
        const token = cookies.get('Token');
        config.headers.Authorization = `Token ${token.token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;