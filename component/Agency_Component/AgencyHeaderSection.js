import styled from 'styled-components';
import Link from 'next/link';

// 기관 페이지 5종에 들어가는 HeaderSection
const AgencyHeaderSection = ({
  agency,
  title,
  description,
  backImgUrl,
  btncolor,
}) => {
  return (
    <HeaderSection backImgUrl={backImgUrl}>
      <HeaderContent>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <StyledLink href="/reservation">
          {agency ? (
            <ReservationButton btncolor={btncolor}>
              예약하기
              <span className="material-symbols-outlined">arrow_forward</span>
            </ReservationButton>
          ) : null}
        </StyledLink>
      </HeaderContent>
    </HeaderSection>
  );
};

const HeaderSection = styled.section`
  width: 100vw;
  height: 52.65vw;
  position: relative;

  background-image: url(${(props) => props.backImgUrl || ''});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  padding: 0 4rem 0 4rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;

  @media (max-width: 1080px) {
    min-height: 471px;
    padding: 3rem 0rem;
    justify-content: center;
    align-items: flex-start;
    background-position: 80%;
  }
`;

const HeaderContent = styled.div`
  position: absolute;
  top: 10%;
  left: 0;

  width: 40%;
  padding: 4rem 4rem 4rem 8rem;

  background: rgba(0, 0, 0, 0.1); /* 반투명 배경 */
  backdrop-filter: blur(25px); /* 블러 효과 */
  border-radius: 0 2rem 2rem 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 1080px) {
    background: rgba(255, 255, 255, 0.2);
    width: 90%;
    padding: 1.5rem;
    position: inherit;
    align-items: center;
    border-radius: 2rem;
    gap: 1rem;
  }
`;

const Title = styled.h2`
  color: #333;

  font-size: 4rem;
  font-family: Nunito;
  font-weight: 700;

  white-space: pre;

  @media (max-width: 1080px) {
    font-size: 2.3rem;
    text-align: center;
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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ReservationButton = styled.button`
  background-color: ${(props) => props.btncolor};
  border-radius: 2rem;
  border: none;

  margin-top: 1rem;
  padding: 1rem 2rem;

  color: white;
  font-size: 1.2rem;
  font-family: Pretendard;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.4rem;

  cursor: pointer;
  z-index: 1;
`;

export default AgencyHeaderSection;
