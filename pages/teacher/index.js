import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { handleTeacherGet } from '@/fetchAPI/teacherAPI';
import { useRouter } from 'next/router';

const TeacherListPage = () => {
  const [teacherClass, setTeacherClass] = useState('ballet');
  const [teacherDataArr, setTeacherDataArr] = useState([]); // DB Class Select 값

  const router = useRouter();

  // 강사 List 조회
  useEffect(() => {
    if (!teacherDataArr.length) {
      // Class Read API 호출 메서드
      handleTeacherGet({ classTag: teacherClass }) // 추후 기관 타입 recoil 전역변수 넣기
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

  // 강사 태그 조회
  useEffect(() => {
    if (teacherClass) {
      handleTeacherGet({ classTag: teacherClass })
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
  }, [teacherClass]);

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
      {/* 미들 섹션 */}
      <MiddleSection>
        <MiddleContainer>
          <MiddleTitle>KC EDU - ballet</MiddleTitle>
          <MiddleSubtitle>강사</MiddleSubtitle>
          <MiddleDescription>
            Lorem ipsum dolor sit amet veli elitni legro int dolor.
            <br />
            Lorem ipsum dolor sit amet veli elitni legro int dolor.
            <br />
            Lorem ipsum dolor sit amet veli elitni legro int dolor.
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
        <TeacherContainer rowCount={Math.ceil(teacherDataArr.length / 5)}>
          {teacherDataArr.length > 0
            ? teacherDataArr.map((el, index) => {
                const { id, name, introduce } = el;
                return (
                  <TeacherButtonContainer
                    key={index}
                    onClick={() => {
                      console.log(id);
                      router.push(`/teacher/${id}`);
                    }}
                  >
                    <TeacherButtonTitle>{name}</TeacherButtonTitle>
                    <TeacherButtonSubTitle>{introduce}</TeacherButtonSubTitle>
                  </TeacherButtonContainer>
                );
              })
            : '조건에 부합하는 강사가 없습니다'}
        </TeacherContainer>
      </PageContainer>
      {/* 엔드 섹션 */}
      <EndSection>
        <EndTitle>
          Loren iqsum dolor sit...Loren iqsum dolor sit... Loren iqsum dolor
          sit...
        </EndTitle>
        <Button>콘텐츠 소개</Button>
      </EndSection>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  padding: 1rem;
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
  margin-top: 10rem;
  border-radius: 24px;

  display: flex;
  justify-content: center;

  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: space-around;
    margin-top: 1rem;
    gap: 0.5rem;
  }
`;

const TagButton = styled.button`
  background-color: ${(props) =>
    props.selected ? '#378E56' : 'rgba(255, 255, 255, 0.01)'};
  border: 1px solid #378e56;
  border-radius: 24px;

  padding: 0.7rem 2rem;

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
    font-size: 1rem;
    padding: 0.8rem;
    margin-bottom: 0;
    border-radius: 1rem;
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

const TeacherContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.dayCheck ? 'repeat(7, 1fr)' : 'repeat(4, 1fr)'};
  grid-template-rows: ${(props) => `repeat(${props.rowCount}, 1fr)`};

  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 0rem;
  }
`;

const TeacherButtonContainer = styled.div`
  width: 288px;
  height: 280px;
  background: linear-gradient(#cacaca 80%, black);

  padding: 1rem;

  border-radius: 15px;

  border: none;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  cursor: pointer;
  gap: 1rem;

  /* 부모가 hover 되었을 때, 두 번째 자식 요소를 타겟팅 */
  &:hover {
    background: linear-gradient(#cacaca 100%, black);

    /* 두 번째 자식 요소 선택 */
    & :nth-child(2) {
      display: block;
    }
  }

  /* 초기 상태에서 두 번째 자식 요소 숨김 */
  & :nth-child(2) {
    display: none;
  }

  @media (max-width: 768px) {
    width: 148px;
    height: 140px;
  }
`;

const TeacherButtonTitle = styled.div`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.2rem;
  color: white;
`;

const TeacherButtonSubTitle = styled.div`
  font-family: Pretendard;
  font-weight: 400;
  font-size: 0.7rem;
  color: white;
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
  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 400;
  color: #737373;

  margin-top: 0.5rem;

  line-height: 1.5;
`;

const EndSection = styled.section`
  width: 100%;
  min-height: 650px;
  position: relative;

  background-image: url('/src/Introduce_IMG/Introduce_End_Background_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  padding: 0 4rem 0 4rem;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;
`;

const EndTitle = styled.h1`
  width: 70%;
  text-align: center;
  font-size: 3rem;
  font-family: Nunito;
  font-weight: 600;
  color: #171717;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.5rem;
  }
`;

const Button = styled.button`
  font-family: Pretendard;
  font-weight: 600;
  background-color: #ff8500;

  border-radius: 10px;
  border: none;

  margin-top: 1rem;
  padding: 1rem 2rem;

  color: white;

  cursor: pointer;
  z-index: 1;
`;

export default TeacherListPage;
