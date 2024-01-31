import {Separator} from "../../../registry/ui/separator"
import {ProfileForm} from "./ProfileForm"
import {Button} from "../../../registry/ui/button";
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Api from "../../../utils/Api";
import {toast} from "react-toastify";
import {Icons} from "../../../registry/ui/icons";

export default function SettingsProfilePage() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const userId = "self"
    const [email, setEmail] = React.useState<any>('')
    const navigate = useNavigate();

    async function logout() {
        Api.post('/auth/logout', {}).then((res) => {
            localStorage.removeItem('userdata')
        }).catch((err) => {})
        return;
    }


    useEffect(() => {
        Api.get('/auth/self').then((res) => {
            setEmail(res.email)
        }).catch((err) => {
        })
    }, []);

    function resetPassword() {
        setIsLoading(true)

        if(email === '') return;

        var requestBody = {
            email: email
        }

        Api.post('/auth/recovery',requestBody).then((res) => {
            setIsLoading(false)
            logout()
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
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Perfil</h3>
                    <p className="text-sm text-muted-foreground">
                        Actualitza la teva informació personal
                    </p>
                </div>
                <Button disabled={isLoading} onClick={resetPassword}>
                    {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Recuperar contrasenya
                </Button>
            </div>
            <Separator />
            <ProfileForm userId={userId}/>
        </div>
    )
}
