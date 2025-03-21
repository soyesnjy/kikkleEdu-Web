import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { ScrollAnimation } from '@/component/Home_Component/Scroll_Animation/ScrollAnimation';

const EducationCard = ({ imgPath, title, content, delay }) => {
  return (
    <ScrollAnimation startingPoint="bottom" delay={delay} repeat={true}>
      <CardContainer>
        <Image
          src={imgPath}
          alt="Icon"
          width={100}
          height={100}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <TextContainer>
          <Title>{title}</Title>
          <Content>{content}</Content>
        </TextContainer>
      </CardContainer>
    </ScrollAnimation>
  );
};

export default EducationCard;

// Styled Components
const CardContainer = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
  /* background-color: white; */
  padding: 1rem;
  border-radius: 15px;

  gap: 1rem;

  max-width: 400px;

  @media (max-width: 1080px) {
    width: 100%;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 0.5rem;

  @media (max-width: 1080px) {
    width: 100%;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  font-family: Nunito;
`;

const Content = styled.p`
  color: #737373;
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
`;
