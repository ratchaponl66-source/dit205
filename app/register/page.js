"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "สมัครสมาชิกไม่สำเร็จ");
        return;
      }

      router.push("/login?registered=1");
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Create account</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">สมัครสมาชิก</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">สร้างบัญชีเพื่อเริ่มใช้งานระบบ</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">ชื่อ-นามสกุล</span>
            <input
              required
              autoComplete="name"
              maxLength={120}
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              placeholder="ชื่อ นามสกุล"
            />
          </label>
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
              autoComplete="new-password"
              minLength={8}
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              placeholder="อย่างน้อย 8 ตัวอักษร"
            />
          </label>
          {message && <p role="alert" className="text-sm text-rose-600">{message}</p>}
          <button
            disabled={isSubmitting}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "กำลังสมัคร..." : "สร้างบัญชี"}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          มีบัญชีแล้ว?{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
            เข้าสู่ระบบ
          </Link>
        </p>
        <footer className="mt-6 border-t border-slate-100 pt-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Shark dev
        </footer>
      </section>
    </main>
  );
}
