import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Api from "../utils/Api";


export function MainNav() {

    const [currentProject, setCurrentProject] = useState(-1);

    useEffect(() => {
        Api.get('/auth/self').then((res) => {
            if(res.currentProject != undefined && res.currentProject != -1 && res.currentProject != null) {
                setCurrentProject(res.currentProject)
            }
            else if(res.projects.length > 0) {
                setCurrentProject(res.projects[0].id)
            }
        }).catch((err) => {
        })
    }, []);

    return (
        <nav className={"flex items-center space-x-4 lg:space-x-6"} >
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary" >
                Inici
            </Link>
            {currentProject != -1 && currentProject != undefined && true && (
                <Link to={"/project/" + currentProject} className="text-sm font-medium transition-colors hover:text-primary" >
                    Projecte
                </Link>
            )}
            {currentProject != -1 && currentProject != undefined && true && (
                <Link to={"/sprints/" + currentProject} className="text-sm font-medium transition-colors hover:text-primary" >
                    Sprints
                </Link>
            )}
        </nav>
    );
}
