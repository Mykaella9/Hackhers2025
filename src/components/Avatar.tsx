"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function AvatarComp() {
    return (
        <div>
            <Avatar>
                <AvatarImage src="/avatar_icon.jpg" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}