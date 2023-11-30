import React, {useEffect, ReactNode, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Api from "../utils/Api";

interface AdminGuardProps {
    component: ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ component }) => {
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();
    const auth = true;

    useEffect(() => {
        if(auth) checkAuth();
        else setStatus(true)
    }, []);

    const checkAuth = async () => {
        Api.get('/users/checker/admin').then((res) => {
            setStatus(true)
        }).catch((err) => {
            setStatus(false)
            navigate('/auth/login');
        })
    }

    return status ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>;
};

export default AdminGuard;
