/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';

import { agencyClass, mobile } from '@/store/state';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import AgencyHeaderSection from '@/component/Agency_Component/AgencyHeaderSection';
import AgencyMiddleFirstSection from '@/component/Agency_Component/AgencyMiddleFirstSection';
import AgencyMiddleReservationSection from '@/component/Agency_Component/AgencyMiddleReservationSection';
import AgencyMiddleSecondSection from '@/component/Agency_Component/AgencyMiddleSecondSection';

import ProgramClassContainer from '@/component/Agency_Component/ProgramClassContainer';
import { handleTeacherGet } from '@/fetchAPI/teacherAPI';
import { handleClassGet } from '@/fetchAPI/classAPI';
import EndSection from '@/component/Home_Component/EndSection';
import TeacherProfileCard from '@/component/Agency_Component/TeacherProfileCard';

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

const youtubeUrl = '//www.youtube.com/embed/-n3X-_FmRk8';

// 유치원 페이지 - Default
const KindergartenPage = () => {
  const [agency, setAgency] = useRecoilState(agencyClass);
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);
  const [classDataArr, setClassDataArr] = useState([]);
  const [teacherDataArr, setTeacherDataArr] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // 강사 Read API 호출 메서드
    if (!teacherDataArr.length) {
      handleTeacherGet({ classType: '유치원' })
        .then((res) => res.data.data)
        .then((data) => {
          // console.log(data);
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
      handleClassGet({ classType: '유치원' })
        .then((res) => res.data.data)
        .then((data) => {
          setClassDataArr([
            ...data.map((el) => {
              return {
                idx: el.kk_class_idx,
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
      <AgencyHeaderSection
        agency={agency}
        title={`"Soyes Kids" \n with kids !!`}
        description={`각 기관에 맞는 프로그램을 찾고 강사를 \n 선택하여 예약하는 시스템입니다.`}
        backImgUrl={`/src/Agency_IMG/유치원/Agency_kindergarden_Header_Background_IMG.png`}
        btncolor={`#45b26b`}
      />
      {/* 미들 섹션 - Frist */}
      <AgencyMiddleFirstSection />

      {/* 미들 섹션 - 예약하기 */}
      {agency ? (
        <AgencyMiddleReservationSection
          agency={`유치원`}
          backcolor={`#45b26b`}
        />
      ) : null}

      {/* 미들 섹션 - 수업 영상 */}
      <AgencyMiddleSecondSection agency={`유치원`} youtubeUrl={youtubeUrl} />

      {/* 미들 섹션 - 수업 프로그램 */}
      <MiddleSectionThird>
        <MiddleSectionSubtitle>Our Program Image</MiddleSectionSubtitle>
        <MiddleSectionTitle>유치원 프로그램</MiddleSectionTitle>
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
        <TeacherContainer>
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
