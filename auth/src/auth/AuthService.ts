import axios from "axios";
import jwt, { JwtPayload } from 'jsonwebtoken';

const API_URL = "https://ben-in-ke-backend-nvp1.vercel.app/api/";
const SECRET_KEY = '';


export const AuthService = {
    signup: async (username: string, email: string, first_name: string, last_name: string, password: string): Promise<void> => {
        try {
            const response = await axios.post(`${API_URL}/user/auth/register`, {username, email, first_name, last_name, password});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    login: async (email: string, password: string): Promise<string | JwtPayload | null> => {
        try {
            const response = await axios.post(`${API_URL}/user/auth/login`, {email, password});
            const { token } = response.data;

            // verify & decode the token
            const decodedToken = jwt.verify(token, SECRET_KEY);

            // store the token in localStorage
            localStorage.setItem('user', token);

            return decodedToken;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        // clear token from localStorage
        localStorage.removeItem('user');
    }
}