import {Separator} from "../../../registry/ui/separator"
import {useNavigate, useParams} from "react-router-dom";
import {ProfileForm} from "./ProfileForm";
import React, {useEffect} from "react";
import Api from "../../../utils/Api";
import {Button} from "../../../registry/ui/button";
import {toast} from "react-toastify";
import {Icons} from "../../../registry/ui/icons";

export default function SettingsProfilePageAdmin() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const { userId } = useParams();
    const [email, setEmail] = React.useState<any>('')



    useEffect(() => {
        Api.get('/users/uuid/'+userId).then((res) => {
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
            toast.success('S\'ha enviat un correu electrònic per restablir la contrasenya', {
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
            setIsLoading(false)
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Perfil</h3>
                    <p className="text-sm text-muted-foreground">
                        Actualitza la informació personal del usuari
                    </p>
                </div>
                <Button disabled={isLoading} onClick={resetPassword}>
                    {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Recuperar contrasenya
                </Button>
            </div>
            <Separator/>
            <ProfileForm userId={userId}/>
        </div>
    )
}
