import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const API_URL = "https://ben-in-ke-backend-nvp1.vercel.app/api/";

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
        const myUser = localStorage.getItem('user');
        const accessToken = myUser && JSON.parse(myUser);
        if (accessToken) {
            setCurrentUser(accessToken);
        }
    }, []);

    const signup = async (UserData: RegUser): Promise<void> => {
        try {
            const response = await axios.post(`${API_URL}/user/auth/register`, {UserData});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

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
                const user = await response.json();
                localStorage.setItem('user', JSON.stringify(user));
                setCurrentUser(user);
                navigate('/home');
                return user;
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login error: ', error);
            throw error;
        }
    }

    const logout = () => {
        localStorage.removeItem('user');
        setCurrentUser(null);
        navigate('/login');
    }

    return {
        currentUser,
        login,
        signup,
        logout,
    }
};