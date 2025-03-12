/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';

import React, { useState } from 'react';
import TeacherCard from './TeacherCard';

import { useRecoilState } from 'recoil';
import { mobile } from '@/store/state';

// Teacher Data Type 지정
type TeacherDataType = {
  id: number;
  name: string;
  introduce: string;
  profileImg: string;
};

// TeacherCarousel 컴포넌트 Props Type 지정
type TeacherCarouselProps = {
  teacherDataArr: TeacherDataType[];
};

const TeacherCarousel = ({ teacherDataArr }: TeacherCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 가운데 카드로 시작
  const [mobileFlag] = useRecoilState(mobile);

  const handlePrevClick = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? teacherDataArr.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === teacherDataArr.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const getTranslateStyle = (): string => {
    if (currentIndex < Math.ceil(teacherDataArr.length / 2))
      return `translateX(calc(0%))`;
    else if (currentIndex >= Math.ceil(teacherDataArr.length / 2))
      return `translateX(calc(-${Math.ceil(teacherDataArr.length / 2) * (100 / 3)}%))`;
  };

  const getTranslateStyle_Mobile = (): string => {
    return `translateX(calc(-${currentIndex * 33.2}%))`;
  };

  return (
    <Section>
      <Title>{`강사 프로필`}</Title>
      <Description>
        {`다양한 예술 장르의 전공과 경력을 보유하고 계신 소예키즈의 키클에듀
        가입강사들을 찾아봐주세요.`}
      </Description>
      <CarouselContainer>
        {/* 이전 버튼 */}
        <Button onClick={handlePrevClick} dir={'pre'}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: mobileFlag ? '1.7rem' : '2.2rem' }}
          >
            arrow_back
          </span>
        </Button>
        {/* Teacher Carousel */}
        <CarouselWrapper>
          <ProfilesContainer
            style={{
              transform: mobileFlag
                ? getTranslateStyle_Mobile()
                : getTranslateStyle(),
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {teacherDataArr.map((profile: TeacherDataType, index: number) => {
              const { id, profileImg, name, introduce } = profile;
              return (
                <TeacherCard
                  key={`${profileImg}+${id}`}
                  id={id}
                  active={index === currentIndex ? 'true' : null}
                  profileImg={
                    profileImg ||
                    '/src/Teacher_IMG/Teacher_Pupu_Profile_IMG.png'
                  }
                  name={name}
                  introduce={introduce}
                />
              );
            })}
          </ProfilesContainer>
        </CarouselWrapper>
        {/* 다음 버튼 */}
        <Button onClick={handleNextClick} dir={'next'}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: mobileFlag ? '1.7rem' : '2.2rem' }}
          >
            arrow_forward
          </span>
        </Button>
      </CarouselContainer>
      <Dots>
        {teacherDataArr.map((_, index: number) => (
          <Dot
            key={index}
            active={index === currentIndex ? 'true' : null}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </Dots>
    </Section>
  );
};

export default TeacherCarousel;

// SectionFifthtoNineth 컴포넌트 Type 지정
type ActivePropertyCommonType = {
  active: string;
};

const Section = styled.section`
  text-align: center;
  padding: 3rem;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 10;

  @media (max-width: 728px) {
    padding: 0rem;
  }
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

  @media (max-width: 728px) {
    width: 28%;
  }
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;

  @media (max-width: 728px) {
    justify-content: flex-start;
    transform: translateX(33.5%);

    position: relative;
  }
`;

const CarouselWrapper = styled.div`
  width: 1230px;
  overflow: hidden;
`;

const ProfilesContainer = styled.div`
  display: flex;

  transition: transform 0.5s ease-in-out;

  @media (max-width: 728px) {
    width: 1060px;
    padding-left: 1.7rem;
  }
`;

const Button = styled.button`
  width: 2.2rem;
  height: 2.2rem;

  background-color: white;
  border: none;
  border-radius: 100%;
  color: #a3a3a3;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 2.2rem;
  }

  cursor: pointer;
  z-index: 12;

  &:hover {
    background-color: #ff8500;
    color: white;
  }

  @media (max-width: 1080px) {
    width: 1.8rem;
    height: 1.8rem;
    position: absolute;
    left: ${(props) => (props.dir === 'pre' ? '1.3%' : '29.3%')};
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  @media (max-width: 1080px) {
    gap: 0.5rem;
  }
`;

const Dot = styled.div<ActivePropertyCommonType>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? 'orange' : '#ddd')};
  margin: 0 5px;
  transition: background-color 0.3s;
  cursor: pointer;

  @media (max-width: 1080px) {
    width: 15px;
    height: 15px;
  }
`;
