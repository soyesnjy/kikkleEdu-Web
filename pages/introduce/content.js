import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
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
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_1_Background_IMG.png',
    title: '스토리발레(창의발레)',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_1_Background_IMG.png',
    title: '스토리발레(창의발레)',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_1_Background_IMG.png',
    title: '스토리발레(창의발레)',
    routePath: '/',
  },
];

const ContentPage = () => {
  const [classTag, setClassTag] = useState('ballet');
  const [classDataArr, serClassDataArr] = useState([]);
  const router = useRouter();

  // 발레 수업 DB 조회
  useEffect(() => {
    // Class Read API 호출 메서드
    handleClassGet({ classTag: classTag })
      .then((res) => res.data.data)
      .then((data) => {
        serClassDataArr([
          ...data.map((el) => {
            return {
              title: el.kk_class_title,
              imgPath: el.kk_class_file_path,
              routePath: `/program/${el.kk_class_idx}`,
            };
          }),
        ]);
      })
      .catch(() => serClassDataArr(classDefaultArr));
  }, [classTag]);

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Title>Kids Class edu</Title>
          <Subtitle>콘텐츠 소개</Subtitle>
          <Description>
            소예키즈에서 연구개발한 다양한 예체능 교육프로그램을 연령대별로
            제공하고 있으며 기관이 원하는 프로그램을 선택 & 제공하고 있습니다.
          </Description>
          <HeaderIntroDiv>
            소예키즈 소개 - <GreenColorSpan>콘텐츠 소개</GreenColorSpan>
          </HeaderIntroDiv>
        </HeaderContent>
      </HeaderSection>
      {/* 미들 섹션 */}
      <MiddleSection>
        {/* <Image
          src="/src/Introduce_IMG/Introduce_Middle_Icon_IMG.png"
          alt="Icon"
          width={178}
          height={213}
          style={{ maxWidth: '100%', height: 'auto' }}
        /> */}
        <MiddleContainer>
          <MiddleTitle>KC EDU - Contents</MiddleTitle>
          <MiddleSubtitle>콘텐츠 소개</MiddleSubtitle>
        </MiddleContainer>
      </MiddleSection>
      {/* 수업 프로그램 섹션 */}
      <MiddleSectionThird>
        <SearchContainer>
          <TagButton
            selected={classTag === 'ballet'}
            value="ballet"
            onClick={(e) => {
              setClassTag(e.target.value);
            }}
          >
            발레
          </TagButton>
          <TagButton
            selected={classTag === 'dance'}
            value="dance"
            onClick={(e) => {
              setClassTag(e.target.value);
            }}
          >
            댄스
          </TagButton>
          <TagButton
            selected={classTag === 'yoga'}
            value="yoga"
            onClick={(e) => {
              setClassTag(e.target.value);
            }}
          >
            요가
          </TagButton>
          <TagButton
            selected={classTag === 'pila'}
            value="pila"
            onClick={(e) => {
              setClassTag(e.target.value);
            }}
          >
            필라테스
          </TagButton>
          <TagButton
            selected={classTag === 'music'}
            value="music"
            onClick={(e) => {
              setClassTag(e.target.value);
            }}
          >
            음악
          </TagButton>
        </SearchContainer>
        <ProgramContainer>
          {classDataArr.map((el, index) => {
            const { title, imgPath, routePath } = el;
            return (
              <ProgramContentContainer
                key={index}
                imgPath={imgPath}
                onClick={() => router.push(routePath)}
              >
                <ProgramTitle>{title}</ProgramTitle>
              </ProgramContentContainer>
            );
          })}
        </ProgramContainer>
      </MiddleSectionThird>
      {/* 엔드 섹션 */}
      <EndSection>
        <EndTitle>
          상상하고 즐기는 아동 창의력 발달! 정서 발달! 사회성 발달! ICT 융복합
          교육 문화콘텐츠 SOYES KIDS!
        </EndTitle>
        <Button>콘텐츠 소개</Button>
      </EndSection>
    </MainContainer>
  );
};

export default ContentPage;

const MainContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderSection = styled.section`
  width: 80vw;
  min-height: 21vw;
  position: relative;

  background-image: url('/src/Introduce_IMG/Introduce_Content_Header_Background_IMG.png');
  background-size: cover;
  background-position: center;
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
  width: 80vw;
  min-height: 327px;
  position: relative;

  padding: 0 2rem 0 2rem;
  border-radius: 24px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 4rem;
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

const MiddleSectionThird = styled.section`
  width: 100vw;
  min-height: 262px;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  @media (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
  }
`;

const SearchContainer = styled.section`
  width: 60%;
  border-radius: 24px;

  display: flex;
  justify-content: flex-end;

  gap: 1rem;
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
    width: 100%;
    font-size: 1rem;
    padding: 1rem;
    margin-bottom: 0;
  }
`;

const ProgramContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;

  gap: 1rem;
  margin-top: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
  }
`;

const ProgramContentContainer = styled.div`
  width: 280px;
  height: 280px;

  /* 배경 이미지와 그라데이션을 함께 설정 */
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 1) 10%,
      rgba(0, 0, 0, 0) 30%
    ),
    url(${(props) => props.imgPath || '/half-moon.png'});
  background-size: cover; /* 이미지 크기 조정 */
  background-position: center;
  background-repeat: no-repeat;

  /* 배경 이미지 위에 그라데이션 효과를 덧씌우기 */
  background-blend-mode: normal;

  padding: 1rem;

  border-radius: 15px;

  /* 선택 여부에 따른 테두리 */
  border: ${(props) => (props.selected ? '5px solid #45b26b' : 'none')};
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 1rem;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  /* 반응형 크기 조정 */
  @media (max-width: 768px) {
    width: 155px;
    height: 202px;
  }
`;

const ProgramTitle = styled.div`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.2rem;
  color: white;

  z-index: 1;
`;

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
    width: 100%;
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