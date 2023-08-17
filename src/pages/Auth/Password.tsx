
import { Command } from "lucide-react"
import {LoginForm} from "../../components/auth/login-form";
import {Button} from "../../registry/ui/button";
import {Link} from "react-router-dom";
import {PasswordForm} from "../../components/auth/pasword-form";

export default function Password() {

    return (
        <>
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="lg:p-8 w-screen">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Set new password
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your new password below to create your account
                            </p>
                        </div>
                        <PasswordForm />
                    </div>
                </div>
            </div>
        </>
    )
}
