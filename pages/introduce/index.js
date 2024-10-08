import styled from 'styled-components';
import Image from 'next/image';
import IntroductionCarousel from '@/component/Introduction_Component/IntroductionCarousel';
import { useRecoilState } from 'recoil';
import { mobile } from '@/store/state';

const HistoryPage = () => {
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Title>Kids Class edu</Title>
          <Subtitle>회사 연혁</Subtitle>
          <Description>우리아이의 건강한 마음과 행복을 위해</Description>
          <HeaderIntroDiv>
            소예키즈 소개 - <GreenColorSpan>회사 연혁</GreenColorSpan>
          </HeaderIntroDiv>
        </HeaderContent>
      </HeaderSection>
      {/* 미들 섹션 */}
      <MiddleSection>
        {!mobileFlag && (
          <Image
            src="/src/Introduce_IMG/Introduce_Middle_Icon_IMG.png"
            alt="Icon"
            width={178}
            height={213}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
        <MiddleContainer>
          <MiddleTitle>KC EDU - History</MiddleTitle>
          <MiddleSubtitle>회사 연혁</MiddleSubtitle>
        </MiddleContainer>
      </MiddleSection>
      {/* 달력 섹션 */}
      <IntroductionCarousel />
      {/* 엔드 섹션 */}
      <EndSection>
        <EndTitle>
          우리아이의 성장 소예키즈와 함께 몸과 마음을 성장시켜요
        </EndTitle>
        <Button>콘텐츠 소개</Button>
      </EndSection>
    </MainContainer>
  );
};

export default HistoryPage;

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
  /* linear-gradient와 이미지 URL을 background 속성으로 조합 */
  background: linear-gradient(
      90deg,
      rgba(76, 176, 178, 0.8) 0%,
      /* 시작 색상, 투명도 0.8 */ rgba(76, 176, 178, 0) 60.5%
        /* 중간에서 투명해짐 */
    ),
    url('/src/Introduce_IMG/Introduce_CompanyIntro_Header_Background_IMG.png');
  background-size: cover; /* 배경 이미지 크기 조정 */
  background-position: center;
  background-repeat: no-repeat;

  padding: 0 4rem 0 4rem;
  border-radius: 24px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    width: 90vw;
    min-height: 300px;
    padding: 0 2rem;
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
    min-height: 0;
  }
`;

const MiddleContainer = styled.section`
  padding-top: 5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 1rem;

  @media (max-width: 768px) {
    padding-top: 1rem;
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
