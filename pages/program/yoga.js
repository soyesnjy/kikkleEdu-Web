/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

// import { mobile } from '@/store/state';
// import { useRecoilState } from 'recoil';
// import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import LessonSection from '@/component/Home_Component/LessonSection';
import EduArtVideoComponent from '@/component/Home_Component/EduArtVideoComponent';
import { handleClassGet } from '@/fetchAPI/classAPI';

const classDefaultArr = [
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_1_Background_IMG.png',
    title: '스토리발레(창의발레)',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_2_Background_IMG.png',
    title: '체험형 원데이 프로그램',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_3_Background_IMG.png',
    title: '발표회 프로그램',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_4_Background_IMG.png',
    title: 'KPOP 방송댄스 프로그램',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_5_Background_IMG.png',
    title: '세계의 춤 프로그램',
    routePath: '/',
  },
];

const eduSectionData = {
  title: '요가 교육 프로그램 영상',
  content:
    'Lorem ipsum dolor sit amet velitLorem ipsum dolor sit amet velit, elitni legro int dolor. elitni legro int dolor.',
  features: ['성인요가'], // default features
  youtubeUrl: '//www.youtube.com/embed/ekc2TYm99jg',
};

const YogaProgramPage = () => {
  const [classDataArr, setClassDataArr] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});

  const searchParams = useSearchParams();
  const cName = searchParams.get('cName');
  // const router = useRouter();

  // 수업 DB 조회
  useEffect(() => {
    // Class Read API 호출 메서드 - yoga 고정
    handleClassGet({ classTag: 'yoga', classDetail: true })
      .then((res) => res.data.data)
      .then((data) => {
        setClassDataArr([
          ...data.map((el) => {
            return {
              title: el.kk_class_title,
              content: el.kk_class_content,
              imgPath: el.kk_class_file_path,
              detailPath: el.kk_class_detail_path,
            };
          }),
        ]);
      })
      .catch(() => setClassDataArr(classDefaultArr));
  }, []);

  // selectedClass 설정
  useEffect(() => {
    // cName Query 있는 경우
    if (cName) {
      setSelectedClass({
        ...classDataArr.filter((el) => el.title === cName)[0],
      });
      return;
    }
    // cName Query 없는 경우
    else if (classDataArr.length > 0) {
      setSelectedClass({ ...classDataArr[0] });
      return;
    }
  }, [classDataArr, cName]);

  useEffect(() => {
    setSelectedClass({
      ...classDataArr.filter((el) => el.title === cName)[0],
    });
  }, [cName]);

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Title>Kids Class edu</Title>
          <Subtitle>요가 교육</Subtitle>
          <Description>
            Lorem ipsum dolor sit amet veli elitni legro int dolor.
          </Description>
          <HeaderIntroDiv>
            소예키즈 소개 - <GreenColorSpan>요가 교육</GreenColorSpan>
          </HeaderIntroDiv>
        </HeaderContent>
      </HeaderSection>
      {/* 수업 카테고리 */}
      <MiddleSection>
        <SearchContainer>
          {classDataArr.map((el, index) => {
            return (
              <TagButton
                key={index}
                selected={selectedClass?.title === el?.title}
                onClick={() => {
                  setSelectedClass({ ...el });
                }}
              >
                {el.title}
              </TagButton>
            );
          })}
        </SearchContainer>
      </MiddleSection>
      {/* 소개 섹션 */}
      <IntroSection>
        <LessonSection
          title={selectedClass?.title || ''}
          subtitle={selectedClass?.content || ''}
          imgUrl={
            selectedClass?.imgPath ||
            '/src/Home_IMG/Home_Section_5_Background_IMG.png'
          }
          type="left"
        />
      </IntroSection>
      {/* 미들 섹션 - 댄스 */}
      <EduArtVideoComponent
        sectionData={{
          ...eduSectionData,
          features: classDataArr.map((el) => el.title),
        }}
      />
      {/* 수업 Detail 섹션 */}
      <ClassDetailSection>
        <Image
          src={selectedClass?.detailPath || ''}
          alt="DetailPath"
          width={1321}
          height={3044}
          style={{ maxWidth: '60%', height: 'auto' }}
        />
      </ClassDetailSection>
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

export default YogaProgramPage;

const MainContainer = styled.div`
  width: 100%;
  padding: 1rem 0 0 0;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 3rem;
`;

const HeaderSection = styled.section`
  width: 80vw;
  min-height: 21vw;
  position: relative;

  /* linear-gradient와 이미지 URL을 background 속성으로 조합 */
  background: linear-gradient(
      90deg,
      rgba(76, 176, 178, 0.8) 0%,
      /* 시작 색상, 투명도 0.8 */ rgba(76, 176, 178, 0) 60.5%
        /* 중간에서 투명해짐 */
    ),
    url('/src/Program_IMG/Program_Header_Ballet_Background_IMG.png');
  background-size: cover; /* 배경 이미지 크기 조정 */
  background-position: center;
  background-repeat: no-repeat;

  padding: 0 4rem;
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
  color: white;

  font-size: 1rem;
  font-family: Nunito;
  font-weight: 600;
`;

const Subtitle = styled.h2`
  color: white;

  font-size: 2.2rem;
  font-family: Pretendard;
  font-weight: 700;
`;

const Description = styled.p`
  color: white;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 400;
`;

const HeaderIntroDiv = styled.div`
  width: fit-content;
  padding: 1rem 1.5rem;

  position: absolute;
  bottom: 0;
  right: 10%;

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
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100vw;
    flex-direction: column;
    justify-content: center;
    gap: 0;

    padding: 1rem;
  }
`;

const SearchContainer = styled.section`
  width: 100%;
  padding-left: 12rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0rem;
    justify-content: center;
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

const IntroSection = styled.section`
  width: 100vw;
  min-height: 50vh;

  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1080px) {
    height: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

// const MiddleSectionTitle = styled.h2`
//   color: white;

//   font-size: 3rem;
//   font-family: Pretendard;
//   font-weight: 700;

//   @media (max-width: 1080px) {
//     font-size: 1.9rem;
//   }
// `;

// const ProgramContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   grid-template-rows: 1fr;

//   gap: 1rem;
//   margin-top: 3rem;
//   margin-bottom: 3rem;

//   @media (max-width: 768px) {
//     grid-template-columns: repeat(2, 1fr);
//     grid-template-rows: 1fr;
//   }
// `;

// const ProgramContentContainer = styled.div`
//   width: 280px;
//   height: 280px;

//   /* 배경 이미지와 그라데이션을 함께 설정 */
//   background: linear-gradient(
//       to top,
//       rgba(0, 0, 0, 1) 10%,
//       rgba(0, 0, 0, 0) 30%
//     ),
//     url(${(props) => props.imgPath || 'none'});
//   background-size: cover; /* 이미지 크기 조정 */
//   background-position: center;
//   background-repeat: no-repeat;

//   /* 배경 이미지 위에 그라데이션 효과를 덧씌우기 */
//   background-blend-mode: normal;

//   padding: 1rem;

//   border-radius: 15px;

//   /* 선택 여부에 따른 테두리 */
//   border: ${(props) => (props.selected ? '5px solid #45b26b' : 'none')};
//   color: white;

//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   align-items: flex-start;

//   gap: 1rem;

//   cursor: pointer;

//   &:hover {
//     opacity: 0.8;
//   }

//   /* 반응형 크기 조정 */
//   @media (max-width: 768px) {
//     width: 155px;
//     height: 202px;
//   }
// `;

// const ProgramTitle = styled.div`
//   font-family: Pretendard;
//   font-weight: 700;
//   font-size: 1.2rem;
//   color: white;

//   z-index: 1;
// `;

const EndSection = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: relative;

  background-image: url('/src/Home_IMG/Home_Last_Background_IMG.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 728px) {
    background-size: cover;
  }
`;

const EndTitle = styled.h1`
  width: 70%;
  text-align: center;
  font-size: 3rem;
  font-family: Nunito;
  font-weight: 600;
  color: #171717;

  @media (max-width: 1080px) {
    font-size: 24px;
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

const ClassDetailSection = styled.section`
  width: 100%;
  min-height: 150vh;
  background-color: white;

  background-image: url('/src/Home_IMG/Home_Section_10_Background_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10rem;

  @media (max-width: 728px) {
    height: 100%;
    flex-direction: column;
    padding: 2rem;
    background-size: cover;
  }
`;
