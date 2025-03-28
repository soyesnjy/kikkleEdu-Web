import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "노지용's Portfolio",
  icons: {
    icon: '/favicon.ico?v=1', // 캐시 무효화
    shortcut: '/favicon.ico?v=1',
    apple: '/favicon.ico?v=1',
  },
};

// 배포 Test용 주석 추가

export const revalidate = 0; // SSG 활성화

export default function Home() {
  return <div>Hello World</div>;
}
