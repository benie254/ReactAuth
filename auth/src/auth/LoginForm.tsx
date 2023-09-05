import { useState } from "react";
import { AuthService } from "./AuthService";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const token = await AuthService.login(email, password);
            // store the token in local storage or state & navigate to the protected route
        } catch (error) {
            console.error('Login failed: ', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input 
                type="text" 
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default LoginForm;

