import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionUser, sanitizeUser } from "@/lib/server-store";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("finovia_session")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const user = getSessionUser(token);
    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: sanitizeUser(user),
    });
  } catch (err: unknown) {
    console.error("Auth me check error:", err);
    return NextResponse.json({ user: null });
  }
}
