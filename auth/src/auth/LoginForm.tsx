import { useState } from "react";
import { AuthService } from "./AuthService";

interface LoginInput {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [loginFormData, setLoginFormData] = useState<LoginInput>({
        email: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);

    function handleChange(event: any){
        const {name, value} = event.target
        setLoginFormData(prevLoginFormData => {
            return {
                ...prevLoginFormData, [name]: value
            }
        });
        if (!loginFormData.email || !loginFormData.password) {
            setError('Please fill in all fields.');
            return;
        }
    }

    const handleLogin = async (event: any) => {
        try {
            event.preventDefault();
            const decodedToken = await AuthService.login(loginFormData.email, loginFormData.password);
            // store the token in local storage or state & navigate to the protected route
        } catch (error) {
            console.error('Login failed: ', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Email..."
                    value={loginFormData.email}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="Password..."
                    value={loginFormData.password}
                    onChange={handleChange}
                />
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;

