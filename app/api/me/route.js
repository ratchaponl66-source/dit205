import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, verifyAuthToken } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const token = (await cookies()).get(AUTH_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
  }

  try {
    const payload = verifyAuthToken(token);
    const [rows] = await getDb().execute(
      "SELECT id, fullname AS fullName, email FROM users WHERE id = ? LIMIT 1",
      [payload.sub],
    );
    if (!rows[0]) {
      return NextResponse.json({ error: "ไม่พบผู้ใช้" }, { status: 401 });
    }
    return NextResponse.json({ user: rows[0] });
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.message === "Invalid authentication token payload"
    ) {
      return NextResponse.json({ error: "เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่" }, { status: 401 });
    }
    console.error("Get current user failed:", { code: error.code || "UNKNOWN" });
    return NextResponse.json(
      { error: "ระบบฐานข้อมูลยังไม่พร้อม ตรวจสอบ Environment Variables ใน Vercel และตาราง users ใน TiDB" },
      { status: 503 },
    );
  }
}
