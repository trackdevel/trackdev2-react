import React, {useEffect} from "react";
import {ProjectLineChart} from "../../components/stats/project-line-chart";
import Api from "../../utils/Api";
import {z} from "zod";
import {projectSchema} from "../../components/data/projects/schema";
import {Popover, PopoverContent, PopoverTrigger} from "../../registry/ui/popover";
import {Button} from "../../registry/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "../../registry/ui/command";
import {cn} from "../../lib/utils";
import {ProjectUsersPoints} from "../../components/stats/project-users-points";
import {SprinttUsersPoints} from "../../components/stats/sprint-users-points";


const Dashboard = () => {
    const [projects, setProjects] = React.useState<Array<any>>([])
    const [openproject, setOpenproject] = React.useState(false)
    const [project, setProject] = React.useState<any>(null);

    useEffect(() => {
        Api.get('/projects').then((res) => {
            setProjects(z.array(projectSchema).parse(res))
        }).catch((err) => {})
    }, []);


    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <Popover open={openproject} onOpenChange={setOpenproject}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-label="Load a preset..."
                            aria-expanded={openproject}
                            className="justify-between w-fit min-w-max"
                        >
                            {project ? project.name : "Sel·lecciona un projecte"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                            <CommandInput placeholder="Buscar projecte..." />
                            <CommandEmpty>No presets found.</CommandEmpty>
                            <CommandGroup heading="Projectes">
                                {projects.map((request) => (
                                    <CommandItem key={request.id}
                                                 onSelect={() => {
                                                     console.log(request)
                                                     setProject(request)
                                                     setOpenproject(false)
                                                 }}
                                    >
                                        {request.name}
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                project?.id === request.id
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
                <ProjectLineChart />
                <ProjectUsersPoints />
                <SprinttUsersPoints />
                <SprinttUsersPoints />
                <SprinttUsersPoints />
                <SprinttUsersPoints />
                <SprinttUsersPoints />
            </div>

        </>
    );

}

export default Dashboard;
