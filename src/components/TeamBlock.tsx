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
import {AddButton, CompareButton,} from "@/components/PopButton"
import {OpenButton} from "@/components/PopButton";
import {EntButton} from "@/components/PopButton";
import {CompareDialog, OpenDialog, AddDialog, EntDialog} from "@/components/DialogBox";



export default function TeamBlock( { team }: { team: Team & { users: User[]; entitlements: Entitlement[] } } ) {
    return (
        <div className="" style={{ backgroundColor: "#7ECF1C" }}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-center mb-1 font-bold">{team.name}</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-center">
                        <OpenDialog users={team.users} />
                    </div>
                    <div className="flex justify-center">
                        <EntDialog entitlements={team.entitlements} />
                    </div>
                    <div className="flex justify-center">
                        <AddDialog users={team.users} />
                    </div>
                    <div className="flex justify-center">
                        <CompareDialog users={team.users} />
                    </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}