import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
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

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!fullName || fullName.length > 120 || !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "กรุณากรอกชื่อและอีเมลให้ถูกต้อง" }, { status: 400 });
  }
  if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    return NextResponse.json({ error: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษรและไม่เกิน 72 ไบต์" }, { status: 400 });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    await getDb().execute(
      "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
      [fullName, email, passwordHash],
    );
    return NextResponse.json({ message: "สมัครสมาชิกสำเร็จ" }, { status: 201 });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "อีเมลนี้ถูกใช้งานแล้ว" }, { status: 409 });
    }
    console.error("Register request failed:", { code: error.code || "UNKNOWN" });
    return NextResponse.json(
      { error: "ระบบฐานข้อมูลยังไม่พร้อม ตรวจสอบ Environment Variables ใน Vercel และตาราง users ใน TiDB" },
      { status: 503 },
    );
  }
}
