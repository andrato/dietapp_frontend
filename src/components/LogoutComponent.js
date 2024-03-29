import React from 'react';
import AuthService from '../services/auth/AuthService';
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';

function LogoutComponent () {
    const navigate = useNavigate();

    React.useEffect(() => { 
        AuthService.logout();
        navigate("/");
    }, [navigate]);

    return (
        <div >
        </div>
    )
}

export default LogoutComponent;