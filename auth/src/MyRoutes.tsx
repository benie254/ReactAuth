import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuthentication } from "./auth/AuthService"
import Home from "./components/Home";
import AdminDash from "./components/AdminDash";
import UserDash from "./components/UserDash";
import LoginForm from "./auth/LoginForm";
import NotFound from "./components/NotFound";
import { Suspense, useEffect } from "react";
import Spinner from "./components/Spinner";

export function MyRoutes(){
    const navigate = useNavigate();
    // const { accessToken, currentUser } = useAuthentication();
    // const isAdmin = accessToken && accessToken.is_admin
    // useEffect(
    //     () => {
    //         navigate(userRoles.includes('admin') ? '/admin' : '/user');
    //     },[]
    // )

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                
                <Route path="/" element={<Home />} />

                {/* Protected routes for authorized users */}
                {
                    
                    (<Route path="/admin" element={<AdminDash />} />)
                }

                {
                    // authenticated && userRoles.includes('user') && 
                    (<Route path="/user" element={<UserDash />} />)
                }

                {/* redirect to appropriate dashboard after successful login */}

                {/* public route for login */}
                <Route path="/login" element={<LoginForm />} />

                {/* 404 page */}
                <Route element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}
