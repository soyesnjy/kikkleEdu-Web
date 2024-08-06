/* eslint-disable react-hooks/exhaustive-deps */

import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
// import Live2DViewerMain from '@/component/Live2D_Component/Live2DViewerMain';
// import ScrollDownIndicator from '@/component/Home_Component/ScrollDownIndicator';
// import ScrollUpIndicator from '@/component/Home_Component/ScrollUpIndicator';
// import { motion } from "framer-motion";

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Home 페이지
export default function Home() {
  // const [loading, setLoading] = useState(false);

  // const { t } = useTranslation("nav");
  // console.log('Test 주석');
  // 스크롤 이벤트 리스너 추가 및 제거

  useEffect(() => {
    // Loading (1 sec)
    // const timer = setTimeout(() => {
    //   setLoading(true);
    // }, 1000);
    // 모바일 width 확인
    return () => {};
  }, []);

  return (
    <MasterContainer>
      <MainContainer>
        <h1>Main Page</h1>
      </MainContainer>
    </MasterContainer>
  );
}

// Translation 파일 적용
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'nav'])), // 파일 다중 적용 가능
    },
  };
}

const MasterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: -1;
`;

const MainContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: white;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    background-image: url('/src/Background_IMG/Mobile/mobile_background_2.png');
    justify-content: center;
  }
`;
