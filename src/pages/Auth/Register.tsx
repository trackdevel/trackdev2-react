import {Command} from "lucide-react"
import {RegisterForm} from "../../components/auth/register-form";
import {Link} from "react-router-dom";
import {Button} from "../../registry/ui/button";
import Logo from "../../logo.svg"

export default function Register() {
    return (
        <>
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link to="/auth/login" className="absolute right-4 top-4 md:right-20 md:top-8">
                    <Button className={"absolute right-4 top-4 md:right-20 md:top-8 w-max"}>
                        Log In
                    </Button>
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <img src={Logo} className="h-6 w-auto" alt="Trackdev"/>
                    </div>
                    <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;This library has saved me countless hours of work and
                                helped me deliver stunning designs to my clients faster than
                                ever before.&rdquo;
                            </p>
                            <footer className="text-sm">Sofia Davis</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Create an account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                            </p>
                        </div>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </>
    )
}
