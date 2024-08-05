// components/SubscriptionStatus.js
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const SubscriptionStatus = ({ daysLeft }) => {
  return (
    <Container>
      <ImageContainer>
        <Image
          src="/src/Shop_IMG/Shop_Avartar_3_IMG.png"
          alt="Character 1"
          width={1493}
          height={724}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </ImageContainer>
      <TextContainer>
        {daysLeft
          ? `구매한 이용권이 ${daysLeft}일 남았어요!`
          : '구매한 이용권이 없어요!'}
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;

  max-width: 1000px;
  width: 100%;
  position: relative;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const TextContainer = styled.div`
  background-color: #9051ff;
  color: white;
  border-radius: 40px;
  padding: 1.5rem 2.3rem;
  font-size: 25px;
  font-weight: bold;
  text-align: center;

  position: absolute;
  bottom: 7%;

  font-family: AppleSDGothicNeoH00;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    font-size: 1rem;
  }
`;

export default SubscriptionStatus;
