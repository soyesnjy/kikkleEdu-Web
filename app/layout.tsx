// app/layout.tsx (Server Component)
import '@/styles/globals.css';
import LayoutClient from '@/component/common/LayoutClient';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
