import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

// 기관 페이지 5종에 들어가는 MiddleReservationSection
const AgencyMiddleReservationSection = ({ agency, backcolor }) => {
  return (
    <MiddleSectionReservation>
      <ReservationButtonContainer backcolor={backcolor}>
        <ReservationTextContainer>
          <ReservationButtonTitle>
            {agency} 수업 예약하기
          </ReservationButtonTitle>
          <ReservationButtonSubTitle>
            손쉽게 수업을 예약해보세요.
          </ReservationButtonSubTitle>
        </ReservationTextContainer>
        <StyledLink href="/reservation">
          <Image
            src="/src/Agency_IMG/Agency_Reservation_Icon_IMG.png"
            alt="Icon"
            width={102}
            height={102}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </StyledLink>
      </ReservationButtonContainer>
    </MiddleSectionReservation>
  );
};

const MiddleSectionReservation = styled.section`
  width: 100vw;
  min-height: 262px;

  background-color: white;
  padding: 3rem;

  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
  }
`;

const ReservationButtonContainer = styled.div`
  width: 80%;
  min-height: 216px;
  border-radius: 32px;

  padding: 4rem;
  background-color: ${(props) => props.backcolor};

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1080px) {
    width: 100%;
    align-items: center;
    padding: 2rem;
  }
`;

const ReservationTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;

  gap: 3rem;

  @media (max-width: 1080px) {
    gap: 1.5rem;
  }
`;

const ReservationButtonTitle = styled.div`
  font-size: 2rem;
  font-family: Pretendard;
  font-weight: 700;

  color: white;
`;

const ReservationButtonSubTitle = styled.div`
  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 400;

  color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default AgencyMiddleReservationSection;
