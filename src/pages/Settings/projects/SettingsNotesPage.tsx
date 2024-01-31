import {Separator} from "../../../registry/ui/separator"
import {z} from "zod";
import {columns} from "../../../components/notes-table/columns";
import React, {useEffect} from "react";
import {GroupsTable} from "../../../components/projects-table/data-table";
import Api from "../../../utils/Api";
import {projectSchema} from "../../../components/data/projects/schema";
import {useParams} from "react-router-dom";

export default function SettingsNotesPage() {
    const { projectId } = useParams();
    const [ notes, setNotes] = React.useState<Array<any>>([])

    useEffect(() => {
        Api.get('/projects/' + projectId + '/qualification').then((res) => {
            // add key as element
            Object.keys(res).map((i) => res[i].mail = i)
            setNotes(Object.keys(res).map((i) => res[i]))
        }).catch((err) => {
        })
        return;
    } ,[])

    return (
        <div className="space-y-6">
            <div className="flex flex-row justify-between">
                <div>
                    <h3 className="text-lg font-medium">Notes</h3>
                    <p className="text-sm text-muted-foreground">
                        Llistat de notes dels alumnes
                    </p>
                </div>
            </div>
            <Separator/>
            <div className="hidden h-full flex-1 flex-col md:flex">
                <GroupsTable data={notes} columns={columns}/>
            </div>
        </div>
    )
}
