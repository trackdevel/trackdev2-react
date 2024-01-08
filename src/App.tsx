import React from 'react';
import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import Dashboard from "./pages/Dashboard/Dashboard";
import Project from "./pages/Project/Project";
import Task from "./pages/Task/Task";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import SettingsLayout from "./pages/Settings/SettingsLayout";
import SettingsProfilePage from "./pages/Settings/profile/SettingsProfilePage";
import SettingsUsersPage from "./pages/Settings/users/SettingsUsersPage";
import SettingsProjectsPage from "./pages/Settings/projects/SettingsProjectsPage";
import SettingsSubjectsPage from "./pages/Settings/subjects/SettingsSubjectsPage";
import SettingsCoursesPage from "./pages/Settings/crouses/SettingsCoursesPage";
import AuthGuard from "./guards/AuthGuard";
import Password from "./pages/Auth/Password";
import AdminGuard from "./guards/AdminGuard";
import SettingsProfilePageAdmin from "./pages/Settings/profile/SettingsProfilePageAdmin";
import Recovery from "./pages/Auth/Recovery";
import Sprints from "./pages/Sprints/Sprints";
import SettingsNotesPage from "./pages/Settings/projects/SettingsNotesPage";

export function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<AuthGuard component={<RootLayout/>}/>}>
                    <Route path="/" element={<AuthGuard component={<Dashboard/>}/>}/>
                    <Route path="/project/:projectId" element={<AuthGuard component={<Project/>}/>}/>
                    <Route path="/project/:projectId/:taskId" element={<AuthGuard component={<Task/>}/>}/>
                    <Route path="/sprints/:projectId" element={<AuthGuard component={<Sprints/>}/>}/>
                    <Route path="/settings" element={<AuthGuard component={<SettingsLayout/>}/>}>
                        <Route path="/settings/" element={<AuthGuard component={<SettingsProfilePage/>}/>}/>
                        <Route path="/settings/profile" element={<AuthGuard component={<SettingsProfilePage/>}/>}/>
                        <Route path="/settings/profile/:userId" element={<AuthGuard component={<AdminGuard component={<SettingsProfilePageAdmin/>}/>}/>}/>
                        <Route path="/settings/users" element={<AuthGuard component={<AdminGuard component={<SettingsUsersPage/>}/>}/>}/>
                        <Route path="/settings/projects" element={<AuthGuard component={<AdminGuard component={<SettingsProjectsPage/>}/>}/>}/>
                        <Route path="/settings/projects/:projectId/notes" element={<AuthGuard component={<AdminGuard component={<SettingsNotesPage/>}/>}/>}/>
                        <Route path="/settings/subjects" element={<AuthGuard component={<AdminGuard component={<SettingsSubjectsPage/>}/>}/>}/>
                        <Route path="/settings/courses" element={<AuthGuard component={<AdminGuard component={<SettingsCoursesPage/>}/>}/>}/>
                    </Route>
                </Route>
                <Route path="/auth" element={<AuthLayout/>}>
                    <Route path="/auth/login" element={<Login/>}/>
                    <Route path="/auth/register" element={<Register/>}/>
                    <Route path="/auth/password" element={<AuthGuard component={<Password/>}/>}/>
                    <Route path="/auth/recovery" element={<AuthGuard component={<Recovery/>}/>}/>
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
