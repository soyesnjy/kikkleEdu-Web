import styled from 'styled-components';
import Link from 'next/link';
import { agencyClass } from '@/store/state';
import { useRecoilState } from 'recoil';

const HistoryPage = () => {
  // 기관 유형 (로그인 시 받아오는 값)
  const [agency, setAgency] = useRecoilState(agencyClass);
  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Subtitle>Where Children Grow and Learn Happily - Slogan</Subtitle>
          <Description>
            Lorem ipsum dolor sit amet veli elitni legro int dolor.Lorem ipsum
            dolor sit amet veli elitni legro int dolor.
          </Description>
          {/* <StyledLink href={agency ? '/reservation' : '/login'}> */}
          <StyledLink href="/reservation">
            <ReservationButton>
              예약하기
              <span class="material-symbols-outlined">arrow_forward</span>
            </ReservationButton>
          </StyledLink>
        </HeaderContent>
      </HeaderSection>
      {/* 미들 섹션 */}

      {/* TODO# 달력 섹션 */}
      <h1>유치원 수업 영상</h1>
      {/* TODO# 달력 섹션 */}
      <h1>유치원 프로그램</h1>
      {/* TODO# 달력 섹션 */}
      <h1>수업 강사</h1>
      {/* 엔드 섹션 */}
      <EndSection>
        <EndTitle>
          Loren iqsum dolor sit...Loren iqsum dolor sit... Loren iqsum dolor
          sit...
        </EndTitle>
        <Button>콘텐츠 소개</Button>
      </EndSection>
    </MainContainer>
  );
};

export default HistoryPage;

const MainContainer = styled.div`
  width: 100%;
  padding: 1rem 0 0 0;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;
`;

const HeaderSection = styled.section`
  width: 100vw;
  height: 52.65vw;
  position: relative;

  background-image: url('/src/Agency_IMG/유치원/Agency_kindergarden_Header_Background_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f4eee5;

  padding: 0 4rem 0 4rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;
`;

const HeaderContent = styled.div`
  position: absolute;
  top: 10%;
  left: 0;

  width: 40%;
  padding: 4rem 4rem 4rem 8rem;

  background: rgba(255, 255, 255, 0.3); /* 반투명 배경 */
  backdrop-filter: blur(25px); /* 블러 효과 */
  border-radius: 0 2rem 2rem 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const Subtitle = styled.h2`
  color: #333;

  font-size: 4rem;
  font-family: Nunito;
  font-weight: 700;
`;

const Description = styled.p`
  color: #313131;

  font-size: 1.2rem;
  font-family: Pretendard;
  font-weight: 400;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ReservationButton = styled.button`
  background-color: #45b26b;
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

const MiddleSection = styled.section`
  width: 80vw;
  min-height: 327px;
  position: relative;

  padding: 0 4rem 0 4rem;
  border-radius: 24px;

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

const MiddleDescription = styled.p`
  font-size: 1.1rem;
  font-family: Pretendard;
  font-weight: 400;
  color: #737373;

  margin-top: 0.5rem;

  line-height: 1.5;
`;

const EndSection = styled.section`
  width: 100%;
  min-height: 650px;
  position: relative;

  background-image: url('/src/Introduce_IMG/Introduce_End_Background_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  padding: 0 4rem 0 4rem;
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;
`;

const EndTitle = styled.h1`
  width: 70%;
  text-align: center;
  font-size: 3rem;
  font-family: Nunito;
  font-weight: 600;
  color: #171717;
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
