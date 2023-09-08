import { Link, useNavigate } from "react-router-dom"
import { useAuthentication } from "../auth/AuthService";
import { useEffect } from "react";

function Home() {
    const { logout, currentUser } = useAuthentication();
    const navigate = useNavigate();
    
    useEffect(
        () => {
            currentUser ? navigate('/') : navigate('/login');
        },[]
    )

    return (
        <>
        <h1>Welcome Home, {currentUser?.username}</h1>
        {
            currentUser?.is_staff &&
            <h3>User is Admin</h3>
        }
        {
            currentUser?.is_superuser &&
            <h3>User is Superuser</h3>
        }
        <Link to="/user"><button>User Dashboard</button></Link>
        <button onClick={logout}>Logout</button>
        </>
    )
}

export default Home;