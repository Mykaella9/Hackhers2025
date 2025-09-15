"use client"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function TeamBlock({ team }: { team: any }) {
    return (
        <div className="" style={{ backgroundColor: "#7ECF1C" }}>
            <Card>
                <CardHeader>
                    <CardTitle style={{ color: "#002D2A" }}>{team.name}</CardTitle>
                    <CardDescription style={{ color: "#002D2A" }}>
                        Manager: {team.manager?.firstName} {team.manager?.lastName}
                    </CardDescription>
                    <CardAction style={{ color: "#002D2A" }}>
                        Users: {team.users?.length}
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p style={{ color: "#002D2A" }}>
                        Entitlements: {team.entitlements?.map((e: any) => e.name).join(", ")}
                    </p>
                </CardContent>
                <CardFooter>
                    <p style={{ color: "#002D2A" }}>Team ID: {team.id}</p>
                </CardFooter>
            </Card>
        </div>
    );
}