/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useRecoilState } from 'recoil';
import { mobile } from '@/store/state';
import { loadingImg } from '@/component/Common_Component/LoadingBase64';

// CSR
// import { handleTeacherGet } from '@/fetchAPI/teacherAPI';

const TeacherCarousel = ({ teacherDataArr }) => {
  // CSR
  // const [teacherDataArr, setTeacherDataArr] = useState([]); // DB Class Select 값
  const [currentIndex, setCurrentIndex] = useState(0); // 가운데 카드로 시작
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  // CSR
  // 강사 List 조회
  // useEffect(() => {
  //   if (!teacherDataArr.length) {
  //     // 강사 Read API 호출 메서드
  //     handleTeacherGet({ main: true })
  //       .then((res) => res.data.data)
  //       .then((data) => {
  //         setTeacherDataArr([
  //           ...data.map((el) => {
  //             return {
  //               id: el.kk_teacher_idx,
  //               name: el.kk_teacher_name,
  //               introduce: el.kk_teacher_introduction,
  //               profileImg: el.kk_teacher_profileImg_path,
  //             };
  //           }),
  //         ]);
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, []);

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

  const getTranslateStyle_Mobile = () => {
    return `translateX(calc(-${currentIndex * 33.2}%))`;
  };

  return (
    <Section>
      <Title>강사 프로필</Title>
      <Description>
        다양한 예술 장르의 전공과 경력을 보유하고 계신 소예키즈의 키클에듀
        가입강사들을 찾아봐주세요.
      </Description>
      <CarouselContainer>
        <Button onClick={handlePrevClick} dir={'pre'}>
          <span className="material-symbols-outlined">arrow_back</span>
        </Button>
        <CarouselWrapper>
          <ProfilesContainer
            style={{
              transform: mobileFlag
                ? getTranslateStyle_Mobile()
                : getTranslateStyle(),
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {teacherDataArr.map((profile, index) => (
              <ProfileCard
                key={profile.id}
                active={index === currentIndex ? 'true' : null}
              >
                <Image
                  src={
                    profile.profileImg ||
                    '/src/Teacher_IMG/Teacher_Pupu_Profile_IMG.png'
                  }
                  alt="profile_IMG"
                  width={103}
                  height={103}
                  style={{
                    // minWidth: '103px',
                    // minHeight: '103px',
                    // maxWidth: '100%',
                    // height: 'auto',
                    borderRadius: '50%',
                  }}
                  placeholder="blur"
                  blurDataURL={loadingImg}
                />
                <ProfileName>{profile.name}</ProfileName>
                <ProfileDescription>
                  {profile.introduce || `강사 ${profile.name}입니다!`}
                </ProfileDescription>
                <Link href={`/teacher/${profile.id}`}>
                  <ReadMoreButton>Read More</ReadMoreButton>
                </Link>
              </ProfileCard>
            ))}
          </ProfilesContainer>
        </CarouselWrapper>
        <Button onClick={handleNextClick} dir={'next'}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </Button>
      </CarouselContainer>
      <Dots>
        {teacherDataArr.map((_, index) => (
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

  @media (max-width: 728px) {
    width: 30%;
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
  width: 1240px;
  overflow: hidden;
`;

const ProfilesContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;

  min-height: 300px;
`;

const ProfileCard = styled.div`
  width: 379px;
  min-height: 487px;
  background-color: ${(props) => (props.active ? 'white' : 'transparent')};
  border: ${(props) => (props.active ? 'none' : '3px solid white')};

  border-radius: 50px;
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
  align-items: center;

  gap: 1rem;

  h3,
  p {
    color: ${(props) => (props.active ? 'black' : 'white')};
  }

  @media (max-width: 728px) {
    padding: 2.5rem;
  }
`;

const ProfileName = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  font-family: Nunito;
  margin-bottom: 0.5rem;
`;

const ProfileDescription = styled.p`
  min-height: 6rem;
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
  width: 36px;
  height: 36px;

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

  @media (max-width: 1080px) {
    position: absolute;
    left: ${(props) => (props.dir === 'pre' ? '1.5%' : '28%')};
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

const Dot = styled.div`
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
