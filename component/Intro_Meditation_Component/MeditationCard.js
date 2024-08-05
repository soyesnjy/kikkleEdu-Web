// components/MeditationCard.js
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const MeditationCard = ({ content, cardImgUrl, title, subtitle, path }) => {
  return (
    <StyledLink href={path}>
      <CardContainer cardImgUrl={cardImgUrl}>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </CardContainer>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const CardContainer = styled.div`
  background-image: url(${(props) => props.cardImgUrl});
  background-size: cover;
  background-position: center;

  border-radius: 20px;
  padding: 20px;
  padding-bottom: 4rem;
  width: 470px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  color: white;

  @media (max-width: 768px) {
    width: 90vw;
    min-height: 400px;
  }
`;

const Title = styled.div`
  color: black;
  font-size: 40px;
  font-weight: bold;
  font-family: Cafe24Ssurround;

  margin-bottom: 10px;
  text-align: center;
  letter-spacing: -0.1rem;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const Subtitle = styled.div`
  width: 80%;
  color: black;
  font-size: 23px;
  font-weight: 400;
  font-family: AppleSDGothicNeoM00;

  text-align: center;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export default MeditationCard;
