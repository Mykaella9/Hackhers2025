"use client"

import AvatarComp from "@/components/Avatar";

export default function Header() {
    return (
        <div>
            <header className="w-full py-4 relative" style = {{backgroundColor: "#FFFFFF"}}>
                <h1 className="text-4xl font-extrabold text-center" style = {{color: "#034F54"}}>
                    WelcomeCrew
                </h1>
                {/* avatar positioned top-right */}
                <div className="absolute top-1 right-4">
                    <div className="w-16 h-16">
                        <AvatarComp className="w-full h-full" />
                    </div>
                </div>
            </header>
        </div>
    )
}


