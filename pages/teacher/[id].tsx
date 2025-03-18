/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { useRecoilState } from 'recoil';
import { mobile } from '@/store/state';
import { handleTeacherGet } from '@/fetchAPI/teacherAPI';

import useLoginSessionCheck from '@/hook/useLoginSessionCheck';
import ProgramTeacherContainer from '@/component/Teacher_Componet/ProgramTeacherContainer';
import EndSection from '@/component/Home_Component/EndSection';

type TeacherDataType = {
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

// Default Profile Img return Method
const ramdomDefaultImg = () => {
  const imgArr = [
    '/src/Teacher_IMG/Teacher_Pupu_Profile_IMG.png',
    '/src/Teacher_IMG/Teacher_Ella_Profile_IMG.png',
    '/src/Teacher_IMG/Teacher_Soyes_Profile_IMG.png',
  ];

  return imgArr[Math.floor(Math.random() * imgArr.length)];
};

// SSR
// import axios from 'axios';
// import cookie from 'cookie';

// export async function getServerSideProps(context) {
//   const { id } = context.query; // URL에서 ID를 추출
//   const cookies = context.req.cookies;
//   let data = dummyData;

//   console.log(context);

//   try {
//     // 강사 Detail Data
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_URL}/teacher/read?teacherIdx=${id}`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${cookies.refreshToken}`,
//         },
//         withCredentials: true,
//       }
//     );

//     const result = res.data.data;
//     if (result?.length) {
//       data = result[0];
//     }
//   } catch (err) {
//     console.error(err.response);
//   }

//   return {
//     props: { data }, // 서버에서 가져온 데이터를 페이지로 전달
//   };
// }

const TeacherDetailPage = () => {
  const [mobileFlag] = useRecoilState(mobile);
  const [data, setData] = useState<TeacherDataType>();
  const [teacherDataArr, setTeacherDataArr] = useState([]);

  const router = useRouter();
  const { id } = router.query; // URL의 동적 파라미터를 가져옴

  useLoginSessionCheck();

  useEffect(() => {
    if (localStorage.getItem('teacherDataArr')) {
      setTeacherDataArr([
        ...JSON.parse(localStorage.getItem('teacherDataArr')),
      ]);
    }
  }, []);

  // React Query - 서버에서 데이터를 가져오는 API 함수
  const reactQueryFetchEvent = async ({ queryKey }) => {
    const [, id] = queryKey;
    const response = await handleTeacherGet({ teacherIdx: id });
    return response.data;
  };

  // React Query 데이터 가져오기
  const {
    data: _,
    isLoading,
    error,
  } = useQuery(
    ['events', id], // Query Key
    reactQueryFetchEvent, // Query Function
    {
      staleTime: 5000, // 5초 동안 신선한 상태 유지
      cacheTime: 10000, // 10초 동안 캐시 유지
      keepPreviousData: true, // 데이터를 가져오는 동안 기존 데이터 유지
      refetchOnWindowFocus: false, // 브라우저 포커스 변경 시 refetch 방지
      refetchOnReconnect: false, // 네트워크 재연결 시 refetch 방지
      refetchOnMount: false, // 컴포넌트 마운트 시 refetch 방지
      onSuccess: (data) => {
        if (data.data.length === 0) {
          alert('승인되지 않은 강사입니다');
          router.back();
        }
        setData(data.data[0]); // 강사 정보 state 갱신
      },
      onError: (error) => {
        console.error(error);
        setData(dummyData);
      },
    }
  );

  // useEffect(() => {
  //   if (id) {
  //     handleTeacherGet({ teacherIdx: id })
  //       .then((res) => res.data)
  //       .then((data) => {
  //         if (data.data.length) setData(data.data[0]);
  //         else setData(dummyData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setData(dummyData);
  //       });
  //   }
  // }, [id]);

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
      {isLoading ? <div>Loading...</div> : null}
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
          {mobileFlag && (
            <Image
              key={data?.kk_teacher_profileImg_path + id}
              src={data?.kk_teacher_profileImg_path || ramdomDefaultImg()}
              alt="Teacher_Profile_IMG"
              width={390}
              height={418}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '24px',
              }}
              priority={true}
            />
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
        {!mobileFlag && (
          <MiddleProfileImgContainer>
            <Image
              key={data?.kk_teacher_profileImg_path + id}
              src={data?.kk_teacher_profileImg_path || ramdomDefaultImg()}
              alt="Teacher_Profile_IMG"
              width={390}
              height={418}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '24px',
              }}
              priority={true}
            />
          </MiddleProfileImgContainer>
        )}
      </MiddleSection>
      {/* localStorage 강사 데이터가 있는 경우 */}
      {teacherDataArr.length > 0 && (
        <TeacherListSection>
          <MiddleSubtitleSmall>{`강사 리스트`}</MiddleSubtitleSmall>
          <ProgramTeacherContainer mobileFlag={mobileFlag} />
        </TeacherListSection>
      )}

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

const TeacherListSection = styled.div`
  width: 80vw;
  padding: 0 4rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    width: 100vw;
    padding: 2rem;
    flex-direction: column;
    justify-content: center;
    gap: 0;
  }
`;

export default TeacherDetailPage;
