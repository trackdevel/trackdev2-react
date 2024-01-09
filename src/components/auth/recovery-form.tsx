"use client"

import * as React from "react"
import {useNavigate} from 'react-router-dom';
import {Icons} from "../../registry/ui/icons"
import {Button} from "../../registry/ui/button"
import {Input} from "../../registry/ui/input"
import {cn} from "../../lib/utils";
import Api from "../../utils/Api";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecoveryForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [old_password,setOldPassword] = React.useState<string>('')
    const [password,setPassword] = React.useState<string>('')
    const [repeat_password,setRepeatPasword] = React.useState<string>('')
    const navigate = useNavigate();

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        if(password === '' || repeat_password === '' || old_password === '') {
            return;
        }

        if(password !== repeat_password) {
            return;
        }

        var userdata = localStorage.getItem('userdata')
        var userdataJSON = JSON.parse(userdata ? userdata : '')

        var requestBody = {
            oldpassword: old_password,
            newpassword: password,
            username: userdataJSON.username
        }

        Api.post('/auth/changepassword',requestBody).then((res) => {
            setIsLoading(false)
            userdataJSON.changePassword = false
            localStorage.setItem('userdata',JSON.stringify(userdataJSON))
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
                            placeholder="Correu electrònic"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="old_password"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setOldPassword(e.target.value)}
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
