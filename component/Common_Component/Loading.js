// components/LoadingScreen.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const Loading = ({ duration }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = duration; // 500ms
    const intervalDuration = totalDuration / 100; // 5ms per percent
    let progressValue = 0;

    const interval = setInterval(() => {
      progressValue += 5;
      setProgress(progressValue);

      if (progressValue >= 100) {
        clearInterval(interval);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Logo>
        <Image
          src="/src/Login_IMG/Login_Logo_IMG.png"
          alt="Logo"
          width={412}
          height={102}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </Logo>
      <AvartarLogoContainer backImgUrl="/src/Loading_IMG/Loading_Background_Logo_IMG.png">
        <Image
          src="/src/Loading_IMG/Loading_Soyes_Logo_IMG.png"
          alt="Logo"
          width={182}
          height={200}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </AvartarLogoContainer>

      <Subtitle>스마트한 일상의 시작은</Subtitle>
      <Title>아동 멘탈 케어 솔루션</Title>
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
      <Percentage>{progress}%</Percentage>
    </Container>
  );
};

const Container = styled.div`
  background-image: url('/src/Login_IMG/Login_Background_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f9f9f9;
`;

const Logo = styled.div`
  margin-bottom: 20px;
`;

const AvartarLogoContainer = styled.div`
  width: 236px;
  height: 236px;

  background-image: ${(props) => `url(${props.backImgUrl})`};
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;

  /* background-color: #ffdd00; Yellow background */

  position: relative;

  /* padding-right: 4rem; */

  @media (max-width: 768px) {
    width: 60vw;
    height: 60vw;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 40px;
`;

const Subtitle = styled.h2`
  font-size: 20px;
  color: #666;
  margin: 20px 0 0 0;
`;

const ProgressBarContainer = styled.div`
  width: 30%;
  height: 20px;
  background-color: #c978ff;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;

  padding: 0.15rem;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const ProgressBar = styled.div`
  border-radius: 10px;
  height: 100%;
  background-color: white;
  width: ${(props) => props.progress}%;
  transition: width 0.5s ease;
`;

const Percentage = styled.div`
  font-size: 16px;
  color: #333;
`;

export default Loading;
