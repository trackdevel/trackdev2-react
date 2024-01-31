import React, {ReactNode, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Api from "../utils/Api";

interface AuthGuardProps {
    component: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ component }) => {
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        Api.get('/auth/check').then((res) => {
            setStatus(true)

            Api.get('/auth/self').then((res) => {
                if(res.changePassword) navigate('/auth/forced-password');
            }).catch((err) => {
                setStatus(false)
                navigate('/auth/login');
            })
        }).catch((err) => {
            setStatus(false)
            navigate('/auth/login');
        })
    }

    return status ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>;
};

export default AuthGuard;
