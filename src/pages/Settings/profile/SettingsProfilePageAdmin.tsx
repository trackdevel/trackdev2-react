import {Separator} from "../../../registry/ui/separator"
import {useParams} from "react-router-dom";
import {ProfileForm} from "./ProfileForm";

export default function SettingsProfilePageAdmin() {
    const { userId } = useParams();
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Perfil</h3>
                <p className="text-sm text-muted-foreground">
                    Actualitza la teva informació personal
                </p>
            </div>
            <Separator />
            <ProfileForm userId={userId}/>
        </div>
    )
}
