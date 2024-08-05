import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const EBTResultCard = ({
  ebt_class,
  img_url,
  title,
  backColor,
  color,
  onClick,
}) => {
  return (
    <CardContainer
      backColor={backColor}
      onClick={() => {
        onClick(ebt_class);
      }}
    >
      <Image
        src={img_url}
        alt={'soyes_logo'}
        width={100}
        height={100}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <Title color={color}>{title}</Title>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${(props) => props.backColor || '#fff'};
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 10px;

  gap: 4rem;

  cursor: pointer;

  @media (max-width: 1200px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  font-family: AppleSDGothicNeoM00;
  color: ${(props) => (props.color ? props.color : 'black')};

  @media (max-width: 1200px) {
    font-size: 30px;
  }

  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

export default EBTResultCard;
