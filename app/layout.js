import "./globals.css";

export const metadata = {
  title: "Shark dev | DIT205",
  description: "ระบบสมาชิกสำหรับรายวิชา DIT205",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
