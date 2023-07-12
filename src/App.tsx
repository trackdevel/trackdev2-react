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
import SettingsLayout from "./pages/Settings/SettingsLayout";
import SettingsAccountPage from "./pages/Settings/accout/SettingsAccountPage";
import {ProfileForm} from "./pages/Settings/profile/ProfileForm";
import SettingsProfilePage from "./pages/Settings/profile/SettingsProfilePage";

function Auth() {
    return null;
}

export function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<RootLayout/>}>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/agile" element={<Agile/>}/>
                    <Route path="/task/:taskId" element={<Task/>}/>
                    <Route path="/settings" element={<SettingsLayout/>}>
                        <Route path="/settings/" element={<SettingsProfilePage/>}/>
                        <Route path="/settings/profile" element={<SettingsProfilePage/>}/>
                        <Route path="/settings/account" element={<SettingsAccountPage/>}/>
                    </Route>
                </Route>
                <Route path="/auth" element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<Login/>}/>
                    <Route path="/auth/register" element={<Register/>}/>
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
