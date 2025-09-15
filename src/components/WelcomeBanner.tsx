"use client"

import AvatarComp from "@/components/Avatar";

export default function Header() {
    return (
        <div>
            <header className="w-full py-4" style = {{backgroundColor: "#FFFFFF"}}>
                <h1 className="text-4xl font-extrabold text-center" style = {{color: "#002D2A"}}>
                    Welcome Crew
                </h1>
                <div>
                    <AvatarComp/>
                </div>
            </header>
        </div>
    )
}