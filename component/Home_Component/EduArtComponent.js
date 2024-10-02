import React from 'react';
import styled from 'styled-components';

const EduArtComponent = ({ sectionData }) => {
  const { title, content, features, imgPath } = sectionData;
  return (
    <Container>
      <LeftSection>
        <Title>{title}</Title>
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
                  style={{ maxWidth: '100%', height: 'auto' }}
                />{' '}
                {feature}
              </FeatureItem>
            ))}
          </FeatureList>
        </RightSection>
      </LeftSection>
      <Image
        src={imgPath}
        alt="Edu Art"
        width={1200}
        height={771}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </Container>
  );
};

export default EduArtComponent;

// Styled Components
const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin: 0 auto;
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

  margin-bottom: 1rem;
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

const Image = styled.img`
  height: auto;
  border-radius: 20px;
`;
