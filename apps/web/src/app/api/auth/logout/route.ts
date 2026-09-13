import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSession } from "@/lib/server-store";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("finovia_session")?.value;

    if (token) {
      deleteSession(token);
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete("finovia_session");
    return response;
  } catch (err: unknown) {
    console.error("Logout error:", err);
    return NextResponse.json({ success: true });
  }
}
