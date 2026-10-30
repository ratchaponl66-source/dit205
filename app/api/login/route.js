import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, authCookieOptions, signAuthToken } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "ข้อมูลคำขอไม่ถูกต้อง" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "ข้อมูลคำขอไม่ถูกต้อง" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) {
    return NextResponse.json({ error: "กรุณากรอกอีเมลและรหัสผ่าน" }, { status: 400 });
  }

  try {
    const [rows] = await getDb().execute(
      "SELECT id, fullname AS fullName, email, password AS passwordHash FROM users WHERE email = ? LIMIT 1",
      [email],
    );
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }

    const token = signAuthToken(user);
    const response = NextResponse.json({
      user: { id: user.id, fullName: user.fullName, email: user.email },
    });
    response.cookies.set(AUTH_COOKIE, token, authCookieOptions());
    return response;
  } catch (error) {
    console.error("Login request failed:", { code: error.code || "UNKNOWN" });
    return NextResponse.json(
      { error: "ระบบฐานข้อมูลยังไม่พร้อม ตรวจสอบ Environment Variables ใน Vercel และตาราง users ใน TiDB" },
      { status: 503 },
    );
  }
}
