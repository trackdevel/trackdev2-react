"use client"

import * as React from "react"
import {useNavigate} from 'react-router-dom';
import {Icons} from "../../registry/ui/icons"
import {Button} from "../../registry/ui/button"
import {Input} from "../../registry/ui/input"
import {cn} from "../../lib/utils";
import Api from "../../utils/Api";
import {toast} from "react-toastify";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecoveryForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email,setEmail] = React.useState<string>('')
    const navigate = useNavigate();


    async function onSubmit(event: React.SyntheticEvent) {
        setIsLoading(true)
        event.preventDefault()

        if(email === '') return;

        var requestBody = {
            email: email
        }

        Api.post('/auth/recovery',requestBody).then((res) => {
            setIsLoading(false)
            toast.success('Revisa el teu correu electrònic per restablir la contrasenya', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/auth/password?email='+email)
        }).catch((err) => {
            setIsLoading(false)
            toast.error('No s\'ha pogut enviar el correu electrònic', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        })

    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Input
                            id="email"
                            placeholder="Correu electrònic"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Recuperar contrasenya
                    </Button>
                </div>
            </form>

        </div>
    )
}
