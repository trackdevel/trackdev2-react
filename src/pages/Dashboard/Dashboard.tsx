import React from "react";
import {Calendar} from "../../components/ui/calendar";

const Dashboard = () => {

    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
    );

}

export default Dashboard;
