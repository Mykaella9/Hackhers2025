"use client";
import TeamBlock from "@/components/TeamBlock";

export default function Grid() {

    // Change hard code
    const cards = [1, 2, 3];

    return (
        <div className="pt-12 flex justify-center">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-wrap justify-center gap-6">
                    {cards.map((_, idx) => (
                        <div key={idx} className="w-72 flex-shrink-0">
                        <TeamBlock />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}