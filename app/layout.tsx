// app/layout.tsx (Server Component)
import '@/styles/globals.css';
import StyledComponentsRegistry from '@/lib/registry';
import LayoutClient from '@/component/common/LayoutClient';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <LayoutClient>{children}</LayoutClient>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
