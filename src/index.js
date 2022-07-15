import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min";
import './index.css';
import React, {useLayoutEffect} from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";

const container = document.getElementById('app');
const root = createRoot(container);
import Home from './pages/Home';

const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
}

root.render(
    <BrowserRouter>
        <Wrapper>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </Wrapper>
    </BrowserRouter>
);
