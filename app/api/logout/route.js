import { NextResponse } from "next/server";
import { AUTH_COOKIE, authCookieOptions } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ message: "ออกจากระบบสำเร็จ" });
  response.cookies.set(AUTH_COOKIE, "", { ...authCookieOptions(), maxAge: 0 });
  return response;
}
