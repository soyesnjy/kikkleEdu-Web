/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
import styled, { keyframes } from 'styled-components';
import { FlexContainer } from '../../styled-component/common';

import { useEffect, useState, useCallback } from 'react';

// 아바타 관련 전역 변수
import { useRecoilState } from 'recoil';
import { log } from '../../store/state';

import { useRouter } from 'next/router';

import BoardCreate from '@/component/Board_Component/BoardCreate';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function BoardCreatePage() {
  const [login, setLogin] = useRecoilState(log);

  const router = useRouter();

  // 로그인 권한이 없는 상태에서의 접근 시 login 페이지로 redirect
  useEffect(() => {
    const loginSession = JSON.parse(localStorage.getItem('log'));
    if (!loginSession) {
      router.replace('/login');
    }
  }, [login]);

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Title>Kids Class edu</Title>
          <Subtitle>문의 하기</Subtitle>
          <Description>
            Lorem ipsum dolor sit amet veli elitni legro int dolor.
          </Description>
          <HeaderIntroDiv>
            소예키즈 소개 - <GreenColorSpan>게시판</GreenColorSpan>
          </HeaderIntroDiv>
        </HeaderContent>
      </HeaderSection>
      <BoardCreate />
    </MainContainer>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['review', 'nav'])),
    },
  };
}

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  background-color: white;

  display: flex;
  flex-direction: column;

  gap: 2rem;

  align-items: center;
`;

const HeaderSection = styled.section`
  width: 80vw;
  min-height: 327px;
  position: relative;

  background-image: url('/src/Introduce_IMG/Introduce_Header_Background_IMG.png');
  background-size: contain;
  background-position: center;
  /* background-repeat: no-repeat; */
  background-color: #f4eee5;

  padding: 0 4rem 0 4rem;
  border-radius: 24px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const Title = styled.h1`
  color: #333;

  font-size: 1rem;
  font-family: Nunito;
  font-weight: 600;
`;

const Subtitle = styled.h2`
  color: #333;

  font-size: 2.2rem;
  font-family: Pretendard;
  font-weight: 700;
`;

const Description = styled.p`
  color: #666;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 400;
`;

const HeaderIntroDiv = styled.div`
  width: fit-content;
  padding: 1rem 1.5rem;

  position: absolute;
  bottom: 0;
  right: 3rem;

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

const BoardContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #eaeff7;
  color: #333;
  font-weight: bold;
  text-align: left;

  /* 열 비율 설정 */
  &:nth-child(1) {
    width: 15%; /* 첫 번째 열의 너비를 10%로 설정 */
  }
  &:nth-child(2) {
    width: 50%; /* 두 번째 열의 너비를 50%로 설정 */
  }
  &:nth-child(3) {
    width: 20%; /* 세 번째 열의 너비를 10%로 설정 */
  }
  &:nth-child(4) {
    width: 20%; /* 네 번째 열의 너비를 15%로 설정 */
  }
`;
