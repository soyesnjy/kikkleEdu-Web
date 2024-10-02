import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Next.js의 useRouter 사용
import styled from 'styled-components';
import { handleTeacherGet } from '@/fetchAPI/teacherAPI';
import Image from 'next/image';

import { useRecoilState } from 'recoil';
import { mobile } from '@/store/state';

const dummyData = {};

// Default Profile Img return Method
const ramdomDefaultImg = () => {
  const imgArr = [
    '/src/Teacher_IMG/Teacher_Pupu_Profile_IMG.png',
    '/src/Teacher_IMG/Teacher_Ella_Profile_IMG.png',
    '/src/Teacher_IMG/Teacher_Soyes_Profile_IMG.png',
  ];

  return imgArr[Math.floor(Math.random() * imgArr.length)];
};

const TeacherDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // URL의 동적 파라미터를 가져옴
  const [data, setData] = useState(dummyData);
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  useEffect(() => {
    if (id) {
      handleTeacherGet({ teacherIdx: id })
        .then((res) => res.data)
        .then((data) => {
          setData(data.data[0]);
        });
    }
  }, [id]);

  // const handleGoBack = () => {
  //   router.push('/teacher'); // 강사 List 페이지로 이동
  // };

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Title>Kids Class edu</Title>
          <Subtitle>강사</Subtitle>
          <HeaderIntroDiv>
            소예키즈 소개 - <GreenColorSpan>강사</GreenColorSpan>
          </HeaderIntroDiv>
        </HeaderContent>
      </HeaderSection>
      <MiddleSection>
        <MiddleContainer>
          <MiddleTitle>KC EDU - ballet</MiddleTitle>
          <MiddleTextContainer>
            <MiddleSubtitle>강사 - {data.kk_teacher_name}</MiddleSubtitle>
            <MiddleDescription>
              {data.kk_teacher_introduction
                ? data.kk_teacher_introduction
                : `강사 ${data.kk_teacher_name}입니다!`}
            </MiddleDescription>
          </MiddleTextContainer>

          {/* <MiddleTextContainer>
            <MiddleSubtitleSmall>연락처</MiddleSubtitleSmall>
            <MiddleDescription>{data.kk_teacher_phoneNum}</MiddleDescription>
          </MiddleTextContainer> */}

          {mobileFlag && (
            <Image
              src={data.kk_teacher_profileImg_path || ramdomDefaultImg()}
              alt=""
              width={390}
              height={418}
              style={{
                maxWidth: '100%',
                height: '90%',
                borderRadius: '24px',
              }}
            />
          )}

          <MiddleTextContainer>
            <MiddleSubtitleSmall>경력 및 학력</MiddleSubtitleSmall>
            <MiddleDescription>
              {data.kk_teacher_education}
              <br />
              {data.kk_teacher_history}
            </MiddleDescription>
          </MiddleTextContainer>

          <MiddleTextContainer>
            <MiddleSubtitleSmall>수업 가능 지역</MiddleSubtitleSmall>
            <MiddleDescription>{data.kk_teacher_location}</MiddleDescription>
          </MiddleTextContainer>

          <MiddleTextContainer>
            <MiddleSubtitleSmall>수업 가능 일정</MiddleSubtitleSmall>
            <MiddleDescription>{data.kk_teacher_dayofweek}</MiddleDescription>
          </MiddleTextContainer>

          <MiddleTextContainer>
            <MiddleSubtitleSmall>가능 수업</MiddleSubtitleSmall>
            <MiddleDescription>
              {data.kk_teacher_class_titles}
            </MiddleDescription>
          </MiddleTextContainer>
        </MiddleContainer>
        {!mobileFlag && (
          <MiddleProfileImgContainer>
            <Image
              src={data.kk_teacher_profileImg_path || ramdomDefaultImg()}
              alt=""
              width={390}
              height={418}
              style={{
                maxWidth: '100%',
                height: '90%',
                borderRadius: '24px',
              }}
            />
          </MiddleProfileImgContainer>
        )}
      </MiddleSection>
    </MainContainer>
  );
};

// Styled Components
const MainContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 3rem;
`;

const HeaderSection = styled.section`
  width: 80vw;
  min-height: 400px;
  position: relative;

  background-image: url('/src/Teacher_IMG/Teacher_Header_Background_IMG.png');
  background-size: cover;
  background-position-y: 30%;
  background-repeat: no-repeat;
  background-color: #f4eee5;

  padding: 0 4rem 0 4rem;
  border-radius: 24px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const Title = styled.h1`
  color: #333;

  font-size: 1rem;
  font-family: Nunito;
  font-weight: 600;
`;

const Subtitle = styled.h2`
  color: #333;

  font-size: 2.2rem;
  font-family: Pretendard;
  font-weight: 700;
`;

const HeaderIntroDiv = styled.div`
  width: fit-content;
  padding: 1rem 1.5rem;

  position: absolute;
  bottom: 0;
  right: 3rem;

  background-color: white;
  border-radius: 25px 25px 0 0;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 600;
`;

const GreenColorSpan = styled.span`
  color: #45b26b;
  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 600;
`;

const MiddleSection = styled.section`
  width: 80vw;
  min-height: 100vh;
  position: relative;

  padding: 0 4rem 0 4rem;
  border-radius: 24px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 3rem;

  @media (max-width: 768px) {
    width: 100vw;
    padding: 2rem;
    flex-direction: column;
    justify-content: center;
    gap: 0;
  }
`;

const MiddleContainer = styled.div`
  border-radius: 24px;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 3rem;
`;

const MiddleTextContainer = styled.section`
  border-radius: 24px;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 0.6rem;
`;

const MiddleTitle = styled.h1`
  font-size: 1rem;
  font-family: Nunito;
  font-weight: 600;
  color: #d97904;
`;

const MiddleSubtitle = styled.h2`
  font-size: 3rem;
  font-family: Pretendard;
  font-weight: 700;
`;

const MiddleSubtitleSmall = styled.h2`
  font-size: 1.5rem;
  font-family: Pretendard;
  font-weight: 700;
`;

const MiddleDescription = styled.p`
  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 400;
  color: #737373;

  margin-top: 0.5rem;

  line-height: 1.5;
`;

const MiddleProfileImgContainer = styled.div`
  border-radius: 24px;
  width: 496px;
  height: 464px;

  position: relative;

  background-image: url('/src/Teacher_IMG/Teacher_Dummy_Profile_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  gap: 3rem;
`;

export default TeacherDetailPage;
