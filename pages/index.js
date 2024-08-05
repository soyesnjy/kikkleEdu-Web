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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MasterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: -1;
`;

const IntroContainer = styled.div`
  width: 100vw;
  height: 100vh;

  background-image: url('/src/soyesKids_Background_image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
    background-image: url('/src/Background_IMG/Mobile/mobile_background_1.png');
    justify-content: center;
  }
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

const AvartarTitle = styled.h2`
  font-family: AppleSDGothicNeoB00;
  font-weight: 600;
`;

// const Title = styled.h1`
//   font-size: 4rem;
//   color: black;
//   animation: ${fadeIn} 1.5s ease;
//   margin-bottom: 0.5rem;

//   @media (max-width: 768px) {
//     font-size: 2rem;
//   }
// `;
// const AvatarContainer = styled.div`
//   width: 100vw;
//   min-height: 100vh;
//   background-color: gray;
//   padding: 2rem;

//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;

//   @media (max-width: 768px) {
//     justify-content: center;
//   }
// `;

// const TopButtonWrap = styled.div`
//   position: sticky;
//   bottom: 70px;
//   float: right;
// `;

// // 스타일링된 버튼 컴포넌트
// const TopButton = styled.button`
//   font-size: 3.8rem;
//   color: #ffc949 !important;
//   border: none;
//   background-color: #007bff;
//   color: white;
//   border-radius: 50%;
//   display: ${({ show }) => (show ? 'block' : 'none')};
//   cursor: pointer;
//   z-index: 2;
//   transition: opacity 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const PageContainer = styled.div`
//   scroll-snap-type: y mandatory;
//   overflow-y: scroll;
//   height: 100vh;
//   scroll-behavior: smooth;
// `;

// const Section = styled.div`
//   scroll-snap-align: start;
//   height: 100vh;
//   width: 100%;
// `;

// const FooterSection = styled(Section)`
//   height: max-content;
// `;

// const SubContainer = styled.div`
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;

//   width: 100%;
//   height: 100vh;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   gap: 2rem;

//   scroll-snap-align: start;
//   height: 100vh;

//   @media (max-width: 768px) {
//     gap: 0;
//   }
// `;

// const ContentWrapper = styled.div`
//   text-align: center;
//   animation: ${fadeIn} 1s ease;
// `;
