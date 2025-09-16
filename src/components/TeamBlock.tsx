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

import { OpenButton, AddButton, CompareButton } from "@/components/PopButton"
import { Team } from "@prisma/client";

export default function TeamBlock( { team }: { team: Team }) {
    return (
        <div className="" style={{ backgroundColor: "#7ECF1C" }}>
            <Card>
                <CardHeader>
                    <CardTitle>{team.name}</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                    <CardAction>
                        <OpenButton/>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                    <p>Card Content</p>
                    <AddButton/>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center justify-between w-full">
                    <p>Card Footer</p>
                    <CompareButton/>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}