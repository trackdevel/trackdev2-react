import React from 'react';
import './App.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route, RouterProvider
} from 'react-router-dom';
import Dashboard from "./pages/Dashboard/Dashboard";
import Agile from "./pages/Agile/Agile";
import Task from "./pages/Task/Task";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function Auth() {
    return null;
}

export function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<RootLayout/>}>
                    <Route index path="/" element={<Dashboard/>}/>
                    <Route path="/agile" element={<Agile/>}/>
                    <Route path="/task/:taskId" element={<Task/>}/>
                </Route>
                <Route path="/auth" element={<AuthLayout/>}>
                    <Route index path="/auth/login" element={<Login/>}/>
                    <Route index path="/auth/register" element={<Register/>}/>
                </Route>
            </>
        )
    )

    return (
        <>
            <html lang="en" className="dark" >
                <head />
                <body className={"min-h-screen bg-background font-sans antialiased"} >
                    <RouterProvider router={router}/>
                </body>
            </html>
        </>
    )
}

export default App;
