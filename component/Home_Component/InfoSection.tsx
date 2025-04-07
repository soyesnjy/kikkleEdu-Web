'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { useRecoilValue } from 'recoil';
import { mobile } from '@/store/state';
import { ScrollAnimation } from '@/component/Home_Component/Scroll_Animation/ScrollAnimation';

const InfoSection = () => {
  const mobileFlag = useRecoilValue(mobile);

  return (
    <SectionContainer>
      <ContentContainer>
        <ScrollAnimation startingPoint="right" duration={1} repeat={true}>
          <RhinoIcon />
        </ScrollAnimation>
        <Text>
          {!mobileFlag
            ? `소예키즈는 어린이들의 \n 창의성발달, 신체발달, 사회성 발달, 정서발달에 \n 가치실현을 목표로 하고 있습니다.`
            : `소예키즈는 어린이들의 \n 창의성발달, 신체발달, \n 사회성 발달, 정서발달에 \n 가치실현을 \n 목표로 하고 있습니다.`}
        </Text>
        <Link href={'/introduce'}>
          <Button>{`소예키즈 소개`}</Button>
        </Link>
        <ScrollAnimation startingPoint="left" duration={1} repeat={true}>
          <CactusIcon />
        </ScrollAnimation>
      </ContentContainer>
    </SectionContainer>
  );
};

export default InfoSection;

const SectionContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  @media (max-width: 1080px) {
    height: auto;
  }
`;

const ContentContainer = styled.div`
  width: 70%;
  height: 70%;
  padding: 2rem;
  margin: 2rem auto;

  background-color: #f4eee5;
  position: relative;

  border-radius: 30px;
  background-image: url('/src/Introduce_IMG/Introduce_Header_Background_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  gap: 2rem;

  @media (max-width: 1080px) {
    width: 90%;
    height: 40%;

    margin: 0;
  }
`;

const Text = styled.p`
  font-size: 3rem;
  font-weight: 600;
  font-family: Nunito;
  color: #171717;
  line-height: 1.6;

  white-space: pre;

  @media (max-width: 1080px) {
    font-size: 24px;
  }
`;

const Button = styled.button`
  background-color: #ff8500;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-family: Pretendard;

  cursor: pointer;

  &:hover {
    background-color: darkorange;
  }
`;

const RhinoIcon = styled.div`
  width: 196px;
  height: 108px;

  position: absolute;
  top: -95px;
  right: 250px;

  background-image: url('/src/Home_IMG/Icon_IMG/Home_Icon_Rhino_IMG.png');
  background-size: contain;
  background-repeat: no-repeat;

  @media (max-width: 1080px) {
    width: 140px;
    height: 77px;
    top: -65px;
    right: 50px;
  }
`;

const CactusIcon = styled.div`
  width: 130px;
  height: 187px;

  position: absolute;
  bottom: 30px;
  left: -70px;

  background-image: url('/src/Home_IMG/Icon_IMG/Home_Icon_Catus_IMG.png');
  background-size: contain;
  background-repeat: no-repeat;

  @media (max-width: 1080px) {
    width: 80px;
    height: 115px;
    bottom: 0px;
    left: -10px;
  }
`;
