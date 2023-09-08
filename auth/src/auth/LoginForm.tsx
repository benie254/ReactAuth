import { useState } from "react";
import { useAuthentication } from "./AuthService";
import { useNavigate } from "react-router-dom";

interface LoginInput {
    email: string;
    password: string;
}

function LoginForm () {
    const { login }  = useAuthentication();
    const [loginFormData, setLoginFormData] = useState<LoginInput>({
        email: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    

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
        event.preventDefault();
        try {
            await login(loginFormData);
            // store the token in local storage or state & navigate to the protected route
            navigate('/', { replace: true });
        } catch (error) {
            setError("Login failed");
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
                    name="email"
                    placeholder="Email..."
                    value={loginFormData.email}
                    onChange={handleChange}
                />
                <input 
                    name="password"
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

