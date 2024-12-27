import styled from 'styled-components';

const ShopMiddleSection = () => {
  return (
    <MiddleSection>
      <MiddleContainer>
        <MiddleTitle>{`KK EDU - Contents`}</MiddleTitle>
        <MiddleSubtitle>{`상점`}</MiddleSubtitle>
      </MiddleContainer>
    </MiddleSection>
  );
};

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

export default ShopMiddleSection;
