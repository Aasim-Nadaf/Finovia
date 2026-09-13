import { NextResponse } from "next/server";
import { registerUser, createSession, sanitizeUser } from "@/lib/server-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 4) {
      return NextResponse.json(
        { error: "Password must be at least 4 characters long." },
        { status: 400 }
      );
    }

    const user = registerUser({
      name: name || email.split("@")[0],
      email,
      password,
      role: role || "Candidate",
    });

    const token = createSession(user.id);
    const safeUser = sanitizeUser(user);

    const response = NextResponse.json({
      success: true,
      user: safeUser,
    });

    // Set HTTP-only session cookie
    response.cookies.set({
      name: "finovia_session",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create account.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
