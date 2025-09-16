import { NextResponse } from "next/server";
import { getUserEntitlements } from "@/lib/data"; 

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get("userId") || "");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const user = await getUserEntitlements(userId);
    return NextResponse.json({ entitlements: user.entitlements });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}