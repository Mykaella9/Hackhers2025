import Header from "@/components/WelcomeBanner";
import TeamBlock from "@/components/TeamBlock";
import Grid from "@/components/Grid";
import { getTeams } from '@/lib/data';



export default async function Home(props: {
  searchParams?: Promise<{
    query?: string
    page?:string
  }>;
}) {

  const teams = await getTeams();

  return (
    <div className="bg-[#7ECF1C]">
      <Header/>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
            <Grid teams={teams} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
