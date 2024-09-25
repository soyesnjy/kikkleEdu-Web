import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { handleTeacherGet } from '@/fetchAPI/teacherAPI';

const profiles = [
  {
    id: 60,
    name: '이름?',
    introduce: 'Lorem ipsum dolor sit amet veli elitni legro int dolor.',
  },
  {
    id: 60,
    name: '이름?',
    introduce: 'Lorem ipsum dolor sit amet veli elitni legro int dolor.',
  },
  {
    id: 60,
    name: '이름?',
    introduce: 'Lorem ipsum dolor sit amet veli elitni legro int dolor.',
  },
  {
    id: 60,
    name: '이름?',
    introduce: 'Lorem ipsum dolor sit amet veli elitni legro int dolor.',
  },
  {
    id: 60,
    name: '이름?',
    introduce: 'Lorem ipsum dolor sit amet veli elitni legro int dolor.',
  },
];

const TeacherCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // 가운데 카드로 시작
  const [teacherDataArr, setTeacherDataArr] = useState([]); // DB Class Select 값

  const router = useRouter();

  // 강사 List 조회
  useEffect(() => {
    if (!teacherDataArr.length) {
      // Class Read API 호출 메서드
      handleTeacherGet({ main: true }) // 추후 기관 타입 recoil 전역변수 넣기
        .then((res) => res.data.data)
        .then((data) => {
          setTeacherDataArr([
            ...data.map((el) => {
              return {
                id: el.kk_teacher_idx,
                name: el.kk_teacher_name,
                introduce: el.kk_teacher_introduction,
              };
            }),
          ]);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teacherDataArr.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === teacherDataArr.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const getTranslateStyle = () => {
    if (currentIndex < Math.ceil(teacherDataArr.length / 2))
      return `translateX(calc(0%))`;
    else if (currentIndex >= Math.ceil(teacherDataArr.length / 2))
      return `translateX(calc(-${Math.ceil(teacherDataArr.length / 2) * (100 / 3)}%))`;
  };

  return (
    <Section>
      <Title>강사 프로필</Title>
      <Description>
        Lorem ipsum dolor sit amet veli elitni legro int dolor.Lorem ipsum dolor
        sit amet veli elitni legro int dolor.Lorem ipsum dolor sit amet veli
        elitni legro int dolor.
      </Description>
      <CarouselContainer>
        <Button onClick={handlePrevClick}>
          <span class="material-symbols-outlined">arrow_back</span>
        </Button>
        <CarouselWrapper>
          <ProfilesContainer
            style={{
              transform: getTranslateStyle(),
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {teacherDataArr.map((profile, index) => (
              <ProfileCard key={profile.id} active={index === currentIndex}>
                <ProfilePicture />
                <ProfileName>{profile.name}</ProfileName>
                <ProfileDescription>
                  {profile.introduce || `강사 ${profile.name}입니다!`}
                </ProfileDescription>
                <ReadMoreButton
                  onClick={() => router.push(`/teacher/${profile.id}`)}
                >
                  Read More
                </ReadMoreButton>
              </ProfileCard>
            ))}
          </ProfilesContainer>
        </CarouselWrapper>
        <Button onClick={handleNextClick}>
          <span class="material-symbols-outlined">arrow_forward</span>
        </Button>
      </CarouselContainer>
      <Dots>
        {teacherDataArr.map((_, index) => (
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

export default TeacherCarousel;

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
  color: white;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  width: 70%;
  font-size: 1rem;
  font-family: Pretendard;
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
  width: 1000px;
  overflow: hidden;
`;

const ProfilesContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;

  min-height: 300px;
`;

const ProfileCard = styled.div`
  width: 300px;
  background-color: ${(props) => (props.active ? 'white' : 'transparent')};
  border: ${(props) => (props.active ? 'none' : '3px solid white')};
  border-radius: 20px;
  padding: 2rem;
  margin: 0 1rem;
  flex-shrink: 0;
  text-align: left;
  box-shadow: ${(props) =>
    props.active ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
  transition:
    background-color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;

  user-select: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 1rem;
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
  font-family: Nunito;
  margin-bottom: 0.5rem;
`;

const ProfileDescription = styled.p`
  font-size: 1rem;
  font-family: Pretendard;
  color: #555;
  margin-bottom: 1.5rem;
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
