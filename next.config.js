// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
  images: {
    // remotePatterns: [{ protocol: 'https', hostname: '*' }],
    domains: [
      'drive.google.com',
      'drive.usercontent.google.com',
      'res.cloudinary.com',
    ],
    // unoptimized: true,
  },
  eslint: {
    // 빌드 중 ESLint 오류를 무시합니다.
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true, // styled-components의 SWC 지원 활성화
  },
};

module.exports = withPWA(nextConfig);

// Module 방식 => next.config.js(X) / next.config.mjs(O)
// import nextPWA from 'next-pwa';

// const withPWA = nextPWA({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
// });

// export default withPWA(nextConfig);
