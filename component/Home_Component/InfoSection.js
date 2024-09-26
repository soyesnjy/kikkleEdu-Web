import React from 'react';
import styled from 'styled-components';

const InfoSection = () => {
  return (
    <SectionContainer>
      <ContentContainer>
        <RhinoIcon />
        <Text>
          소예키즈는 어린이들의
          <br />
          창의성발달, 신체발달, 사회성 발달, 정서발달에
          <br />
          가치실현을 목표로 하고 있습니다.
        </Text>
        <Button>소예키즈 소개</Button>
        <CactusIcon />
      </ContentContainer>
    </SectionContainer>
  );
};

export default InfoSection;

// Styled Components
const SectionContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const ContentContainer = styled.div`
  width: 70%;
  height: 70%;
  padding: 2rem;
  margin: 2rem auto;

  background-color: #f4eee5;
  position: relative;

  border-radius: 30px;
  background-image: url('/src/Introduce_IMG/Introduce_Header_Background_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  gap: 2rem;

  z-index: 1;
`;

const Text = styled.p`
  font-size: 3rem;
  font-weight: bold;
  font-family: Nunito;
  color: #171717;
  line-height: 1.6;
`;

const Button = styled.button`
  background-color: #ff8500;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-family: Pretendard;

  cursor: pointer;

  &:hover {
    background-color: darkorange;
  }
`;

const RhinoIcon = styled.div`
  width: 196px;
  height: 108px;

  position: absolute;
  top: -95px;
  right: 250px;

  background-image: url('/src/Home_IMG/Icon_IMG/Home_Icon_Rhino_IMG.png');
  background-size: contain;
  background-repeat: no-repeat;
`;

const CactusIcon = styled.div`
  width: 130px;
  height: 187px;

  position: absolute;
  bottom: 30px;
  left: -70px;

  background-image: url('/src/Home_IMG/Icon_IMG/Home_Icon_Catus_IMG.png');
  background-size: contain;
  background-repeat: no-repeat;
`;
