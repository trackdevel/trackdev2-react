"use client"

import * as React from "react"
import {useNavigate} from 'react-router-dom';
import {Icons} from "../../registry/ui/icons"
import {Button} from "../../registry/ui/button"
import {Input} from "../../registry/ui/input"
import {Label} from "../../registry/ui/label"
import {cn} from "../../lib/utils";
import Api from "../../utils/Api";
import {toast} from "react-toastify";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [username,setUsername] = React.useState<string>('')
    const [password,setPassword] = React.useState<string>('')
    const navigate = useNavigate();

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        if(username === '' || password === '') {
            return;
        }

        var requestBody = {
            email: username,
            password: password
        }

        Api.post('/auth/login',requestBody).then((res) => {
            localStorage.setItem('userdata',JSON.stringify(res.userdata))
            setIsLoading(false)
            toast.success('Sessió iniciada correctament', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/');
        }).catch((err) => {
            setIsLoading(false)
        })
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="username"
                            placeholder="Correu electrònic"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="username"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            id="password"
                            placeholder="Contrasenya"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="current-password"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        Entrar a Trackdev
                    </Button>
                </div>
            </form>
            <p className="px-8 text-center text-sm text-muted-foreground">
                <a className="underline underline-offset-4 hover:text-primary" href="/auth/recovery">Recuperar contrasenya</a>
            </p>
        </div>
    )
}
