import axios from "./Interceptor";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies  from 'universal-cookie';

// const API_URL = "https://ben-in-ke-backend-nvp1.vercel.app/api/";
const cookies = new Cookies(null, { sameSite: 'strict', secure: true });

interface LoginUser {
    email: string;
    password: string;
}

interface RegUser {
    username: string;
    email: string;
    password: string;
    password2: string;
    first_name: string;
    last_name: string;
}

interface MyUser {
    token: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    id: number;
    is_staff: boolean;
    is_superuser: boolean;
}

export function useAuthentication() {
    const API_URL = "http://127.0.0.1:8000/api";
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<MyUser | null>({
        token: "",
        username: "",
        first_name: "",
        last_name: "",
        id: 0,
        email: "",
        is_staff: false,
        is_superuser: false
    });

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserInfo();
            if (user){
                setCurrentUser(user);
            }
        };
        fetchUser();
    }, []);

    const signup = async (UserData: RegUser): Promise<void> => {
        try {
            await axios.post(`${API_URL}/user/auth/register`, {UserData}).then(
                (response) => {
                    return response.data;
                }
            );
        } catch (error) {
            throw error;
        }
    }

    const getUserInfo = async (): Promise<MyUser | null> => {
        try {
            const token = cookies.get('Token');
            if(!token){
                return null;
            }

            const response = await axios.get(`${API_URL}/user/profile`);

            if (response.status === 200) {
                const user = response.data;
                return user;
            } else {
                throw new Error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('User info fetch error: ', error);
            throw error;
        }
    };

    const login = async (userData: LoginUser): Promise<string | null> => {
        try {
            const response = await fetch(`${API_URL}/user/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const token = await response.json();
                cookies.set('Token', token);
                navigate('/home');
                return null;
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login error: ', error);
            throw error;
        }
    }

    const logout = async (): Promise<void> => {
        try {
            await fetch(`${API_URL}/user/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // clear token & user data regardless of fetch response status
            cookies.remove('Token');
            setCurrentUser(null);

            // navigate to login page
            navigate('/login');
        } catch (error) {
            console.error('Logout error: ', error);
        }
    }

    return {
        currentUser,
        login,
        signup,
        logout,
    }
};