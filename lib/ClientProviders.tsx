'use client';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

import StyledComponentsRegistry from '@/lib/registry';
import Nav from '@/component/Home_Component/Nav';
import Footer from '@/component/Home_Component/Footer';
import TopButton from '@/component/Home_Component/TopButton';
import NavMobileSideMenuTouchHandler from '@/handler/NavMobileSideMenuTouchHandler';
const queryClient = new QueryClient();

export default function ClientProviders({ children }: { children: ReactNode }) {
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
