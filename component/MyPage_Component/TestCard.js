// components/TestCard.js
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const TestCard = ({ title, count, iconSrc, playIconSrc, setContent }) => {
  return (
    <CardContainer>
      <IconContainer>
        <Image
          src={iconSrc}
          alt="Icon"
          width={120}
          height={120}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </IconContainer>
      <TextContainer>
        <Title>{title}</Title>
        <Subtitle>[{count}]회</Subtitle>
      </TextContainer>
      <PlayIcon>
        <PlayIconImage
          src={playIconSrc}
          alt="Play Icon"
          onClick={() => {
            setContent(title);
          }}
        />
      </PlayIcon>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fffbef;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 27vw;
  height: 250px;
  position: relative;

  @media (max-width: 768px) {
    width: 300px;
    height: 120px;
  }
`;

const IconContainer = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #b09075;
  margin-bottom: 8px;

  font-family: AppleSDGothicNeoM00;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Subtitle = styled.div`
  font-size: 1.2rem;
  color: #b09075;

  font-family: AppleSDGothicNeoM00;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const PlayIcon = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 30px;
  height: 30px;
  background-color: #f9f5e8;
  /* border: 2px solid #e0c9a6; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const PlayIconImage = styled.img`
  width: 30px;
  height: 30px;
`;

export default TestCard;
