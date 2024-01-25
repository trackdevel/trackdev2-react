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

export function PasswordForm({ className, ...props }: UserAuthFormProps) {
    let [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const [email,setEmail] = React.useState<string>('')
    const [code,setCode] = React.useState<string>('')
    const [password,setPassword] = React.useState<string>('')
    const [repeat_password,setRepeatPasword] = React.useState<string>('')
    const navigate = useNavigate();

    useEffect(() => {
        if(searchParams.has('email')) setEmail(searchParams.get('email') as string)
    } ,[])

    async function onChangeCode(event: React.SyntheticEvent, value: string) {
        event.preventDefault()
        setCode(value)

        if(email === '') return;

        var requestBody = {
            code: value
        }

        Api.post('/auth/recovery/'+email+'/check',requestBody).then((res) => {
            setIsLoading(false)
            toast.success('Codi i correu electrònic correctes', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }).catch((err) => {
            setIsLoading(true)
            toast.error('Codi o correu electrònic incorrectes', {
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

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        if(email === '' || repeat_password === '' || password === '') {
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
            code: code,
            newPassword: password
        }

        Api.post('/auth/recovery/'+email,requestBody).then((res) => {
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
            navigate('/auth/login')
        }).catch((err) => {
            setIsLoading(false)
            toast.error('No s\'ha pogut canviar la contrasenya', {
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
                            id="codi"
                            placeholder="Codi de recuperació"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="codi"
                            autoCorrect="off"
                            disabled={!isLoading}
                            onChange={(e) => {
                                onChangeCode(e,e.target.value)
                            }}
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



