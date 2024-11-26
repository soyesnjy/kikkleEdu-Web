import styled from 'styled-components';
import ProgramClassContainer from './ProgramClassContainer';

// 기관 페이지 5종에 들어가는 MiddleFirstSection
const AgencyMiddleThirdSection = ({ agency, mobileFlag, classDataArr }) => {
  return (
    <MiddleSectionThird>
      <MiddleSectionSubtitle>Our Program Image</MiddleSectionSubtitle>
      <MiddleSectionTitle>{agency} 프로그램</MiddleSectionTitle>
      <Description>
        {mobileFlag
          ? `아이들이 재미있게 체험할 수 있는 \n 다양한 소예키즈의 교육프로그램`
          : `아이들이 재미있게 체험할 수 있는 다양한 소예키즈의 교육프로그램`}
      </Description>
      <ProgramClassContainer
        classDataArr={classDataArr}
        mobileFlag={mobileFlag}
      />
    </MiddleSectionThird>
  );
};

const MiddleSectionThird = styled.section`
  width: 100%;
  min-height: 262px;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  gap: 1rem;

  @media (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

const MiddleSectionTitle = styled.h2`
  color: #313131;

  font-size: 3rem;
  font-family: Pretendard;
  font-weight: 700;

  @media (max-width: 1080px) {
    font-size: 24px;
  }
`;

const MiddleSectionSubtitle = styled.h2`
  color: #7067aa;

  font-size: 18px;
  font-family: Nunito;
  font-weight: 700;

  @media (max-width: 1080px) {
    font-size: 12px;
  }
`;

const Description = styled.p`
  color: #313131;

  font-size: 1.2rem;
  font-family: Pretendard;
  font-weight: 400;

  white-space: pre;

  @media (max-width: 1080px) {
    text-align: center;
  }
`;

export default AgencyMiddleThirdSection;
