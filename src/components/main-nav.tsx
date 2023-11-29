
import {cn} from "../lib/utils";
import {Link} from "react-router-dom";
import React from "react";


export function MainNav() {
    return (
        <nav className={"flex items-center space-x-4 lg:space-x-6"} >
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary" >
                Home
            </Link>
            <Link to="/project/1" className="text-sm font-medium transition-colors hover:text-primary" >
                Project
            </Link>
        </nav>
    );
}
