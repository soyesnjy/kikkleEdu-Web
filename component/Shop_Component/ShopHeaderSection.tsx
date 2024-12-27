import styled from 'styled-components';

type ShopHeaderSectionType = {
  description: string;
  backImgUrl: string; // header section background image url
};

const ShopHeaderSection = ({
  description,
  backImgUrl,
}: ShopHeaderSectionType) => {
  return (
    <HeaderSection backImgUrl={backImgUrl}>
      <HeaderContent>
        <Title>{`Kids Class edu`}</Title>
        <Subtitle>{`상점`}</Subtitle>
        <Description>{description}</Description>
        <HeaderIntroDiv>
          {`소예키즈 소개 - `}
          <GreenColorSpan>{`상점`}</GreenColorSpan>
        </HeaderIntroDiv>
      </HeaderContent>
    </HeaderSection>
  );
};

type BackImgUrlType = {
  backImgUrl?: string;
};

const HeaderSection = styled.section<BackImgUrlType>`
  width: 80vw;
  min-height: 21vw;
  position: relative;

  /* linear-gradient와 이미지 URL을 background 속성으로 조합 */
  background: linear-gradient(90deg, #378e56 0%, rgba(55, 142, 86, 0) 60.5%),
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

  z-index: 2;

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

export default ShopHeaderSection;
