"use client"
import TeamBlock from "@/components/TeamBlock"

export default function Grid() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex justify-between w-3/4 max-w-5xl">
                <TeamBlock/>
                <TeamBlock/>
                <TeamBlock/>
            </div>
        </div>
    )
}