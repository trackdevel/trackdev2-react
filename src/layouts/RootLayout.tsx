import {Outlet} from "react-router-dom";
import React from "react";
import {MainNav} from "../components/main-nav";
import {Search} from "../components/ui/search";
import {UserNav} from "../components/user-nav";

const RootLayout = () => {

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <MainNav/>
                        <div className="ml-auto flex items-center space-x-4">
                            <Search />
                            <UserNav />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Outlet/>
            </div>
        </>
    );
}

export default RootLayout;
