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


import PopButton from "@/components/PopButton"
import { Team } from "@prisma/client";

export default function TeamBlock( { team }: { team: Team }) {
    return (
        <div className="" style={{ backgroundColor: "#7ECF1C" }}>
            <Card>
                <CardHeader>
                    <CardTitle>{team.name}</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                    <CardAction>
                        <PopButton/>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    );
}