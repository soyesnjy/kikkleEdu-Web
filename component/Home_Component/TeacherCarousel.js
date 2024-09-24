import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const profiles = [
  {
    id: 1,
    name: '이름?',
    description: 'Lorem ipsum dolor sit amet veli elitni legro int dolor.',
  },
  {
    id: 2,
    name: '이름?',
    description: 'Lorem ipsum dolor sit amet veli elitni legro int dolor.',
  },
  {
    id: 3,
    name: '이름?',
    description: 'Lorem ipsum dolor sit amet veli elitni legro int dolor.',
  },
  {
    id: 4,
    name: '이름?',
    description: 'Lorem ipsum dolor sit amet veli elitni legro int dolor.',
  },
  {
    id: 5,
    name: '이름?',
    description: 'Lorem ipsum dolor sit amet veli elitni legro int dolor.',
  },
];

const TeacherCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // 중앙 카드를 시작점으로
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const carouselRef = useRef(null);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? profiles.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === profiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  const touchStart = (index) => (event) => {
    setIsDragging(true);
    setStartPosition(getPositionX(event));
    setPrevTranslate(currentTranslate);
  };

  const touchMove = (event) => {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      const moveDistance = currentPosition - startPosition;
      setCurrentTranslate(prevTranslate + moveDistance);
    }
  };

  const touchEnd = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50 && currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }

    if (movedBy > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setCurrentTranslate(0); // Reset translate after dragging
  };

  const getPositionX = (event) => {
    return event.type.includes('mouse')
      ? event.pageX
      : event.touches[0].clientX;
  };

  const getTranslateStyle = () => {
    return `translateX(calc(-${(currentIndex - 1) * (100 / 3)}% + ${currentTranslate}px))`;
  };

  return (
    <Section>
      <Title>강사 프로필</Title>
      <Description>
        Lorem ipsum dolor sit amet veli elitni legro int dolor.Lorem ipsum dolor
        sit amet veli elitni legro int dolor.
      </Description>
      <CarouselContainer>
        <Button onClick={handlePrevClick}>◀</Button>
        <CarouselWrapper
          ref={carouselRef}
          onMouseDown={touchStart(currentIndex)}
          onMouseMove={touchMove}
          onMouseUp={touchEnd}
          onMouseLeave={touchEnd}
          onTouchStart={touchStart(currentIndex)}
          onTouchMove={touchMove}
          onTouchEnd={touchEnd}
        >
          <ProfilesContainer
            style={{
              transform: getTranslateStyle(),
              transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
            }}
          >
            {profiles.map((profile) => (
              <ProfileCard key={profile.id}>
                <ProfilePicture />
                <ProfileName>{profile.name}</ProfileName>
                <ProfileDescription>{profile.description}</ProfileDescription>
                <ReadMoreButton>Read More</ReadMoreButton>
              </ProfileCard>
            ))}
          </ProfilesContainer>
        </CarouselWrapper>
        <Button onClick={handleNextClick}>▶</Button>
      </CarouselContainer>
      <Dots>
        {profiles.map((_, index) => (
          <Dot key={index} active={index === currentIndex} />
        ))}
      </Dots>
    </Section>
  );
};

export default TeacherCarousel;

// Styled Components

const Section = styled.section`
  text-align: center;
  padding: 3rem;
  background-color: #4ac3d7;
  border-radius: 20px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: white;
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
  width: 1000px; /* 한 번에 3개의 카드를 보여주기 위해 900px로 설정 */
  overflow: hidden;
`;

const ProfilesContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  user-select: none;
`;

const ProfileCard = styled.div`
  width: 300px; /* 한 카드의 너비 */
  background-color: white;
  border-radius: 20px;
  padding: 2rem;
  margin: 0 1rem;
  flex-shrink: 0;
  text-align: left;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  &:active {
    background-color: grey;
  }
`;

const ProfilePicture = styled.div`
  width: 80px;
  height: 80px;
  background-color: #eee;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const ProfileName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ProfileDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.5rem;
`;

const ReadMoreButton = styled.button`
  background-color: orange;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darkorange;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  z-index: 10;
  &:hover {
    color: #ffcc00;
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
`;
