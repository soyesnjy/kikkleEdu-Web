import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { handleTeacherGet } from '@/fetchAPI/teacherAPI';
import { useRouter } from 'next/router';
import EndSection from '@/component/Home_Component/EndSection';
import TeacherProfileCard from '@/component/Agency_Component/TeacherProfileCard';

import { useRecoilState } from 'recoil';
import { log } from '@/store/state';

const TeacherListPage = () => {
  const [teacherClass, setTeacherClass] = useState('ballet');
  const [teacherDataArr, setTeacherDataArr] = useState([]); // DB Class Select 값
  const [login, setLogin] = useRecoilState(log);

  const router = useRouter();

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
      router.back();
    }
  };

  // 강사 List 조회
  useEffect(() => {
    // 미로그인 시 메인 페이지로 이동
    const loginSession = JSON.parse(localStorage.getItem('log'));
    if (!loginSession) {
      router.push('/login');
      return;
    }

    // if (!teacherDataArr.length) {
    //   // Class Read API 호출 메서드
    //   handleTeacherGet({ classTag: teacherClass })
    //     .then((res) => {
    //       // 미승인 회원 처리
    //       if (res.status === 401) {
    //         alert(res.message);
    //         loginSessionClear();
    //         return;
    //       }
    //       return res.data.data;
    //     })
    //     .then((data) => {
    //       // console.log(data);
    //       const tmpArr = data.map((el) => {
    //         return {
    //           id: el.kk_teacher_idx,
    //           name: el.kk_teacher_name,
    //           introduce: el.kk_teacher_introduction,
    //           profileImg: el.kk_teacher_profileImg_path,
    //         };
    //       });
    //       setTeacherDataArr([...tmpArr]);
    //       localStorage.setItem('teacherDataArr', JSON.stringify(tmpArr));
    //     })
    //     .catch((err) => console.error(err));
    // }
  }, []);

  // 강사 태그 조회
  useEffect(() => {
    if (!teacherDataArr.length && teacherClass) {
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
  }, [teacherClass]);

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Title>Kids Class edu</Title>
          <Subtitle>강사</Subtitle>
          <Description>
            기관에서 원하는 강사님들을 찾아보는 시스템입니다.
          </Description>
          <HeaderIntroDiv>
            소예키즈 소개 - <GreenColorSpan>강사</GreenColorSpan>
          </HeaderIntroDiv>
        </HeaderContent>
      </HeaderSection>
      {/* 미들 섹션 */}
      <MiddleSection>
        <MiddleContainer>
          <MiddleTitle>KK EDU - ballet</MiddleTitle>
          <MiddleSubtitle>강사</MiddleSubtitle>
          <MiddleDescription>
            키클에듀에서는 다양한 장르의 수업이 가능한 전문 강사님들이
            함께합니다. 강사 프로필을 확인하고 원하는 수업을 신청해보세요!
          </MiddleDescription>
        </MiddleContainer>
        <MiddleContainer>
          <SearchContainer>
            <TagButton
              selected={teacherClass === 'ballet'}
              value="ballet"
              onClick={(e) => {
                setTeacherClass(e.target.value);
              }}
            >
              발레
            </TagButton>
            <TagButton
              selected={teacherClass === 'dance'}
              value="dance"
              onClick={(e) => {
                setTeacherClass(e.target.value);
              }}
            >
              댄스
            </TagButton>
            <TagButton
              selected={teacherClass === 'yoga'}
              value="yoga"
              onClick={(e) => {
                setTeacherClass(e.target.value);
              }}
            >
              요가
            </TagButton>
            <TagButton
              selected={teacherClass === 'pila'}
              value="pila"
              onClick={(e) => {
                setTeacherClass(e.target.value);
              }}
            >
              필라테스
            </TagButton>
            <TagButton
              selected={teacherClass === 'art'}
              value="art"
              onClick={(e) => {
                setTeacherClass(e.target.value);
              }}
            >
              미술
            </TagButton>
          </SearchContainer>
        </MiddleContainer>
      </MiddleSection>
      {/* 강사 List 섹션 */}
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
      {/* 엔드 섹션 */}
      <EndSection
        Title={`For our child's healthy body \n and heart happiness`}
        btnTitle={`강사 등록`}
        routePath={`/signup`}
      />
    </MainContainer>
  );
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

const SearchContainer = styled.section`
  width: 100%;
  border-radius: 24px;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.3rem;
  }
`;

const TagButton = styled.button`
  background-color: ${(props) =>
    props.selected ? '#378E56' : 'rgba(255, 255, 255, 0.01)'};
  border: 1px solid #378e56;
  border-radius: 24px;

  padding: 0.7rem 1.7rem;

  color: ${(props) => (props.selected ? 'white' : 'black')};
  text-align: center;
  text-decoration: none;

  font-size: 1rem;
  font-weight: 600;
  font-family: Pretendard;

  cursor: pointer;
  &:hover {
    background-color: #378e56;
    color: white;
  }
  transition: 0.2s;

  @media (max-width: 768px) {
    min-width: 70px;
    font-size: 1rem;
    padding: 1rem;
    margin-bottom: 0;
  }
`;

// const SearchContainer = styled.section`
//   width: 100%;
//   margin-top: 10rem;
//   border-radius: 24px;

//   display: flex;
//   justify-content: center;

//   gap: 1rem;

//   @media (max-width: 768px) {
//     justify-content: space-around;
//     margin-top: 1rem;
//     gap: 0.5rem;
//   }
// `;

// const TagButton = styled.button`
//   background-color: ${(props) =>
//     props.selected ? '#378E56' : 'rgba(255, 255, 255, 0.01)'};
//   border: 1px solid #378e56;
//   border-radius: 24px;

//   padding: 0.7rem 2rem;

//   color: ${(props) => (props.selected ? 'white' : 'black')};
//   text-align: center;
//   text-decoration: none;

//   font-size: 1rem;
//   font-weight: 600;
//   font-family: Pretendard;

//   cursor: pointer;
//   &:hover {
//     background-color: #378e56;
//     color: white;
//   }

//   transition: 0.2s;

//   @media (max-width: 768px) {
//     font-size: 1rem;
//     padding: 0.8rem;
//     margin-bottom: 0;
//     border-radius: 1rem;
//   }
// `;

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

const TeacherContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.dayCheck ? 'repeat(7, 1fr)' : 'repeat(4, 1fr)'};
  grid-template-rows: ${(props) => `repeat(${props.rowcount}, 1fr)`};

  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 0rem;
  }
`;

// const TeacherButtonContainer = styled.div`
//   width: 288px;
//   height: 280px;
//   background: linear-gradient(#cacaca 80%, black);

//   padding: 1rem;

//   border-radius: 15px;

//   border: none;

//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   align-items: flex-start;

//   cursor: pointer;
//   gap: 1rem;

//   /* 부모가 hover 되었을 때, 두 번째 자식 요소를 타겟팅 */
//   &:hover {
//     background: linear-gradient(#cacaca 100%, black);

//     /* 두 번째 자식 요소 선택 */
//     & :nth-child(2) {
//       display: block;
//     }
//   }

//   /* 초기 상태에서 두 번째 자식 요소 숨김 */
//   & :nth-child(2) {
//     display: none;
//   }

//   @media (max-width: 768px) {
//     width: 148px;
//     height: 140px;
//   }
// `;

// const TeacherButtonTitle = styled.div`
//   font-family: Pretendard;
//   font-weight: 700;
//   font-size: 1.2rem;
//   color: white;
// `;

// const TeacherButtonSubTitle = styled.div`
//   font-family: Pretendard;
//   font-weight: 400;
//   font-size: 0.7rem;
//   color: white;
// `;

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
