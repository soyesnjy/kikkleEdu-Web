import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { handleTeacherGet } from '@/fetchAPI/teacherAPI';
import Image from 'next/image';

const partnerDataArr = [
  {
    id: 60,
    name: 'Partner',
    introduce: 'Lorem',
    profileImg: '',
  },
  {
    id: 60,
    name: 'Partner',
    introduce: 'Lorem',
    profileImg: '',
  },
  {
    id: 60,
    name: 'Partner',
    introduce: 'Lorem',
    profileImg: '',
  },
  {
    id: 60,
    name: 'Partner',
    introduce: 'Lorem',
    profileImg: '',
  },
  {
    id: 60,
    name: 'Partner',
    introduce: 'Lorem',
    profileImg: '',
  },
  {
    id: 60,
    name: 'Partner',
    introduce: 'Lorem',
    profileImg: '',
  },
  {
    id: 60,
    name: 'Partner',
    introduce: 'Lorem',
    profileImg: '',
  },
  {
    id: 60,
    name: 'Partner',
    introduce: 'Lorem',
    profileImg: '',
  },
  {
    id: 60,
    name: 'Partner',
    introduce: 'Lorem',
    profileImg: '',
  },
];
const PartnerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // 가운데 카드로 시작

  const router = useRouter();

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? partnerDataArr.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === partnerDataArr.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const getTranslateStyle = () => {
    if (currentIndex < Math.ceil(partnerDataArr.length / 2))
      return `translateX(calc(0%))`;
    else if (currentIndex >= Math.ceil(partnerDataArr.length / 2))
      return `translateX(calc(-100%))`;
  };

  return (
    <Section>
      <Title>Happy Partner</Title>
      <Description>
        Lorem ipsum dolor sit amet veli elitni legro int dolor.Lorem ipsum dolor
        sit amet veli elitni legro int dolor.Lorem ipsum dolor sit amet veli
        elitni legro int dolor.
      </Description>
      <CarouselContainer>
        <Button onClick={handlePrevClick}>
          <span className="material-symbols-outlined">arrow_back</span>
        </Button>
        <CarouselWrapper>
          <ProfilesContainer
            style={{
              transform: getTranslateStyle(),
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {partnerDataArr.map((profile, index) => (
              <ProfileCard key={profile.id} active={index === currentIndex}>
                <Image
                  src={
                    profile.profileImg ||
                    '/src/Home_IMG/Icon_IMG/Home_Icon_2_IMG.png'
                  }
                  alt="profile_IMG"
                  width={73}
                  height={73}
                  style={{
                    borderRadius: '50%',
                  }}
                />
                <ProfilesTextContainer>
                  <ProfileName>{profile.name}</ProfileName>
                  <ProfileDescription>{profile.introduce}</ProfileDescription>
                </ProfilesTextContainer>
              </ProfileCard>
            ))}
          </ProfilesContainer>
        </CarouselWrapper>
        <Button onClick={handleNextClick}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </Button>
      </CarouselContainer>
      <Dots>
        {partnerDataArr.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </Dots>
    </Section>
  );
};

export default PartnerCarousel;

// Styled Components

const Section = styled.section`
  text-align: center;
  padding: 3rem;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  font-family: Pretendard;
  color: black;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  width: 70%;
  font-size: 1rem;
  font-family: Pretendard;
  color: black;
  margin-bottom: 2rem;
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const CarouselWrapper = styled.div`
  width: 1500px;
  overflow: hidden;
`;

const ProfilesContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const ProfileCard = styled.div`
  width: 300px;
  background-color: ${(props) => (props.active ? 'white' : 'transparent')};

  border-radius: 50px;
  padding: 1rem;

  flex-shrink: 0;
  text-align: left;

  box-shadow: ${(props) =>
    props.active ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};

  transition:
    background-color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;

  user-select: none;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  h3,
  p {
    color: ${(props) => (props.active ? 'black' : 'gray')};
  }

  /* 사다리꼴 모양을 만들기 위한 clip-path */
  /* clip-path: polygon(0% 10%, 100% -5%, 100% 100%, 0% 100%); */
`;

const ProfilesTextContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 0.5rem;
`;

const ProfileName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  font-family: Nunito;
`;

const ProfileDescription = styled.p`
  font-size: 1rem;
  font-family: Pretendard;
  color: #555;
`;

const ReadMoreButton = styled.button`
  background-color: #ff8500;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-size: 14px;
  font-family: Pretendard;

  cursor: pointer;

  &:hover {
    background-color: darkorange;
  }
`;

const Button = styled.button`
  width: 56px;
  height: 56px;

  background-color: white;
  border: none;
  border-radius: 100%;
  color: #a3a3a3;

  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 2.2rem;
  }

  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: #ff8500;
    color: white;
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? 'orange' : '#ddd')};
  margin: 0 5px;
  transition: background-color 0.3s;
  cursor: pointer;
`;
