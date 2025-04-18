'use client';
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// Home Page Props Type 지정
type LessonSectionProps = {
  title: string;
  subtitle: string;
  imgUrl: string;
  routePath: string;
  type: string;
  info: string;
};

const LessonSection = ({
  title,
  subtitle,
  imgUrl,
  type,
  routePath,
  info,
}: LessonSectionProps) => {
  return (
    <SectionContainer>
      {type === 'left' ? (
        <>
          <ContentContainer>
            <Title>{`${title}`}</Title>
            <Subtitle>{`${subtitle}`}</Subtitle>
            <Link href={routePath}>
              <Button>{`바로 가기`}</Button>
            </Link>
          </ContentContainer>
          <ImageContainer>
            {/* <Overlay /> */}
            <img
              src={imgUrl}
              alt={'lesson_img'}
              width={500}
              height={560}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </ImageContainer>{' '}
        </>
      ) : type === 'right' ? (
        <>
          <ImageContainer>
            {/* <Overlay /> */}
            <img
              src={imgUrl}
              alt={'lesson_img'}
              width={500}
              height={560}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </ImageContainer>
          <ContentContainer>
            <Title>{`${title}`}</Title>
            <Subtitle>{`${subtitle}`}</Subtitle>
            <Link href={routePath}>
              <Button>{`바로 가기`}</Button>
            </Link>
          </ContentContainer>
        </>
      ) : (
        <>
          <ContentContainer>
            <Title>{`${title} 소개`}</Title>
            <Subtitle>{`${subtitle}`}</Subtitle>
            <InfoTitle>{`Infomation`}</InfoTitle>
            <Subtitle>{`${info}`}</Subtitle>
          </ContentContainer>
          <ProgramImageContainer>
            <Overlay />
            <img
              src={imgUrl}
              alt={'lesson_img'}
              width={500}
              height={560}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </ProgramImageContainer>
        </>
      )}
    </SectionContainer>
  );
};

// Styled Components
const SectionContainer = styled.div`
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  padding: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1080px) {
    gap: 1rem;
    flex-direction: column;
    padding: 0;
  }
`;

const ContentContainer = styled.div`
  text-align: left;
  min-width: 500px;
  max-width: 500px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 2rem;

  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
    gap: 1rem;
    align-items: center;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-family: Pretendard;
  font-weight: bold;
  color: #333;

  white-space: pre;

  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const InfoTitle = styled.h2`
  font-size: 2rem;
  font-family: Pretendard;
  font-weight: bold;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  font-family: Pretendard;
  line-height: 1.6;
  color: #555;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Button = styled.button`
  background-color: #ff8500;
  color: white;
  border: none;
  padding: 0.75rem 2rem;

  border-radius: 8px;
  font-size: 14px;
  font-family: Pretendard;
  cursor: pointer;
  &:hover {
    background-color: darkorange;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  max-width: 500px;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1080px) {
    max-width: 100%;
  }
`;

const ProgramImageContainer = styled.div`
  /* flex: 1;
  position: relative; */
  width: 610px;
  height: 610px;

  background-image: url('/src/Program_IMG/Program_LessionSection_Background_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1080px) {
    width: 100%;
    height: 100%;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  z-index: -1;
  transform: rotate(-2deg);
`;

export default LessonSection;
