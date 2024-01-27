"use client"

import * as React from "react"
import {useNavigate} from 'react-router-dom';
import {Icons} from "../../registry/ui/icons"
import {Button} from "../../registry/ui/button"
import {Input} from "../../registry/ui/input"
import {cn} from "../../lib/utils";
import Api from "../../utils/Api";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {z} from "zod";
import {courseSchema} from "../data/courses/schema";
import { useSearchParams  } from 'react-router-dom'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForcedPasswordForm({ className, ...props }: UserAuthFormProps) {
    let [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const [code,setCode] = React.useState<string>('')
    const [old_password,setOldPassword] = React.useState<string>('')
    const [password,setPassword] = React.useState<string>('')
    const [repeat_password,setRepeatPasword] = React.useState<string>('')
    const navigate = useNavigate();

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        if(old_password === '' || repeat_password === '' || password === '') {
            setIsLoading(false)
            toast.error('Camps buits', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if(password !== repeat_password) {
            setIsLoading(false)
            toast.error('Les contrasenyes no coincideixen', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        var requestBody = {
            oldPassword: old_password,
            newPassword: password
        }

        Api.post('/auth/password/',requestBody).then((res) => {
            setIsLoading(false)
            toast.success('Contrasenya canviada correctament', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/')
        }).catch((err) => {
            setIsLoading(false)
        })
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Input
                            id="old_password"
                            placeholder="Contrasenya antiga"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <Input
                            id="password"
                            placeholder="Contrasenya"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            id="repeat_password"
                            placeholder="Repeteix la contrasenya"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="repeat_password"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setRepeatPasword(e.target.value)}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        Crear nova contrasenya
                    </Button>
                </div>
            </form>

        </div>
    )
}



