import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const ContentBlockWeb = ({ title, subtitle, iconPath, linkUrl, color }) => {
  return (
    <Container>
      <IconContainer>
        <Image
          src={iconPath}
          alt="Content_Icon"
          width={60}
          height={60}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        <Title color={color}>{title}</Title>
        <PlayButton>
          <Link href={linkUrl}>
            <Image
              src="/src/Content_IMG/Frame_재생버튼.png"
              alt="재생버튼"
              width={40}
              height={40}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Link>
        </PlayButton>
      </IconContainer>
      <TextContainer>
        <Subtitle>{subtitle}</Subtitle>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 390px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fffbe9;

  border: 2px solid #e7e7e7;
  border-radius: 20px;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 300px;
    height: 150px;
  }
`;

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 0;
  color: ${(props) => props.color || 'black'};
  font-family: AppleSDGothicNeoM00;
  font-size: 30px;
  font-weight: 600;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Subtitle = styled.span`
  margin: 0;
  color: #333333;
  font-family: AppleSDGothicNeoM00;
  font-size: 25px;
  font-weight: 400;
  user-select: none;
  letter-spacing: -0.1em;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PlayButton = styled.button`
  visibility: hidden; // 임시로 막아둠
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 24px;
  color: #bbb;
  &:hover {
    color: #888;
  }
`;

export default ContentBlockWeb;
