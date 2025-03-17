/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { handleTeacherGet } from '@/fetchAPI/teacherAPI';
import { useRouter } from 'next/router';
import useLoginSessionCheck from '@/hook/useLoginSessionCheck';

import TeacherSearchBar from '@/component/Home_Component/TeacherSearchBar';
import TeacherProfileCard from '@/component/Agency_Component/TeacherProfileCard';
import EndSection from '@/component/Home_Component/EndSection';

const TeacherListPage = () => {
  const [teacherClass, setTeacherClass] = useState('');
  const [teacherDataArr, setTeacherDataArr] = useState([]); // DB Class Select 값

  const router = useRouter();
  useLoginSessionCheck();

  // 로그인 세션 Clear 메서드
  const loginSessionClear = () => {
    const loginSession = localStorage.getItem('log');
    if (loginSession) {
      localStorage.setItem(
        'log',
        JSON.stringify({
          expires: 0, // 로그인 세션 24시간 설정
        })
      );
      router.push('/');
    }
  };

  // 강사 태그 조회
  useEffect(() => {
    // 태그가 변경될 경우
    if (
      teacherClass &&
      teacherClass !== localStorage.getItem('teacherClassTag')
    ) {
      localStorage.setItem('teacherClassTag', teacherClass);
      handleTeacherGet({ classTag: teacherClass })
        .then((res) => {
          // 미승인 회원 처리
          if (res.status === 401) {
            alert(res.message);
            loginSessionClear();
            return;
          }
          return res.data.data;
        })
        .then((data) => {
          const tmpArr = data.map((el) => {
            return {
              id: el.kk_teacher_idx,
              name: el.kk_teacher_name,
              introduce: el.kk_teacher_introduction,
              profileImg: el.kk_teacher_profileImg_path,
            };
          });
          setTeacherDataArr([...tmpArr]);
          localStorage.setItem('teacherDataArr', JSON.stringify(tmpArr));
        })
        .catch((err) => console.error(err));
    }
    // local에 teacherDataArr값이 있는 경우
    else if (localStorage.getItem('teacherDataArr')) {
      setTeacherDataArr([
        ...JSON.parse(localStorage.getItem('teacherDataArr')),
      ]);
      return;
    }
  }, [teacherClass]);

  return (
    <MainContainer>
      {/* Header */}
      <HeaderSection>
        <HeaderContent>
          <Title>{`Kids Class edu`}</Title>
          <Subtitle>{`강사`}</Subtitle>
          <Description>
            {`기관에서 원하는 강사님들을 찾아보는 시스템입니다.`}
          </Description>
          <HeaderIntroDiv>
            {`소예키즈 소개 - `}
            <GreenColorSpan>{`강사`}</GreenColorSpan>
          </HeaderIntroDiv>
        </HeaderContent>
      </HeaderSection>
      {/* Middle Section */}
      <MiddleSection>
        <MiddleContainer>
          <MiddleTitle>{`KK EDU - ballet`}</MiddleTitle>
          <MiddleSubtitle>{`강사`}</MiddleSubtitle>
          <MiddleDescription>
            {`키클에듀에서는 다양한 장르의 수업이 가능한 전문 강사님들이
            함께합니다. 강사 프로필을 확인하고 원하는 수업을 신청해보세요!`}
          </MiddleDescription>
        </MiddleContainer>
        <MiddleContainer>
          <TeacherSearchBar
            teacherClass={teacherClass}
            setTeacherClass={setTeacherClass}
          />
        </MiddleContainer>
      </MiddleSection>
      {/* Teacher List Section */}
      <PageContainer>
        <TeacherContainer rowcount={Math.ceil(teacherDataArr.length / 5)}>
          {teacherDataArr.length > 0
            ? teacherDataArr.map((el) => {
                const { id, name, introduce, profileImg } = el;
                return (
                  <TeacherProfileCard
                    key={id}
                    name={name}
                    introduce={introduce}
                    imgUrl={profileImg}
                    onClick={() => router.push(`/teacher/${id}`)}
                  />
                );
              })
            : 'X'}
        </TeacherContainer>
      </PageContainer>
      {/* End Section */}
      <EndSection
        Title={`For our child's healthy body \n and heart happiness`}
        btnTitle={`강사 등록`}
        routePath={`/signup`}
      />
    </MainContainer>
  );
};

type TeacherContainerType = {
  dayCheck?: string;
  rowcount?: number;
};

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

const Description = styled.p`
  color: white;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 400;

  @media (max-width: 768px) {
    display: none;
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
  width: 80vw;
  min-height: 327px;
  position: relative;

  padding: 0 4rem 0 4rem;
  border-radius: 24px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    width: 100vw;
    flex-direction: column;
    justify-content: center;
    gap: 0;

    padding: 2rem;
  }
`;

const MiddleContainer = styled.section`
  border-radius: 24px;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 3rem;
    gap: 0.5rem;
  }
`;

const PageContainer = styled.div`
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 0.5rem;
    align-items: center;
  }
`;

const TeacherContainer = styled.div<TeacherContainerType>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: ${(props) => `repeat(${props.rowcount}, 1fr)`};

  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 0rem;
  }
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

const MiddleDescription = styled.p`
  width: 60%;
  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 400;
  color: #737373;

  /* white-space: pre; */
  margin-top: 0.5rem;

  line-height: 1.5;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default TeacherListPage;
