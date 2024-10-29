import styled from 'styled-components';
import Link from 'next/link';
import { agencyClass, mobile } from '@/store/state';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import AgencyProgramCard from '@/component/Home_Component/AgencyProgramCard';
import ProgramClassContainer from '@/component/Agency_Component/ProgramClassContainer';
import EndSection from '@/component/Home_Component/EndSection';
import TeacherProfileCard from '@/component/Agency_Component/TeacherProfileCard';

import { handleTeacherGet } from '@/fetchAPI/teacherAPI';
import { handleClassGet } from '@/fetchAPI/classAPI';

import Image from 'next/image';

const section_1_Arr = [
  {
    imgPath: '/src/Agency_IMG/Icon/Agency_Icon_0_IMG.png',
    title: 'Program',
    content: '기관에 맞는 수업프로그램을 찾고 선택',
  },
  {
    imgPath: '/src/Agency_IMG/Icon/Agency_Icon_1_IMG.png',
    title: 'Teacher',
    content: '기관에서 선호하는 강사님들을 선택',
  },
  {
    imgPath: '/src/Agency_IMG/Icon/Agency_Icon_2_IMG.png',
    title: 'Time',
    content: '원하는 시간, 요일을 선택',
  },
];

const classDefaultArr = [
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_1_Background_IMG.png',
    title: '창의발레',
    routePath: '/program',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_2_Background_IMG.png',
    title: '체험형 원데이 프로그램',
    routePath: '/program',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_3_Background_IMG.png',
    title: '발표회 프로그램',
    routePath: '/program',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_4_Background_IMG.png',
    title: 'KPOP 방송댄스 프로그램',
    routePath: '/program',
  },
  {
    imgPath: '/src/Agency_IMG/Agency_kindergarden_Program_5_Background_IMG.png',
    title: '세계의 춤 프로그램',
    routePath: '/program',
  },
];

const CulturalPage = () => {
  const [agency, setAgency] = useRecoilState(agencyClass);
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);
  const [classDataArr, setClassDataArr] = useState([]);
  const [teacherDataArr, setTeacherDataArr] = useState([]);
  const router = useRouter();

  // 강사 List 조회
  useEffect(() => {
    // 강사 Read API 호출 메서드
    if (!teacherDataArr.length) {
      handleTeacherGet({ classType: '문화센터' })
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
    // 수업 Read API 호출 메서드
    if (!classDataArr.length) {
      handleClassGet({ classType: '문화센터' })
        .then((res) => res.data.data)
        .then((data) => {
          setClassDataArr([
            ...data.map((el) => {
              return {
                title: el.kk_class_title,
                imgPath: el.kk_class_file_path,
                routePath: `/program${el.kk_class_tag === 'ballet' ? '' : `/${el.kk_class_tag}`}?cName=${el.kk_class_title}`,
              };
            }),
          ]);
        })
        .catch(() => setClassDataArr(classDefaultArr));
    }
  }, []);

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <HeaderSection>
        <HeaderContent>
          <Subtitle>{`"Soyes Kids" \n with kids !!`}</Subtitle>
          <Description>
            {`각 기관에 맞는 프로그램을 찾고 강사를 \n 선택하여 예약하는 시스템입니다.`}
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
                문화센터 수업 예약하기
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
        <MiddleSectionTitle>문화센터 수업 영상</MiddleSectionTitle>
        <VideoContent>
          <iframe
            src="//www.youtube.com/embed/inQp6nNnkjk" // 수업 영상 유튜브 링크
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          />
        </VideoContent>
      </MiddleSectionSecond>
      {/* 미들 섹션 - 수업 프로그램 */}
      <MiddleSectionThird>
        <MiddleSectionSubtitle>Our Program Image</MiddleSectionSubtitle>
        <MiddleSectionTitle>문화센터 프로그램</MiddleSectionTitle>
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
      {/* 미들 섹션 - 수업 강사 */}
      <MiddleSectionFourth>
        <MiddleSectionSubtitle>OUR PROGRAM CLASS</MiddleSectionSubtitle>
        <MiddleSectionTitle>수업 강사</MiddleSectionTitle>
        <TeacherContainer rowCount={Math.ceil(teacherDataArr.length / 4)}>
          {teacherDataArr.length > 0
            ? teacherDataArr.map((el) => {
                const { id, name, introduce, profileImg } = el;
                return (
                  <TeacherProfileCard
                    key={id}
                    name={name}
                    introduce={introduce}
                    imgUrl={profileImg}
                    onClick={() => router.push(`/teacher/${id}`)}
                  />
                );
              })
            : ''}
        </TeacherContainer>
      </MiddleSectionFourth>
      {/* 엔드 섹션 */}
      <EndSection
        Title={`For our child's healthy body \n and heart happiness`}
        btnTitle={`예약하기`}
        routePath={agency ? `/reservation` : `/login`}
      />
    </MainContainer>
  );
};

export default CulturalPage;

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

  background-image: url('/src/Agency_IMG/문화센터/Agency_cultural_Header_Background_IMG.png');
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
    background-position: 70%;
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

const Subtitle = styled.h2`
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
  background-color: #4a90e2;
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
  background-color: #4a90e2;

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
    padding: 2rem;
  }
`;

const MiddleSectionFourth = styled.section`
  width: 100vw;
  min-height: 100vh;

  background-color: white;

  background-image: url('/src/Agency_IMG/Agency_kindergarden_Teacher_Background_IMG.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

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
  margin-top: 3rem;

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
