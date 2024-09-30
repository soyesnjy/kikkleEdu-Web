import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const AgencyProgramCard = ({ imgPath, title, content }) => {
  return (
    <CardContainer>
      <Image
        src={imgPath}
        alt="Icon"
        width={56}
        height={56}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <Title>{title}</Title>
      <Content>{content}</Content>
    </CardContainer>
  );
};

export default AgencyProgramCard;

// Styled Components
const CardContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: center;

  background-color: white;
  padding: 1rem;
  border-radius: 15px;

  gap: 0.5rem;

  max-width: 400px;

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
  text-align: center;
`;
