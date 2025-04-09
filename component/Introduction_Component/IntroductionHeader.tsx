'use client';
import React from 'react';
import styled from 'styled-components';

type PropsType = {
  title: string;
  subTitle: string;
  description?: string;
  bottomTitle: string;
  bottomSubTitle: string;
  $imgPath: string;
};

const IntroductionHeader = ({
  title,
  subTitle,
  description,
  bottomTitle,
  bottomSubTitle,
  $imgPath,
}: PropsType) => {
  return (
    <HeaderSection imgPath={$imgPath}>
      <HeaderContent>
        <Title>{title}</Title>
        <Subtitle>{subTitle}</Subtitle>
        <Description>{description}</Description>
        <HeaderIntroDiv>
          {bottomTitle} - <GreenColorSpan>{bottomSubTitle}</GreenColorSpan>
        </HeaderIntroDiv>
      </HeaderContent>
    </HeaderSection>
  );
};

type HeaderSectionType = {
  imgPath: string;
};

const HeaderSection = styled.section<HeaderSectionType>`
  width: 80vw;
  min-height: 21vw;
  position: relative;

  /* linear-gradient와 이미지 URL을 background 속성으로 조합 */
  background: linear-gradient(
      90deg,
      rgba(76, 176, 178, 0.8) 0%,
      rgba(76, 176, 178, 0) 60.5%
    ),
    ${(props) => `url(${props.imgPath})`};
  background-size: cover;
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

export default IntroductionHeader;
