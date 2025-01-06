import styled from 'styled-components';

const ProgramHeaderSection = ({ programType, description, backImgUrl }) => {
  return (
    <HeaderSection backImgUrl={backImgUrl}>
      <HeaderContent>
        <Title>Kids Class edu</Title>
        <Subtitle>{programType} 교육</Subtitle>
        <Description>{description}</Description>
        <HeaderIntroDiv>
          소예키즈 소개 - <GreenColorSpan>{programType} 교육</GreenColorSpan>
        </HeaderIntroDiv>
      </HeaderContent>
    </HeaderSection>
  );
};

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
    url(${(props) => props.backImgUrl});
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
    background: url(${(props) => props.backImgUrl});

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
    background-position: right;
    align-items: flex-start;
  }
`;

const HeaderContent = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  z-index: 1;

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

export default ProgramHeaderSection;
