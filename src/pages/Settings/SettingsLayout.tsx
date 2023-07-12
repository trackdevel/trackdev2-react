import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "../../registry/ui/separator"
import { SidebarNav } from "./components/sidebar-nav"
import {Outlet} from "react-router-dom";


const sidebarNavItems = [
    {
        title: "Profile",
        href: "/settings/profile",
    },
    {
        title: "Account",
        href: "/settings/account",
    },
    {
        title: "Users",
        href: "/settings/users",
    },
    {
        title: "Groups",
        href: "/settings/groups",
    },
    {
        title: "Courses",
        href: "/settings/courses",
    },
    {
        title: "Subjects",
        href: "/settings/subjects",
    },
]

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout() {
    return (
        <>
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your account settings
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1 w-full">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}
