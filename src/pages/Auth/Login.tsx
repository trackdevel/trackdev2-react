import {Command} from "lucide-react"
import {LoginForm} from "../../components/auth/login-form";
import Logo from "../../logo.svg"
import {toast} from "react-toastify";

export default function Login() {

    return (
        <>
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <img src={Logo} className="h-6 w-auto" alt="Trackdev" />
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                Creat per Gerard Rovellat i Marc Got
                            </p>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Log In
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Entra les teves credencials
                            </p>
                        </div>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    )
}
