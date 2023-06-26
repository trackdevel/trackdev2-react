
import {cn} from "../lib/utils";
import {Link} from "react-router-dom";
import React from "react";


export function MainNav() {
    return (
        <nav className={"flex items-center space-x-4 lg:space-x-6"} >
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary" >
                Home
            </Link>
            <Link to="/agile" className="text-sm font-medium transition-colors hover:text-primary" >
                Agile
            </Link>
            <Link to="/task/15" className="text-sm font-medium transition-colors hover:text-primary" >
                Task
            </Link>
            <Link to="/auth/login" className="text-sm font-medium transition-colors hover:text-primary" >
                Login
            </Link>
            <Link to="/auth/register" className="text-sm font-medium transition-colors hover:text-primary" >
                Register
            </Link>
        </nav>
    );
}
