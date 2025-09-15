"use client";
import useSWR from "swr";
import TeamBlock from "@/components/TeamBlock";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Grid() {
    const { data, error } = useSWR("/api/teams", fetcher);

    if (error) return <div>Error loading teams</div>;
    if (!data) return <div>Loading teams...</div>;

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex justify-between w-3/4 max-w-5xl">
                {data.map((team: any) => (
                    <TeamBlock key={team.id} team={team} />
                ))}
            </div>
        </div>
    );
}