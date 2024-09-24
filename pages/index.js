/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
// import Live2DViewerMain from '@/component/Live2D_Component/Live2DViewerMain';
// import ScrollDownIndicator from '@/component/Home_Component/ScrollDownIndicator';
// import ScrollUpIndicator from '@/component/Home_Component/ScrollUpIndicator';
// import { motion } from "framer-motion";
import EducationCard from '@/component/Home_Component/EducationCard';
import EduArtComponent from '@/component/Home_Component/EduArtComponent';
import EduArtClassSection from '@/component/Home_Component/EduArtClassSection';
import TeacherCarousel from '@/component/Home_Component/TeacherCarousel';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const section_1_Arr = [
  {
    imgPath: '/src/Home_IMG/Icon_IMG/Home_Icon_1_IMG.png',
    title: 'Kids education',
    content: 'Lorem ipsum dolor sit amet velit, elitni legro int dolor.',
  },
  {
    imgPath: '/src/Home_IMG/Icon_IMG/Home_Icon_2_IMG.png',
    title: 'Culture Class',
    content: 'Lorem ipsum dolor sit amet velit, elitni legro int dolor.',
  },
  {
    imgPath: '/src/Home_IMG/Icon_IMG/Home_Icon_3_IMG.png',
    title: 'Full-Time',
    content: 'Lorem ipsum dolor sit amet velit, elitni legro int dolor.',
  },
];

// Home 페이지
export default function Home() {
  // const [loading, setLoading] = useState(false);

  // const { t } = useTranslation("nav");
  // console.log('Test 주석');
  // 스크롤 이벤트 리스너 추가 및 제거

  return (
    <MasterContainer>
      {/* 인트로 섹션 */}
      <IntroSection>
        <ReadContainer>
          <H1>Kids Class Edu</H1>
          <H4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus
            imperdiet sed id elementum.{' '}
          </H4>
          <Button>Read More</Button>
        </ReadContainer>
        <ImageContainer>
          <Image
            src="/src/Home_IMG/Home_Intro_Picture_IMG.png"
            alt="Home_Intro_Picture_IMG"
            width={544}
            height={543}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </ImageContainer>
      </IntroSection>
      {/* 섹션1 */}
      <SectionFirst>
        {section_1_Arr.map((el, index) => {
          const { imgPath, title, content } = el;
          return (
            <EducationCard
              key={index}
              imgPath={imgPath}
              title={title}
              content={content}
            />
          );
        })}
      </SectionFirst>
      {/* 섹션2 */}
      <SectionSecond>
        <EduArtComponent />
      </SectionSecond>
      {/* 섹션3 */}
      <SectionThird>
        <EduArtClassSection />
      </SectionThird>
      {/* 섹션8 */}
      <SectionEighth>
        <TeacherCarousel />
      </SectionEighth>
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

const IntroSection = styled.section`
  width: 100vw;
  height: 56.25vw; /* 16:9 비율 유지 (100 / 16 * 9) */
  position: relative;

  background-color: white;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 1rem;

  &::before {
    content: '';
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image: url('/src/Home_IMG/Home_Intro_Background_IMG.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
  }

  @media (max-width: 1080px) {
    height: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

const ReadContainer = styled.div`
  width: 40vw;

  padding: 5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 1rem;

  color: white;
  z-index: 1;

  @media (max-width: 1080px) {
    width: 100%;
    padding: 0.3rem;
  }
`;

const H1 = styled.h1`
  font-size: 80px;
  font-weight: bold;
  font-family: Nunito;

  color: white;
  z-index: 1;

  @media (max-width: 1080px) {
    font-size: 60px;
  }
`;

const H4 = styled.h4`
  font-size: 20px;
  font-weight: 400;
  font-family: Nunito;

  color: white;
  z-index: 1;
`;

const Button = styled.button`
  font-family: Nunito;
  background-color: #ffca1b;

  border-radius: 10px;
  border: none;

  margin-top: 1rem;
  padding: 1rem 3rem;

  color: white;

  cursor: pointer;
  z-index: 1;
`;

const ImageContainer = styled.div`
  width: 40vw;

  padding: 5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 1rem;

  color: white;
  z-index: 1;

  @media (max-width: 1080px) {
    margin-top: 5rem;
    width: 100%;
    padding: 0.5rem;
  }
`;

const SectionFirst = styled.section`
  width: 100vw;
  min-height: 262px;

  background-color: white;
  padding: 3rem;

  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
  }
`;

const SectionSecond = styled.section`
  width: 100vw;
  min-height: 100vh;

  background-color: white;

  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1080px) {
    height: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

const SectionThird = styled.section`
  width: 100vw;
  min-height: 50vh;

  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1080px) {
    height: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

const SectionEighth = styled.section`
  width: 100vw;
  height: 67vw;
  background-color: white;

  background-image: url('/src/Home_IMG/Home_Section_8_Background_IMG.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 728px) {
    height: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;
