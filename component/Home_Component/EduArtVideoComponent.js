import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const EduArtVideoComponent = ({ sectionData }) => {
  const { title, content, features, youtubeUrl } = sectionData;
  return (
    <Container>
      <LeftSection>
        <Title>{`${title}\n프로그램 영상`}</Title>
        <RightSection>
          <Content>{content}</Content>
          <FeatureList>
            {features?.map((feature, index) => (
              <FeatureItem key={index}>
                <Image
                  src="/src/Home_IMG/Icon_IMG/Home_Icon_4_IMG.png"
                  alt="Home_Intro_Picture_IMG"
                  width={24}
                  height={24}
                  // style={{ maxWidth: '100%', height: 'auto' }}
                />{' '}
                {feature}
              </FeatureItem>
            ))}
          </FeatureList>
        </RightSection>
      </LeftSection>
      <VideoContent>
        <iframe
          src={youtubeUrl} // 수업 영상 유튜브 링크
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </VideoContent>
    </Container>
  );
};

export default EduArtVideoComponent;

// Styled Components
const Container = styled.div`
  width: 80%;
  padding: 2rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: white;
  border-radius: 20px;

  gap: 4rem;

  @media (max-width: 1080px) {
    width: 100%;
  }
`;

const LeftSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1080px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const RightSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 2rem;

  @media (max-width: 1080px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  font-family: Nunito;

  white-space: pre;

  margin-bottom: 1rem;

  @media (max-width: 1080px) {
    font-size: 2.5rem;
  }
`;

const Content = styled.p`
  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;
  color: #737373;
`;

const FeatureList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 2fr);

  gap: 2rem 7rem;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(1, 4fr);
    gap: 1rem;
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;

  font-size: 24px;
  font-weight: 700;
  font-family: Nunito;
  color: #000;

  gap: 1rem;
`;

const VideoContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;

  iframe {
    width: 900px;
    height: 528px;
  }
  min-height: 360px;
  z-index: 1;

  @media (max-width: 1080px) {
    iframe {
      width: 100%;
      height: 328px;
    }
  }
`;
