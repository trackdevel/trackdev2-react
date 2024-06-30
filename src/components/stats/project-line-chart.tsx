
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../registry/ui/card"
import React from "react";

const data = [
    {
        name: "Sprint 1",
        total: 850,
        average: 400,
        marc: 240,
        gerard: 739,
    },
    {
        name: "Sprint 2",
        total: 900,
        average: 300,
        marc: 139,
        gerard: 640,
    },
    {
        name: "Sprint 3",
        total: 1050,
        average: 200,
        marc: 980,
        gerard: 139,
    },
    {
        name: "Sprint 4",
        total: 550,
        average: 278,
        marc: 390,
        gerard: 139,
    },
]

export function ProjectLineChart() {

    const [opacity, setOpacity] = React.useState({
        total: 1,
        average: 1,
        marc: 1,
        gerard: 1,
    });

    const handleMouseEnter = (o: any) => {
        const { dataKey } = o;
        // set all to 0.5
        setOpacity((op) => ({ ...op, total: 0.25, average: 0.25, marc: 0.25, gerard: 0.25 }));
        // set the one we are hovering to 1
        setOpacity((op) => ({ ...op, [dataKey]: 1 }));

        //setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
    };

    const handleMouseLeave = (o: any) => {
        const { dataKey } = o;
        // set all to 1
        setOpacity((op) => ({ ...op, total: 1, average: 1, marc: 1, gerard: 1 }));

        //setOpacity((op) => ({ ...op, [dataKey]: 1 }));
    };


    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Full project review</CardTitle>
                <CardDescription>
                    Shows every users points in every sprint and the sprint average
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{top: 5, right: 10, left: 10, bottom: 0, }} >
                            <Tooltip
                                // @ts-ignore
                                content={({ active, payload  }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span
                                                            className="text-[0.70rem] uppercase text-muted-foreground">
                                                          Total
                                                        </span>
                                                        <span className="font-bold text-muted-foreground">
                                                          {payload[0].value}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span
                                                            className="text-[0.70rem] uppercase text-muted-foreground">
                                                          Average
                                                        </span>
                                                        <span className="font-bold text-muted-foreground">
                                                          {payload[1].value}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span
                                                            className="text-[0.70rem] uppercase text-muted-foreground">
                                                          Marc
                                                        </span>
                                                        <span className="font-bold">
                                                          {payload[2].value}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span
                                                            className="text-[0.70rem] uppercase text-muted-foreground">
                                                          Gerard
                                                        </span>
                                                        <span className="font-bold">
                                                          {payload[3].value}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <XAxis dataKey="name"/>
                            <Line
                                type="monotone"
                                dataKey="total"
                                strokeWidth={2}
                                strokeOpacity={opacity.total}
                                stroke="#17df2b"
                                activeDot={{
                                    r: 8,
                                    style: { fill: "var(--theme-primary)" },
                                }}
                                style={
                                    {
                                        stroke: "var(--theme-primary)",
                                        opacity: 1,
                                        "--theme-primary": `#17df2b`,
                                    } as React.CSSProperties
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey="average"
                                strokeWidth={2}
                                strokeOpacity={opacity.average}
                                stroke="#993ca0"
                                activeDot={{
                                    r: 8,
                                    style: { fill: "var(--theme-primary)" },
                                }}
                                style={
                                    {
                                        stroke: "var(--theme-primary)",
                                        opacity: 1,
                                        "--theme-primary": `#993ca0`,
                                    } as React.CSSProperties
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey="marc"
                                strokeWidth={2}
                                strokeOpacity={opacity.marc}
                                stroke="#a61e5e"
                                activeDot={{
                                    r: 8,
                                    style: { fill: "var(--theme-primary)" },
                                }}
                                style={
                                    {
                                        stroke: "var(--theme-primary)",
                                        opacity: 1,
                                        "--theme-primary": `#a61e5e`,
                                    } as React.CSSProperties
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey="gerard"
                                strokeWidth={2}
                                strokeOpacity={opacity.gerard}
                                stroke="#5c34d8"
                                activeDot={{
                                    r: 8,
                                    style: { fill: "var(--theme-primary)" },
                                }}
                                style={
                                    {
                                        stroke: "var(--theme-primary)",
                                        opacity: 1,
                                        "--theme-primary": `#5c34d8`,
                                    } as React.CSSProperties
                                }
                            />
                            <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
