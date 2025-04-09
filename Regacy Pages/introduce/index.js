import React, { useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { loadingImg } from '@/component/Common_Component/LoadingBase64';

import { useRecoilState } from 'recoil';
import { mobile } from '@/store/state';

import IntroductionCarousel from '@/component/Introduction_Component/IntroductionCarousel';
import EndSection from '@/component/Home_Component/EndSection';

import useDisableSideMenu from '@/hook/useDisableSideMenu';

const HistoryPage = () => {
  const [mobileFlag] = useRecoilState(mobile);
  const carouselRef = useRef(null);
  useDisableSideMenu(carouselRef); // 사이드 메뉴 예외 처리

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Title>Kids Class edu</Title>
          <Subtitle>회사 연혁</Subtitle>
          <Description>우리아이의 건강한 마음과 행복을 위해</Description>
          <HeaderIntroDiv>
            소예키즈 소개 - <GreenColorSpan>회사 연혁</GreenColorSpan>
          </HeaderIntroDiv>
        </HeaderContent>
      </HeaderSection>
      {/* 미들 섹션 */}
      <MiddleSection>
        {!mobileFlag && (
          <Image
            src="/src/Introduce_IMG/Introduce_Middle_Icon_IMG.png"
            alt="Icon"
            width={178}
            height={213}
            style={{ maxWidth: '100%', height: 'auto' }}
            placeholder="blur"
            blurDataURL={loadingImg}
          />
        )}
        <MiddleContainer>
          <MiddleTitle>KK EDU - History</MiddleTitle>
          <MiddleSubtitle>회사 연혁</MiddleSubtitle>
        </MiddleContainer>
      </MiddleSection>
      {/* 달력 섹션 */}
      <CarouselContainer ref={carouselRef}>
        <IntroductionCarousel />
      </CarouselContainer>
      {/* 엔드 섹션 */}
      <EndSection
        Title={`우리아이의 성장 소예키즈와 함께 \n 몸과 마음을 성장시켜요`}
        btnTitle={`콘텐츠 소개`}
        routePath={`/program`}
      />
    </MainContainer>
  );
};

export default HistoryPage;

const MainContainer = styled.div`
  width: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderSection = styled.section`
  width: 80vw;
  min-height: 21vw;
  position: relative;
  /* linear-gradient와 이미지 URL을 background 속성으로 조합 */
  background: linear-gradient(
      90deg,
      rgba(76, 176, 178, 0.8) 0%,
      rgba(76, 176, 178, 0) 60.5%
    ),
    url('/src/Introduce_IMG/Company/Introduce_CompanyIntro_Header_Background_IMG.png');
  background-size: cover; /* 배경 이미지 크기 조정 */
  background-position: center;
  background-repeat: no-repeat;

  padding: 0 4rem 0 4rem;
  border-radius: 24px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    background: url('/src/Introduce_IMG/Company/Introduce_CompanyIntro_Header_Background_Mobile_IMG.png');
    background-size: cover; /* 배경 이미지 크기 조정 */
    background-position: center;
    background-repeat: no-repeat;

    width: 90vw;
    min-height: 90vw;
    padding: 0 2rem;
    background-position: right;
    align-items: flex-start;
  }
`;

const HeaderContent = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-top: 3rem;
  }
`;

const Title = styled.h1`
  color: white;

  font-size: 1rem;
  font-family: Nunito;
  font-weight: 600;

  @media (max-width: 768px) {
    color: black;
  }
`;

const Subtitle = styled.h2`
  color: white;

  font-size: 2.2rem;
  font-family: Pretendard;
  font-weight: 700;

  @media (max-width: 768px) {
    color: black;
  }
`;

const Description = styled.p`
  color: white;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 400;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderIntroDiv = styled.div`
  width: fit-content;
  padding: 1rem 1.5rem;

  position: absolute;
  bottom: 0;
  right: 10%;

  background-color: white;
  border-radius: 25px 25px 0 0;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 600;
`;

const GreenColorSpan = styled.span`
  color: #45b26b;
  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 600;
`;

const MiddleSection = styled.section`
  width: 80vw;
  min-height: 327px;
  position: relative;

  padding: 0 2rem 0 2rem;
  border-radius: 24px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 4rem;

  @media (max-width: 768px) {
    width: 90vw;
    min-height: 300px;
    padding: 0 1rem;
  }
`;

const MiddleContainer = styled.section`
  border-radius: 24px;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 1rem;
`;

const MiddleTitle = styled.h1`
  font-size: 1rem;
  font-family: Nunito;
  font-weight: 600;
  color: #d97904;
`;

const MiddleSubtitle = styled.h2`
  font-size: 2rem;
  font-family: Pretendard;
  font-weight: 700;
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;
