import axios from "axios";

const API_URL = "https://ben-in-ke-backend-nvp1.vercel.app/api/";

export const AuthService = {
    signup: async (username: string, email: string, first_name: string, last_name: string, password: string): Promise<void> => {
        try {
            const response = await axios.post(`${API_URL}/user/auth/register`, {username, email, first_name, last_name, password});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    login: async (email: string, password: string): Promise<string | null> => {
        try {
            const response = await axios.post(`${API_URL}/user/auth/login`, {email, password});
            return response.data.token;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        // logout logic here
    }
}