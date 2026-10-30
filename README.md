# Shark dev — Next.js + TiDB Cloud

ระบบสมัครสมาชิกและเข้าสู่ระบบด้วย Next.js App Router, MySQL (TiDB Cloud), bcrypt และ JWT ใน httpOnly cookie

## เริ่มต้นใช้งาน

1. ติดตั้ง Node.js 20 ขึ้นไป และ dependencies:

   ```bash
   npm install
   ```

   Package ที่ใช้: `next`, `react`, `react-dom`, `mysql2`, `bcrypt`, `jsonwebtoken`, `tailwindcss`, `postcss` และ `autoprefixer`

2. กรอกข้อมูล TiDB Cloud และ JWT secret ใน `.env.local` (ไฟล์นี้ถูก ignore ไม่ถูก commit):

   ```env
   MYSQL_HOST=your_tidb_host
   MYSQL_USER=your_tidb_username
   MYSQL_PASSWORD=your_tidb_password
   MYSQL_DATABASE=your_database_name
   MYSQL_PORT=4000
   JWT_SECRET=your_long_random_secret_at_least_32_characters
   ```

   สร้าง secret แบบสุ่มได้ด้วย `openssl rand -base64 48` หรือ PowerShell:

   ```powershell
   $bytes = New-Object byte[] 48
   $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
   $rng.GetBytes($bytes)
   $rng.Dispose()
   [Convert]::ToBase64String($bytes)
   ```

3. เชื่อมต่อ TiDB Cloud แล้วรัน SQL ใน `database/schema.sql` เพื่อสร้างตาราง `users`.
4. รัน dev server:

   ```bash
   npm run dev
   ```

   เปิด <http://localhost:3000>

## Deploy บน Vercel

1. Push โปรเจกต์ไปยัง Git repository แล้ว Import repository ใน Vercel
2. ใน **Project Settings → Environment Variables** เพิ่ม `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE` และ `JWT_SECRET` ให้ครบสำหรับ Production (และ Preview หากต้องการ)
3. ตรวจว่า TiDB Cloud อนุญาตการเชื่อมต่อจากเครือข่ายของ Vercel ตามการตั้งค่า trusted source/IP ของคลัสเตอร์ และสร้างตารางด้วย `database/schema.sql` ก่อนทดสอบสมัครสมาชิก
4. Redeploy หลังเพิ่มหรือเปลี่ยน Environment Variables; `.env.local` ใช้เฉพาะเครื่อง local และถูก ignore โดย Git

ตั้งค่า Node.js runtime เป็นเวอร์ชัน 20.9 ขึ้นไปใน Vercel เนื่องจากใช้ Next.js 16

## Routes

- `/` Landing page (แก้ชื่อและรหัสนักศึกษาใน `app/page.js`)
- `/register`, `/login`, `/dashboard`
- `POST /api/register`, `POST /api/login`, `GET /api/me`, `POST /api/logout`

ทุก API ที่อ่านหรือเขียนฐานข้อมูลใช้ parameterized query; รหัสผ่านจัดเก็บเป็น bcrypt hash และ JWT cookie ตั้ง `httpOnly`, `sameSite=lax` และเปิด `secure` เมื่อเป็น production
