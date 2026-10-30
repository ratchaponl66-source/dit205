"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        return;
      }

      router.push("/dashboard");
    } catch {
      setMessage("ไม่สามารถเชื่อมต่อระบบได้ กรุณาลองอีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-7 shadow-2xl sm:p-9">
        <Link href="/" className="text-sm font-medium text-slate-500 transition hover:text-slate-900">
          ← กลับหน้าหลัก
        </Link>
        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Welcome back</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">เข้าสู่ระบบ</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">กรอกข้อมูลบัญชีของคุณเพื่อดำเนินการต่อ</p>
        </div>

        {searchParams.get("registered") === "1" && (
          <p className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            สมัครสมาชิกสำเร็จแล้ว กรุณาเข้าสู่ระบบ
          </p>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">อีเมล</span>
            <input
              required
              type="email"
              autoComplete="email"
              maxLength={254}
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">รหัสผ่าน</span>
            <input
              required
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              placeholder="รหัสผ่านของคุณ"
            />
          </label>
          {message && <p role="alert" className="text-sm text-rose-600">{message}</p>}
          <button
            disabled={isSubmitting}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          ยังไม่มีบัญชี?{" "}
          <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
            สมัครสมาชิก
          </Link>
        </p>
        <footer className="mt-6 border-t border-slate-100 pt-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Shark dev
        </footer>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center bg-slate-950 text-white">กำลังโหลด...</main>}>
      <LoginForm />
    </Suspense>
  );
}
