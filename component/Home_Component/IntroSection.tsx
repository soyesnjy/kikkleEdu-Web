'use client';
import styled from 'styled-components';
import Link from 'next/link';

import { useRecoilValue } from 'recoil';
import { mobile } from '@/store/state';

import Background from '../Common_Component/Background';

export default function IntroSection() {
  const mobileFlag = useRecoilValue(mobile);
  return (
    <>
      <IntroSectionContainer>
        <Background
          imgPath={
            mobileFlag
              ? `/src/Home_IMG/Home_Intro_Background_Mobile_IMG.png`
              : `/src/Home_IMG/Home_Intro_Background_IMG.png`
          }
          imgAlt={'Main Background Img'}
        />
        <ReadContainer>
          <H1>{`Kids Class Edu`}</H1>
          {/* 웹 */}
          {!mobileFlag && (
            <>
              <H4>{`우리아이의 건강한 몸과 마음의 행복을 위해`}</H4>
              <Link href={'/introduce/content'}>
                <Button>{`Read More`}</Button>
              </Link>
            </>
          )}
        </ReadContainer>
      </IntroSectionContainer>
      {/* 모바일 */}
      {mobileFlag && (
        <FirstMobileContainer>
          <H4>{`우리아이의 건강한 몸과 마음의 행복을 위해`}</H4>
          <Link href={'/introduce/content'}>
            <Button>{`Read More`}</Button>
          </Link>
        </FirstMobileContainer>
      )}
    </>
  );
}

export const IntroSectionContainer = styled.section`
  width: 100vw;
  min-height: 59vw;
  position: relative;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    min-height: 76vw;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1.3rem 0.8rem;
  }
`;

export const ReadContainer = styled.div`
  width: 40vw;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  color: white;
  z-index: 1;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
    justify-content: flex-start;
  }
`;

export const H1 = styled.h1`
  font-size: 80px;
  font-weight: bold;
  font-family: Nunito;
  color: white;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 50px;
    width: 90%;
    color: #2e6c6d;
  }
`;

export const H4 = styled.h4`
  font-size: 20px;
  font-weight: 300;
  font-family: Pretendard;
  color: white;
  z-index: 1;

  @media (max-width: 768px) {
    color: #2e6c6d;
  }
`;

export const Button = styled.button`
  font-family: Nunito;
  background-color: #ffca1b;
  border-radius: 10px;
  border: none;
  margin-top: 5rem;
  padding: 1rem 3rem;
  color: white;
  cursor: pointer;
  z-index: 1;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

export const SectionFirst = styled.section`
  width: 100vw;
  min-height: 262px;
  margin: 5rem 0;
  background-color: #f4eee5;
  padding: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    background-color: white;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
    margin: 0;
  }
`;

export const FirstMobileContainer = styled.div`
  margin: 3rem 0;
  z-index: 1;

  @media (max-width: 768px) {
    background-color: white;
  }
`;
