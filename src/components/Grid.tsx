"use client";
import TeamBlock from "@/components/TeamBlock";
import { Team, User } from "@prisma/client";


export default function Grid({ teams }: { teams: Array<Team & { users: User[] }> }) {

    // Change hard code
    const cards = [1, 2, 3];

    return (
        <div className="pt-12 flex justify-center">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-wrap justify-center gap-6">
                    {teams.map((team) => (
                        <div key={team.id} className="w-72 flex-shrink-0">
                        <TeamBlock team={team}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}