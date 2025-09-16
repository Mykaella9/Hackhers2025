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


import { Team, User, Entitlement} from "@prisma/client";
import {AddButton, CompareButton} from "@/components/PopButton"
import {OpenButton} from "@/components/PopButton";
import {EntButton} from "@/components/PopButton";



export default function TeamBlock( { team }: { team: Team & { users: User[]; entitlements: Entitlement[] } } ) {
    return (
        <div className="" style={{ backgroundColor: "#7ECF1C" }}>
            <Card>
                <CardHeader>
                    <CardTitle>{team.name}</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                    <CardAction>
                        <OpenButton users ={team.users}/>
                        <EntButton entitlements={team.entitlements} />
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <p>Card Content</p>
                        <AddButton users ={team.users}/>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center justify-between w-full">
                        <p>Card Footer</p>
                        <CompareButton users ={team.users}/>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}