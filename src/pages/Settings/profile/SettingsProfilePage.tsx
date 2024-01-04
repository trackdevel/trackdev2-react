import {Separator} from "../../../registry/ui/separator"
import {ProfileForm} from "./ProfileForm"

export default function SettingsProfilePage() {
    const userId = "self"
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
