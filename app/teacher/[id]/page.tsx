'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useRouter, useParams } from 'next/navigation';
import { useQuery } from 'react-query';

import { useRecoilState } from 'recoil';
import { mobile } from '@/store/state';
import { handleTeacherGet } from '@/fetchAPI/teacherAPI';

import useLoginSessionCheck from '@/hook/useLoginSessionCheck';
import ProgramTeacherCarousel from '@/component/Teacher_Componet/ProgramTeacherCarousel';
import EndSection from '@/component/Home_Component/EndSection';
import LoadingModal from '@/component/Common_Component/LoadingModal';
import ProgressiveImage from '@/component/Common_Component/ProgressiveImage';

type TeacherDetailDataType = {
  kk_teacher_name: string;
  kk_teacher_introduction: string;
  kk_teacher_education: string;
  kk_teacher_history: string;
  kk_teacher_location: string;
  kk_teacher_dayofweek: string;
  kk_teacher_class_titles: string;
  kk_teacher_profileImg_path: string;
};

const dummyData = {
  kk_teacher_name: '',
  kk_teacher_introduction: '미승인처리 되었거나 존재하지 않는 강사 정보 입니다',
  kk_teacher_education: '',
  kk_teacher_history: '',
  kk_teacher_location: '',
  kk_teacher_dayofweek: '',
  kk_teacher_class_titles: '',
  kk_teacher_profileImg_path: '',
};

const TeacherDetailPage = () => {
  const [mobileFlag] = useRecoilState(mobile);
  const [data, setData] = useState<TeacherDetailDataType>();

  const router = useRouter();
  const params = useParams(); // URL의 동적 파라미터를 가져옴
  const id = params?.id;

  // 권한 체크
  useLoginSessionCheck({ requireLogin: true });

  // React Query - 서버에서 데이터를 가져오는 API 함수
  const reactQueryFetchTeacherData = async ({ queryKey }) => {
    const [, id] = queryKey;
    const response = await handleTeacherGet({ teacherIdx: id });
    return response.data;
  };

  // React Query 데이터 가져오기
  const {
    data: teacherDetailData,
    isLoading,
    error,
  } = useQuery(
    ['teacherData', id], // Query Key
    reactQueryFetchTeacherData, // Query Function
    {
      staleTime: 5000, // 5초 동안 신선한 상태 유지
      cacheTime: 10000, // 10초 동안 캐시 유지
      keepPreviousData: true, // 데이터를 가져오는 동안 기존 데이터 유지
      onError: (error) => {
        console.error(error);
        setData(dummyData);
      },
    }
  );

  useEffect(() => {
    if (teacherDetailData) {
      if (teacherDetailData.data.length === 0) {
        alert('승인되지 않은 강사입니다');
        router.back();
      }
      setData(teacherDetailData.data[0]);
    }
  }, [teacherDetailData]);

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Title>{`Kids Class edu`}</Title>
          <Subtitle>{`강사`}</Subtitle>
          <HeaderIntroDiv>
            {`소예키즈 소개 - `}
            <GreenColorSpan>{`강사`}</GreenColorSpan>
          </HeaderIntroDiv>
        </HeaderContent>
      </HeaderSection>
      {isLoading ? <LoadingModal isOpen={isLoading} /> : null}
      {error ? <div>Error...</div> : null}
      <MiddleSection>
        <MiddleContainer>
          <MiddleTitle>{`KK EDU - ballet`}</MiddleTitle>
          <MiddleTextContainer>
            <MiddleSubtitle>
              {`강사 - `}
              {data?.kk_teacher_name}
            </MiddleSubtitle>
            <MiddleDescription>
              {data?.kk_teacher_introduction
                ? data?.kk_teacher_introduction
                : `강사 ${data?.kk_teacher_name}입니다!`}
            </MiddleDescription>
          </MiddleTextContainer>
          {/* Mobile */}
          {mobileFlag && data?.kk_teacher_profileImg_path.length && (
            <MiddleProfileImgContainer>
              <ProgressiveImage
                profileImg={data?.kk_teacher_profileImg_path}
                alt={'Teacher_Profile_IMG'}
                mobile={true}
              />
            </MiddleProfileImgContainer>
          )}
          <MiddleTextContainer>
            <MiddleSubtitleSmall>{`경력 및 학력`}</MiddleSubtitleSmall>
            <MiddleDescription>
              {data?.kk_teacher_education}
              <br />
              {data?.kk_teacher_history}
            </MiddleDescription>
          </MiddleTextContainer>
          <MiddleTextContainer>
            <MiddleSubtitleSmall>{`수업 가능 지역`}</MiddleSubtitleSmall>
            <MiddleDescription>{data?.kk_teacher_location}</MiddleDescription>
          </MiddleTextContainer>
          <MiddleTextContainer>
            <MiddleSubtitleSmall>{`수업 가능 일정`}</MiddleSubtitleSmall>
            <MiddleDescription>{data?.kk_teacher_dayofweek}</MiddleDescription>
          </MiddleTextContainer>
          <MiddleTextContainer>
            <MiddleSubtitleSmall>{`가능 수업`}</MiddleSubtitleSmall>
            <MiddleDescription>
              {data?.kk_teacher_class_titles}
            </MiddleDescription>
          </MiddleTextContainer>
        </MiddleContainer>

        {/* Web */}
        {!mobileFlag && data?.kk_teacher_profileImg_path.length && (
          <MiddleProfileImgContainer>
            <ProgressiveImage
              profileImg={data?.kk_teacher_profileImg_path}
              alt={'Teacher_Profile_IMG'}
            />
          </MiddleProfileImgContainer>
        )}
      </MiddleSection>
      {/* 강사 리스트 */}
      <ProgramTeacherCarousel mobileFlag={mobileFlag} />
      {/* 엔드 섹션 */}
      <EndSection
        Title={`For our child's healthy body \n and heart happiness`}
        btnTitle={`강사 등록`}
        routePath={`/`}
      />
    </MainContainer>
  );
};

// Styled Components
const MainContainer = styled.div`
  width: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 3rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const HeaderSection = styled.section`
  width: 80vw;
  min-height: 400px;
  position: relative;

  background-image: linear-gradient(
      90deg,
      rgba(76, 176, 178, 0.8) 0%,
      rgba(76, 176, 178, 0) 60.5%
    ),
    url('/src/Teacher_IMG/Teacher_Header_Background_IMG.png');
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

  @media (max-width: 768px) {
    background: url('/src/Teacher_IMG/Teacher_Header_Background_IMG.png');
    background-size: cover; /* 배경 이미지 크기 조정 */
    background-repeat: no-repeat;

    width: 90vw;
    min-height: 90vw;
    padding: 0 2rem;
    background-position: 70%;
    align-items: flex-start;
  }
`;

const HeaderContent = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-top: 3rem;
  }
`;

const Title = styled.h1`
  color: white;

  font-size: 1rem;
  font-family: Nunito;
  font-weight: 600;

  @media (max-width: 768px) {
    color: black;
  }
`;

const Subtitle = styled.h2`
  color: white;

  font-size: 2.2rem;
  font-family: Pretendard;
  font-weight: 700;

  @media (max-width: 768px) {
    color: black;
  }
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
  width: 75%;
  min-height: 100vh;
  position: relative;

  border-radius: 24px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

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
  max-width: 700px;
  height: 100%;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 0.6rem;

  position: relative;
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

  align-self: flex-start;
`;

const MiddleDescription = styled.p`
  max-width: 100%;
  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 400;
  color: #737373;

  margin-top: 0.5rem;

  line-height: 1.5;

  @media (max-width: 768px) {
  }
`;

const MiddleProfileImgContainer = styled.div`
  max-width: 494px;
  max-height: 464px;

  border-radius: 24px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  gap: 3rem;

  position: relative;
`;

export default TeacherDetailPage;
