import styled from 'styled-components';

const BoardHeaderSection = () => {
  return (
    <HeaderSection>
      <HeaderContent>
        <Title>{`Kids Class edu`}</Title>
        <Subtitle>{`공지 사항`}</Subtitle>
        <HeaderIntroDiv>
          {`소예키즈 소개 - `}
          <GreenColorSpan>{`게시판`}</GreenColorSpan>
        </HeaderIntroDiv>
      </HeaderContent>
    </HeaderSection>
  );
};

const HeaderSection = styled.section`
  width: 80vw;
  min-height: 21vw;
  position: relative;

  background-image: url('/src/Introduce_IMG/Introduce_Header_Background_IMG.png');
  background-size: contain;
  background-position: center;
  background-color: #f4eee5;

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

export default BoardHeaderSection;
