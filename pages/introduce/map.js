import styled from 'styled-components';
import Image from 'next/image';

const CeoPage = () => {
  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Title>Kids Class edu</Title>
          <Subtitle>주소 및 약도</Subtitle>
          <HeaderIntroDiv>
            소예키즈 소개 - <GreenColorSpan>주소 및 약도</GreenColorSpan>
          </HeaderIntroDiv>
        </HeaderContent>
      </HeaderSection>
      {/* 미들 섹션 */}
      <MiddleSection>
        <MiddleContainer>
          <MiddleTitle>CONNECT WITH US !</MiddleTitle>
          <MiddleSubtitle>주소 및 약도</MiddleSubtitle>
          <Description>
            {`주소         : 서울시 마포구 성암로 330 DMC첨단산업센터 404-4`}
          </Description>
          <Description>오시는 길 : 수색역 / 디지털미디어시티역</Description>
        </MiddleContainer>
      </MiddleSection>
      {/* 맵 섹션 */}
      <MapSection>
        <MapLeftContainer>
          <MapLeftTextContainer>
            <MapLeftTitle>Name</MapLeftTitle>
            <MapLeftDescription>소예키즈 Soyes Kids</MapLeftDescription>
          </MapLeftTextContainer>

          <MapLeftTextContainer>
            <MapLeftTitle>Website</MapLeftTitle>
            <MapLeftDescription>soyes.kr</MapLeftDescription>
          </MapLeftTextContainer>

          <MapLeftTextContainer>
            <MapLeftTitle>Phone Number</MapLeftTitle>
            <MapLeftDescription>02-303-4420 </MapLeftDescription>
          </MapLeftTextContainer>

          <MapLeftTextContainer>
            <MapLeftTitle>Email Address</MapLeftTitle>
            <MapLeftDescription>soyeskids@gmail.com</MapLeftDescription>
          </MapLeftTextContainer>
        </MapLeftContainer>
        <MapRightContainer>
          <Image
            src="/src/Introduce_IMG/Map/Introduce_Map_IMG.png"
            alt="bannerImgPath"
            width={601}
            height={601}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </MapRightContainer>
      </MapSection>
      {/* 엔드 섹션 */}
      <EndSection>
        <EndTitle>
          Loren iqsum dolor sit...Loren iqsum dolor sit...Loren iqsum dolor
          sit...
        </EndTitle>
        <Button>콘텐츠 소개</Button>
      </EndSection>
    </MainContainer>
  );
};

export default CeoPage;

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
      rgba(76, 176, 178, 0) 60.5%
    ),
    url('/src/Introduce_IMG/Map/Introduce_Map_Header_Background_IMG.png');
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
  color: black;

  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 400;

  white-space: pre;

  @media (max-width: 768px) {
    white-space: wrap;
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
    width: 100%;
    padding: 0 1rem;
  }
`;

const MiddleContainer = styled.section`
  padding-top: 5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
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

const MapSection = styled.section`
  width: 80vw;
  min-height: 327px;
  position: relative;

  padding: 4rem 2rem;
  border-radius: 24px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 4rem;

  @media (max-width: 768px) {
    width: 95vw;
    flex-direction: column;
    padding: 1rem;
  }
`;

const MapLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 2rem;
`;

const MapLeftTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
`;

const MapLeftTitle = styled.h1`
  font-family: Pretendard;
  font-weight: 700;
  color: black;
`;

const MapLeftDescription = styled.h4`
  font-family: Pretendard;
  font-weight: 600;
  color: #b9b9b9;
`;

const MapRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
