import React, {useEffect, ReactNode, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Api from "../utils/Api";

interface AuthGuardProps {
    component: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ component }) => {
    // return <React.Fragment>{component}</React.Fragment>;
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();
    const auth = true;
    const new_pasword = false;

    useEffect(() => {
        if(auth) checkAuth();
        else setStatus(true)
    }, []);

    const checkAuth = async () => {
        Api.get('/auth/check').then((res) => {
            console.log('res',res)
            setStatus(true)
            var userdata = localStorage.getItem('userdata')
            var userdataJSON = JSON.parse(userdata ? userdata : '')

            if(userdataJSON.username == '' || userdataJSON.username == undefined) {
                navigate('/auth/login');
            }
            else {
                if(new_pasword) {
                    if (userdataJSON.changePassword) {
                        navigate('/auth/password');
                    }
                }
            }
        }).catch((err) => {
            console.log('err',err)
            setStatus(false)
            navigate('/auth/login');
        })
    }

    return status ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>;
};

export default AuthGuard;
