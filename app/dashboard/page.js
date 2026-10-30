"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const response = await fetch("/api/me", { cache: "no-store" });
        if (response.status === 401) {
          router.replace("/login");
          return;
        }
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
        }
        if (active) {
          setUser(result.user);
          setStatus("ready");
        }
      } catch {
        if (active) setStatus("error");
      }
    }

    loadUser();
    return () => {
      active = false;
    };
  }, [router]);

  async function handleLogout() {
    const response = await fetch("/api/logout", { method: "POST" });
    if (response.ok) {
      router.push("/login");
    } else {
      setStatus("logout-error");
    }
  }

  if (status === "loading") {
    return <main className="grid min-h-screen place-items-center bg-slate-950 text-slate-200">กำลังโหลดข้อมูล...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-wide">Shark dev</Link>
          <button onClick={handleLogout} className="rounded-full border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10">
            ออกจากระบบ
          </button>
        </header>
        <section className="mt-16 rounded-3xl border border-white/10 bg-white/[0.06] p-7 sm:p-10">
          {status === "ready" ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Member dashboard</p>
              <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">ยินดีต้อนรับ, {user.fullName}</h1>
              <p className="mt-3 text-slate-300">เข้าสู่ระบบเรียบร้อยแล้ว นี่คือข้อมูลบัญชีของคุณ</p>
              <div className="mt-8 rounded-2xl bg-slate-900/80 p-6">
                <p className="text-sm text-slate-400">อีเมล</p>
                <p className="mt-1 break-all text-lg">{user.email}</p>
              </div>
            </>
          ) : status === "logout-error" ? (
            <p role="alert" className="text-rose-300">ออกจากระบบไม่สำเร็จ กรุณาลองอีกครั้ง</p>
          ) : (
            <div>
              <p role="alert" className="text-rose-300">ไม่สามารถโหลดข้อมูลผู้ใช้ได้</p>
              <button onClick={() => window.location.reload()} className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                ลองอีกครั้ง
              </button>
            </div>
          )}
        </section>
        <footer className="mt-8 border-t border-white/10 py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Shark dev
        </footer>
      </div>
    </main>
  );
}
