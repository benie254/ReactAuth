import { useState } from "react";
import { AuthService } from "./AuthService";

interface RegInput {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
    password2: string;
}

const SignupForm: React.FC = () => {
    const [regFormData, setRegFormData] = useState<RegInput>({
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        password2: ""
    });

    function handleChange(event: any){
        const {name, value} = event.target
        setRegFormData(prevRegFormData => {
            return {
                ...prevRegFormData, [name]: value
            }
        });
    }

    const handleSignup = async (event: any) => {
        try {
            event.preventDefault();
        } catch (error) {
            console.error('Signup failed: ', error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input 
                    type="text" 
                    placeholder="First name..."
                    value={regFormData.first_name}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="Last name..."
                    value={regFormData.last_name}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="Username..."
                    value={regFormData.username}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="Email..."
                    value={regFormData.email}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="Password..."
                    value={regFormData.password}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="Confirm password..."
                    value={regFormData.password2}
                    onChange={handleChange}
                />
                <button>Login</button>
            </form>
        </div>
    )
}

export default SignupForm;

