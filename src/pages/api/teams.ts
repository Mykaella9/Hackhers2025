import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const teams = await prisma.team.findMany({
      include: {
        manager: true,
        users: true,
        entitlements: true,
      },
    });
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teams" });
  }
}