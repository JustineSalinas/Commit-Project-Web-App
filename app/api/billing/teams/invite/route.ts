import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { inviteTeamMember } from "@/app/actions/crud";
import { isTeams } from "@/lib/plans";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const hasTeams = await isTeams(userId);
  if (!hasTeams) {
    return NextResponse.json({ error: "Teams plan required" }, { status: 403 });
  }

  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "email is required" }, { status: 400 });

  const result = await inviteTeamMember(email);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
