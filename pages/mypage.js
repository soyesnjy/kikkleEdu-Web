import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { uid } from '../store/state';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Calendar from '@/component/MyPage_Component/Calendar';
import MyInfo from '@/component/MyPage_Component/MyInfo';
import UserInfoModal from '@/component/MyPage_Component/UserInfoModal';
// MyPage 페이지
export default function MyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState('1999-01-01');
  const [userId, setUserId] = useRecoilState(uid);

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <MainContainer>
      <MyInfo />
      <Calendar setIsOpen={setIsOpen} setDate={setDate} />
      {isOpen && (
        <UserInfoModal
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(false);
          }}
          date={date}
          userId={userId}
        />
      )}
    </MainContainer>
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

// styled-component의 animation 설정 방법 (keyframes 메서드 사용)

const MainContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: white;
  padding: 5rem 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    background-image: url('/src/Background_IMG/Mobile/mobile_background_2.png');
    justify-content: center;
  }
`;
