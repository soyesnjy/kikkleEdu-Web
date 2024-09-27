import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const LessonSection = ({ title, subtitle, imgUrl, type }) => {
  return (
    <SectionContainer>
      {type === 'left' ? (
        <>
          <ContentContainer>
            <Title>{`${title}`}</Title>
            <Subtitle>{`${subtitle}`}</Subtitle>
            <InfoText>Loren..</InfoText>
            <Description>
              Lorem ipsum dolor sit amet veli elitni legro int dolor.
            </Description>
            <InfoText>Loren..</InfoText>
            <Description>
              Lorem ipsum dolor sit amet veli elitni legro int dolor.
            </Description>
            <Button>바로 가기</Button>
          </ContentContainer>
          <ImageContainer>
            <Overlay />
            <Image
              src={imgUrl}
              alt={'lesson_img'}
              width={600}
              height={660}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </ImageContainer>{' '}
        </>
      ) : (
        <>
          <ImageContainer>
            <Overlay />
            <Image
              src={imgUrl}
              alt={'lesson_img'}
              width={600}
              height={660}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </ImageContainer>
          <ContentContainer>
            <Title>{`${title}`}</Title>
            <Subtitle>{`${subtitle}`}</Subtitle>
            <InfoText>Loren..</InfoText>
            <Description>
              Lorem ipsum dolor sit amet veli elitni legro int dolor.
            </Description>
            <InfoText>Loren..</InfoText>
            <Description>
              Lorem ipsum dolor sit amet veli elitni legro int dolor.
            </Description>
            <Button>바로 가기</Button>
          </ContentContainer>
        </>
      )}
    </SectionContainer>
  );
};

export default LessonSection;

// Styled Components
const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  padding: 2rem;

  gap: 15rem;

  @media (max-width: 1080px) {
    gap: 1rem;
    flex-direction: column;
    padding: 0;
  }
`;

const ContentContainer = styled.div`
  text-align: left;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 2rem;

  @media (max-width: 1080px) {
    max-width: 100%;
    gap: 1rem;
    flex-direction: column;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-family: Pretendard;
  font-weight: bold;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  font-family: Pretendard;
  line-height: 1.6;
  color: #555;
`;

const InfoText = styled.p`
  font-size: 24px;
  font-family: Nunito;
  font-weight: bold;
  color: #444;
`;

const Description = styled.p`
  font-size: 18px;
  font-family: Pretendard;
  color: #666;
  line-height: 1.4;
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
  max-width: 600px;
  height: auto;

  @media (max-width: 1080px) {
    max-width: 100%;
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
