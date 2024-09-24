import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const section_3_Arr = [
  {
    iconImgPath: '/src/Home_IMG/Icon_IMG/Home_Icon_1_IMG.png',
    title: 'Kids education',
    content: 'Lorem ipsum dolor sit amet velit, elitni legro int dolor.',
  },
  {
    iconImgPath: '/src/Home_IMG/Icon_IMG/Home_Icon_2_IMG.png',
    title: 'Culture Class',
    content: 'Lorem ipsum dolor sit amet velit, elitni legro int dolor.',
  },
  {
    iconImgPath: '/src/Home_IMG/Icon_IMG/Home_Icon_3_IMG.png',
    title: 'Full-Time',
    content: 'Lorem ipsum dolor sit amet velit, elitni legro int dolor.',
  },
];

const EduArtClassSection = () => {
  return (
    <Section>
      <Title>EDU ART Class</Title>
      <Description>
        Lorem ipsum dolor sit amet veli elitni legro int dolor.
      </Description>
      <CardContainer>
        <Card>
          <Image
            src="/src/Home_IMG/Icon_IMG/Home_Icon_6_IMG.png"
            alt="Home_Icon_5_IMG"
            width={72}
            height={72}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <CardTitle>Pre School classes</CardTitle>
          <CardContent>
            Lorem ipsum dolor sit amet veli elitni legro int dolor.
          </CardContent>
        </Card>

        <HighlightedCard>
          <Image
            src="/src/Home_IMG/Icon_IMG/Home_Icon_5_IMG.png"
            alt="Home_Icon_5_IMG"
            width={72}
            height={72}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <CardTitle>Edu Class</CardTitle>
          <CardContent>
            Lorem ipsum dolor sit amet veli elitni legro int dolor.
          </CardContent>
        </HighlightedCard>

        <Card>
          <Image
            src="/src/Home_IMG/Icon_IMG/Home_Icon_6_IMG.png"
            alt="Home_Icon_5_IMG"
            width={72}
            height={72}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <CardTitle>Art Class</CardTitle>
          <CardContent>
            Lorem ipsum dolor sit amet veli elitni legro int dolor.
          </CardContent>
        </Card>
      </CardContainer>
    </Section>
  );
};

export default EduArtClassSection;

// Styled Components
const Section = styled.section`
  text-align: center;
  padding: 2rem;
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  font-family: Nunito;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  font-weight: 400;
  font-family: Pretendard;
  color: #737373;
  margin-bottom: 2rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;

  @media (max-width: 728px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Card = styled.div`
  max-width: 373px;

  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  transition: background-color 0.3s ease;

  display: flex;
  flex-direction: column;

  gap: 1rem;

  h3 {
    color: black;
  }

  p {
    color: #666;
  }

  &:hover {
    background-color: #e0e0e0;
  }
`;

const HighlightedCard = styled(Card)`
  max-width: 373px;
  padding: 1.5rem;

  background-color: #ff8500;
  color: white;

  transition: transform 0.3s ease;
  box-shadow: 30px 33px 86px 0px #ff850033;

  display: flex;
  flex-direction: column;

  gap: 1rem;

  h3,
  p {
    color: white;
  }

  &:hover {
    background-color: darkorange;
  }
`;

const Icon = styled.div`
  font-size: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  font-family: Nunito;
`;

const CardContent = styled.p`
  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;
`;
