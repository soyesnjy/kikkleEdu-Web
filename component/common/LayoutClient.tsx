'use client'; // 🔥 클라이언트 컴포넌트 선언 필수

import { AnimatePresence } from 'framer-motion';
import Nav from '@/component/Home_Component/Nav';
import Footer from '@/component/Home_Component/Footer';
import TopButton from '@/component/Home_Component/TopButton';
import NavMobileSideMenuTouchHandler from '@/handler/NavMobileSideMenuTouchHandler';
import { Analytics } from '@vercel/analytics/react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import StyledComponentsRegistry from '@/lib/registry';

const queryClient = new QueryClient();

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <AnimatePresence mode="wait">
            <Nav />
            <NavMobileSideMenuTouchHandler />
            {children}
            <Analytics />
            <TopButton />
            <Footer />
          </AnimatePresence>
        </RecoilRoot>
      </QueryClientProvider>
    </StyledComponentsRegistry>
  );
}
