import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/60 via-slate-950 to-slate-950" />
      <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-7 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Shark dev home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-300 font-black text-slate-950">
              S
            </span>
            <span className="font-semibold tracking-wide">Shark dev</span>
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/login" className="rounded-full px-4 py-2 text-slate-300 transition hover:text-white">
              เข้าสู่ระบบ
            </Link>
            <Link
              href="/register"
              className="rounded-full border border-white/20 px-4 py-2 font-medium transition hover:border-cyan-200 hover:bg-white/10"
            >
              สมัครสมาชิก
            </Link>
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-16 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/5 px-4 py-2 text-sm text-cyan-100">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              DIT205 · Web Application
            </div>
            <h1 className="text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              ทุกการเรียนรู้
              <span className="block text-cyan-200">เริ่มต้นที่นี่</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              พื้นที่สมาชิกสำหรับจัดการบัญชีและเข้าถึงประสบการณ์การเรียนรู้
              ออกแบบเรียบง่าย ปลอดภัย และพร้อมใช้งานบนทุกอุปกรณ์
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="rounded-full bg-cyan-200 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-100"
              >
                เริ่มต้นใช้งาน <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white/20 px-6 py-3 font-medium text-white transition hover:bg-white/10"
              >
                เข้าสู่ระบบ
              </Link>
            </div>
          </div>

          <aside className="mx-auto w-full max-w-md">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-2 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="rounded-[1.55rem] bg-gradient-to-br from-slate-800 to-slate-900 p-7 sm:p-9">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Student profile</p>
                    <h2 className="mt-2 text-2xl font-semibold">ข้อมูลนักศึกษา</h2>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-200/10 text-xl text-cyan-200">
                    ✦
                  </div>
                </div>
                <div className="my-8 h-px bg-white/10" />
                <dl className="space-y-6">
                  <div>
                    <dt className="text-sm text-slate-400">ชื่อ-นามสกุล</dt>
                    <dd className="mt-1 text-lg font-medium">รัชพล ลาภรวย</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-slate-400">รหัสนักศึกษา</dt>
                    <dd className="mt-1 font-mono text-lg font-medium tracking-wider">6604729</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-slate-400">รายวิชา</dt>
                    <dd className="mt-1 inline-flex items-center gap-2 rounded-full bg-cyan-200/10 px-3 py-1 text-sm font-medium text-cyan-100">
                      DIT205 <span className="h-1 w-1 rounded-full bg-cyan-200" /> Web Application
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <p className="mt-5 text-center text-sm text-slate-500">สมาชิกใหม่? สมัครบัญชีได้ในไม่กี่ขั้นตอน</p>
          </aside>
        </section>

        <footer className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Shark dev · DIT205
        </footer>
      </div>
    </main>
  );
}
