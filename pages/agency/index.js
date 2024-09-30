import styled from 'styled-components';
import Link from 'next/link';
import { agencyClass } from '@/store/state';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import AgencyProgramCard from '@/component/Home_Component/AgencyProgramCard';
import { handleTeacherGet } from '@/fetchAPI/teacherAPI';

import Image from 'next/image';

const section_1_Arr = [
  {
    imgPath: '/src/Agency_IMG/Icon/Agency_Icon_0_IMG.png',
    title: 'Feature tt',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
  },
  {
    imgPath: '/src/Agency_IMG/Icon/Agency_Icon_1_IMG.png',
    title: 'Feature tt',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
  },
  {
    imgPath: '/src/Agency_IMG/Icon/Agency_Icon_2_IMG.png',
    title: 'Feature tt',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
  },
];

const section_2_Arr = [
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_1_Background_IMG.png',
    title: '스토리발레(창의발레)',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_2_Background_IMG.png',
    title: '체험형 원데이 프로그램',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_3_Background_IMG.png',
    title: '발표회 프로그램',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_4_Background_IMG.png',
    title: 'KPOP 방송댄스 프로그램',
    routePath: '/',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_5_Background_IMG.png',
    title: '세계의 춤 프로그램',
    routePath: '/',
  },
];

const KindergartenPage = () => {
  const [agency, setAgency] = useRecoilState(agencyClass);
  const [teacherDataArr, setTeacherDataArr] = useState([]);
  const router = useRouter();

  // 강사 List 조회
  useEffect(() => {
    if (!teacherDataArr.length) {
      // 강사 Read API 호출 메서드
      handleTeacherGet({ classType: '유치원' })
        .then((res) => res.data.data)
        .then((data) => {
          setTeacherDataArr([
            ...data.map((el) => {
              return {
                id: el.kk_teacher_idx,
                name: el.kk_teacher_name,
                introduce: el.kk_teacher_introduction,
                profileImg: el.kk_teacher_profileImg_path,
              };
            }),
          ]);
        })
        .catch((err) => console.error(err));
    }
  }, []);

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
            {agency ? (
              <ReservationButton>
                예약하기
                <span class="material-symbols-outlined">arrow_forward</span>
              </ReservationButton>
            ) : null}
          </StyledLink>
        </HeaderContent>
      </HeaderSection>
      {/* 미들 섹션 - 1 */}
      <MiddleSectionFirst>
        {section_1_Arr.map((el, index) => {
          const { imgPath, title, content } = el;
          return (
            <AgencyProgramCard
              key={index}
              imgPath={imgPath}
              title={title}
              content={content}
            />
          );
        })}
      </MiddleSectionFirst>
      {/* 미들 섹션 - 예약하기 */}
      {agency ? (
        <MiddleSectionReservation>
          <ReservationButtonContainer>
            <ReservationTextContainer>
              <ReservationButtonTitle>
                유치원 수업 예약하기
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
      ) : null}

      {/* 미들 섹션 - 수업 영상 */}
      <MiddleSectionSecond>
        <MiddleSectionSubtitle>Our Program Video</MiddleSectionSubtitle>
        <MiddleSectionTitle>유치원 수업 영상</MiddleSectionTitle>
        <VideoContent>
          <iframe
            src="//www.youtube.com/embed/DTJUfa0kKzY" // 수업 영상 유튜브 링크
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          />
        </VideoContent>
      </MiddleSectionSecond>
      {/* 미들 섹션 - 수업 프로그램 */}
      <MiddleSectionThird>
        <MiddleSectionSubtitle>Our Program Video</MiddleSectionSubtitle>
        <MiddleSectionTitle>유치원 프로그램</MiddleSectionTitle>
        <Description>
          Lorem ipsum dolor sit amet veli elitni legro int dolor.Lorem ipsum
          dolor sit amet veli elitni legro int dolor.
        </Description>
        <ProgramContainer>
          {section_2_Arr.map((el, index) => {
            const { title, imgPath, routePath } = el;
            return (
              <ProgramContentContainer
                key={index}
                imgPath={imgPath}
                onClick={() => router.push(routePath)}
              >
                <ProgramTitle>{title}</ProgramTitle>
              </ProgramContentContainer>
            );
          })}
        </ProgramContainer>
      </MiddleSectionThird>
      {/* 미들 섹션 - 수업 강사 */}
      <MiddleSectionFourth>
        <MiddleSectionSubtitle>Our Program Video</MiddleSectionSubtitle>
        <MiddleSectionTitle>수업강사</MiddleSectionTitle>
        <Description>
          Lorem ipsum dolor sit amet veli elitni legro int dolor.Lorem ipsum
          dolor sit amet veli elitni legro int dolor.
        </Description>
        <TeacherContainer rowCount={Math.ceil(teacherDataArr.length / 4)}>
          {teacherDataArr.length > 0
            ? teacherDataArr.map((el, index) => {
                const { id, name, introduce } = el;
                return (
                  <TeacherButtonContainer
                    key={index}
                    onClick={() => router.push(`/teacher/${id}`)}
                  >
                    <TeacherTextContainer>
                      <TeacherButtonTitle>{name}</TeacherButtonTitle>
                      <TeacherButtonSubTitle>
                        {introduce ? introduce : `강사 ${name}입니다`}
                      </TeacherButtonSubTitle>
                    </TeacherTextContainer>
                  </TeacherButtonContainer>
                );
              })
            : ''}
        </TeacherContainer>
      </MiddleSectionFourth>
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

export default KindergartenPage;

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

  background-image: url('/src/Agency_IMG/Agency_kindergarden_Header_Background_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  padding: 0 4rem 0 4rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;

  @media (max-width: 1080px) {
    height: 100%;
    padding: 1rem;
    justify-content: center;
  }
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

  @media (max-width: 1080px) {
    padding: 1.5rem;
    width: 90%;
    position: inherit;

    align-items: center;

    border-radius: 2rem;
  }
`;

const Subtitle = styled.h2`
  color: #333;

  font-size: 4rem;
  font-family: Nunito;
  font-weight: 700;

  @media (max-width: 1080px) {
    font-size: 1.9rem;
  }
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

const MiddleSectionFirst = styled.section`
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
  background-color: #45b26b;

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

const MiddleSectionSecond = styled.section`
  width: 100vw;
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
    align-items: flex-start;
    padding: 2rem;
  }
`;

const MiddleSectionTitle = styled.h2`
  color: #333;

  font-size: 3rem;
  font-family: Pretendard;
  font-weight: 700;

  @media (max-width: 1080px) {
    font-size: 1.9rem;
  }
`;

const MiddleSectionSubtitle = styled.h2`
  color: #7067aa;

  font-size: 18px;
  font-family: Nunito;
  font-weight: 700;

  @media (max-width: 1080px) {
    font-size: 1.9rem;
  }
`;

const VideoContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;

  iframe {
    width: 900px;
    height: 528px;
  }
  min-height: 360px;
  z-index: 1;

  @media (max-width: 1080px) {
    iframe {
      width: 100%;
      height: 328px;
    }
  }
`;

const MiddleSectionThird = styled.section`
  width: 100vw;
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
    align-items: flex-start;
    padding: 2rem;
  }
`;

const ProgramContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;

  gap: 1rem;
  margin-top: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
  }
`;

const ProgramContentContainer = styled.div`
  width: 280px;
  height: 280px;

  /* 배경 이미지와 그라데이션을 함께 설정 */
  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 1) 10%,
      rgba(0, 0, 0, 0) 30%
    ),
    url(${(props) => props.imgPath || 'none'});
  background-size: cover; /* 이미지 크기 조정 */
  background-position: center;
  background-repeat: no-repeat;

  /* 배경 이미지 위에 그라데이션 효과를 덧씌우기 */
  background-blend-mode: normal;

  padding: 1rem;

  border-radius: 15px;

  /* 선택 여부에 따른 테두리 */
  border: ${(props) => (props.selected ? '5px solid #45b26b' : 'none')};
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 1rem;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  /* 반응형 크기 조정 */
  @media (max-width: 768px) {
    width: 155px;
    height: 202px;
  }
`;

const ProgramTitle = styled.div`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.2rem;
  color: white;

  z-index: 1;
`;

const MiddleSectionFourth = styled.section`
  width: 100vw;
  min-height: 262px;

  background-color: #beb6f2;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  @media (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

const TeacherContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TeacherButtonContainer = styled.div`
  width: 280px;
  height: 280px;
  background: ${(props) =>
    props.selected
      ? 'linear-gradient(#cacaca 80%, black)'
      : 'linear-gradient(#cacaca 100%, black)'};

  border-radius: 24px;

  border: ${(props) => (props.selected ? '5px solid #45b26b' : 'none')};
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    height: 280px;
  }
`;

const TeacherTextContainer = styled.div`
  width: 100%;
  height: 30%;
  background-color: white;
  color: black;

  padding: 1rem;

  border-radius: 0 0 15px 15px;

  border: ${(props) => (props.selected ? '5px solid #45b26b' : 'none')};

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 1rem;

  @media (max-width: 768px) {
    height: 30%;
  }
`;

const TeacherButtonTitle = styled.div`
  font-family: Pretendard;
  font-weight: 600;
  font-size: 16px;
`;

const TeacherButtonSubTitle = styled.div`
  font-family: Pretendard;
  font-weight: 400;
  font-size: 12px;
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
