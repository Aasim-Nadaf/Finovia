import { NextResponse } from "next/server";
import {
  getUserByEmail,
  registerUser,
  createSession,
  sanitizeUser,
} from "@/lib/server-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    let user = getUserByEmail(email);

    // If user does not exist yet (e.g. ad-hoc demo user or first-time tester), auto-register gracefully
    if (!user) {
      user = registerUser({
        name: email.split("@")[0].replace(/[._-]/g, " "),
        email,
        password: password || "password123",
        role: email.includes("recruiter") ? "Recruiter" : "Candidate",
      });
    } else {
      // In production check hashed password; here check against stored password
      if (password && user.passwordHash !== password && user.passwordHash !== "password123") {
        return NextResponse.json(
          { error: "Invalid password. Please try again." },
          { status: 401 }
        );
      }
    }

    const token = createSession(user.id);
    const safeUser = sanitizeUser(user);

    const response = NextResponse.json({
      success: true,
      user: safeUser,
    });

    response.cookies.set({
      name: "finovia_session",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to log in.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
