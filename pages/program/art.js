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
import EndSection from '@/component/Home_Component/EndSection';

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
  title: '미술 교육 프로그램 영상',
  content: '아동의 연령에 맞춘 재미있는 미술프로그램 제공합니다.',
  features: ['원데이클래스'], // default features
  youtubeUrl: '//www.youtube.com/embed/KvBdfRdnuSQ',
};

const YogaProgramPage = () => {
  const [classDataArr, setClassDataArr] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});

  const searchParams = useSearchParams();
  const cName = searchParams.get('cName');
  // const router = useRouter();

  // 수업 DB 조회
  useEffect(() => {
    // Class Read API 호출 메서드 - art 고정
    handleClassGet({ classTag: 'art', classDetail: true })
      .then((res) => res.data.data)
      .then((data) => {
        setClassDataArr([
          ...data.map((el) => {
            return {
              title: el.kk_class_title,
              content: el.kk_class_content,
              info: el.kk_class_info,
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
          <Subtitle>미술 교육</Subtitle>
          <Description>
            Lorem ipsum dolor sit amet veli elitni legro int dolor.
          </Description>
          <HeaderIntroDiv>
            소예키즈 소개 - <GreenColorSpan>미술 교육</GreenColorSpan>
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
          imgUrl={selectedClass?.imgPath || ''}
          type="program"
          info={selectedClass?.info || ''}
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
      <ClassDetailSection
        defaultChecked={
          selectedClass?.detailPath ===
          '/src/Program_IMG/Program_Default_ClassDetail_IMG.png'
        }
      >
        <Image
          src={selectedClass?.detailPath || ''}
          alt="DetailPath"
          width={1321}
          height={3044}
          style={{ maxWidth: '100%', height: '100%' }}
        />
      </ClassDetailSection>
      {/* 엔드 섹션 */}
      <EndSection
        Title={`For our child's healthy body \n and heart happiness`}
        btnTitle={`예약하기`}
        routePath={`/`}
      />
    </MainContainer>
  );
};

export default YogaProgramPage;

const MainContainer = styled.div`
  width: 100%;
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
      rgba(76, 176, 178, 0) 60.5%
    ),
    url('/src/Program_IMG/Art/Program_Header_Art_Background_IMG.png');
  background-size: cover; /* 배경 이미지 크기 조정 */
  background-position: center;
  background-repeat: no-repeat;

  padding: 0 4rem;
  border-radius: 24px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    background: url('/src/Program_IMG/Art/Program_Header_Art_Background_IMG.png');

    /* ::before 가상 요소로 오버레이 추가 */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5); /* 반투명한 흰색 오버레이 */
      pointer-events: none; /* 자식 컴포넌트의 상호작용을 방해하지 않도록 */
      z-index: 1; /* 자식 요소보다 아래에 오버레이 배치 */
    }

    width: 90vw;
    min-height: 327px;
    padding: 0 2rem;
    background-position: 90%;
    align-items: flex-start;
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  z-index: 2;

  @media (max-width: 768px) {
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

const ClassDetailSection = styled.section`
  width: 100%;
  min-height: ${(props) => (props.defaultChecked ? '150vh' : '0')};
  background-color: white;

  background-image: url('/src/Program_IMG/Art/Program_ClassDetailSection_Background_IMG.png');
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10rem;

  @media (max-width: 728px) {
    min-height: 0;
    flex-direction: column;
    justify-content: flex-start;
    padding: 5rem 0.5rem;
    background-size: cover;
  }
`;
