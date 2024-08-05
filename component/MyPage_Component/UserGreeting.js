// components/UserGreeting.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { uid } from '../../store/state';
import { handleUserExpiration } from '@/fetchAPI/kakaoPayAPI';

const UserGreeting = ({ purchaseDate }) => {
  const [userId, setUserId] = useRecoilState(uid);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    handleUserExpiration({ pUid: localStorage.getItem('id') })
      .then((res) => res.data)
      .then((data) => {
        if (!data?.expirationDate) return; // 초회 결제조차 안한 경우
        const timeDifference = new Date(data.expirationDate) - new Date(); // 두 날짜 간의 차이를 밀리초 단위로 계산
        if (timeDifference <= 0) return; // 이용권이 지난 경우
        const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // 밀리초 단위의 차이를 일(day) 단위로 변환
        setDaysLeft(dayDifference);
      });
  }, []);

  return (
    <Container>
      <Image
        src="/src/MyPage_IMG/Icon/MyPage_Soyes_Icon_IMG.png"
        alt="User Avatar"
        width={120}
        height={120}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <TextContainer>
        <GreetingText>
          <span>{userId}</span>님 안녕하세요!
        </GreetingText>
        {daysLeft ? (
          <StatusText>
            현재 <span>이용권이 {daysLeft}일</span> 남았어요
          </StatusText>
        ) : (
          <StatusText>
            현재 구매한 <span>이용권</span>이 없어요
          </StatusText>
        )}
        <PurchaseDate>
          {purchaseDate ? `[ ${purchaseDate}구매 ]` : null}
        </PurchaseDate>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: none;
  border-radius: 20px;
  padding: 10px 20px;

  gap: 1rem;

  @media (max-width: 768px) {
    width: 95vw;
    background-color: #fffbe5;
  }
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const GreetingText = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;

  font-family: AppleSDGothicNeoB00;

  span {
    font-size: 2rem;
    color: #746d69;
  }

  @media (max-width: 768px) {
    span {
      font-size: 1.5rem;
    }
  }
`;

const StatusText = styled.div`
  font-size: 1rem;
  color: #333;
  span {
    color: #ff5a5a;
    font-weight: bold;
  }

  font-family: AppleSDGothicNeoB00;
`;

const PurchaseDate = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 4px;

  font-family: AppleSDGothicNeoB00;
`;

export default UserGreeting;
