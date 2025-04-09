'use client';
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled from 'styled-components';

import { useRecoilState } from 'recoil';
import { mobile } from '@/store/state';

type PropsType = {
  title: string;
  subTitle: string;
  $imgPath?: string;
};

const IntroductionMiddler = ({ title, subTitle, $imgPath }: PropsType) => {
  const [mobileFlag] = useRecoilState(mobile);
  return (
    <MiddleSection>
      {$imgPath && !mobileFlag ? (
        <img
          src={$imgPath}
          alt="Introduction_Icon"
          width={178}
          height={213}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      ) : null}
      <MiddleContainer>
        <MiddleTitle>{title}</MiddleTitle>
        <MiddleSubtitle>{subTitle}</MiddleSubtitle>
      </MiddleContainer>
    </MiddleSection>
  );
};

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

export default IntroductionMiddler;
