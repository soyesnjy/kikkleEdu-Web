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
import AgencyMiddleThirdSection from '@/component/Agency_Component/AgencyMiddleThirdSection';
import AgencyMiddleFourthSection from '@/component/Agency_Component/AgencyMiddleFourthSection';
import EndSection from '@/component/Home_Component/EndSection';

import { handleTeacherGet } from '@/fetchAPI/teacherAPI';
import { handleClassGet } from '@/fetchAPI/classAPI';

const teacherDefaultArr = [
  {
    id: -1,
    name: '통신에러',
    introduce: '',
    profileImg: '',
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

const youtubeUrl = '//www.youtube.com/embed/-n3X-_FmRk8';

const agencyType = '아파트 커뮤니티 센터';

const ComunityPage = () => {
  const [agency, setAgency] = useRecoilState(agencyClass);
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);
  const [classDataArr, setClassDataArr] = useState([]);
  const [teacherDataArr, setTeacherDataArr] = useState([]);
  const router = useRouter();

  // 강사 List 조회
  useEffect(() => {
    // 강사 Read API 호출 메서드
    if (localStorage.getItem('agencyTeacherData')) {
      setTeacherDataArr([
        ...JSON.parse(localStorage.getItem('agencyTeacherData')),
      ]);
    } else {
      handleTeacherGet({ classType: '커뮤니티센터' })
        .then((res) => res.data.data)
        .then((data) => {
          // console.log(data);
          const tuningData = data.map((el) => {
            return {
              id: el.kk_teacher_idx,
              name: el.kk_teacher_name,
              introduce: el.kk_teacher_introduction,
              profileImg: el.kk_teacher_profileImg_path,
            };
          });
          localStorage.setItem('agencyTeacherData', JSON.stringify(tuningData));
          setTeacherDataArr([...tuningData]);
        })
        .catch((err) => {
          console.error(err);
          setTeacherDataArr(teacherDefaultArr);
        });
    }
    // 수업 Read API 호출 메서드
    if (localStorage.getItem('agencyClassData')) {
      setClassDataArr([...JSON.parse(localStorage.getItem('agencyClassData'))]);
    } else {
      handleClassGet({ classType: '커뮤니티센터' })
        .then((res) => res.data.data)
        .then((data) => {
          const tuningData = data.map((el) => {
            return {
              idx: el.kk_class_idx,
              title: el.kk_class_title,
              imgPath: el.kk_class_file_path,
              routePath: `/program${el.kk_class_tag === 'ballet' ? '' : `/${el.kk_class_tag}`}?cName=${el.kk_class_title}`,
            };
          });
          localStorage.setItem('agencyClassData', JSON.stringify(tuningData));
          setClassDataArr([...tuningData]);
        })
        .catch((err) => {
          console.error(err);
          setClassDataArr(classDefaultArr);
        });
    }
    return () => {
      localStorage.removeItem('agencyTeacherData');
      localStorage.removeItem('agencyClassData');
    };
  }, []);

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <AgencyHeaderSection
        agency={agency}
        title={`"Soyes Kids" \n with kids !!`}
        description={`각 기관에 맞는 프로그램을 찾고 강사를 \n 선택하여 예약하는 시스템입니다.`}
        backImgUrl={`/src/Agency_IMG/커뮤니티센터/Agency_community_Header_Background_IMG.png`}
        btncolor={`#f29494`}
      />
      {/* 미들 섹션 - 1 */}
      <AgencyMiddleFirstSection />
      {/* 미들 섹션 - 예약하기 */}
      {agency ? (
        <AgencyMiddleReservationSection
          agency={agencyType}
          backcolor={`#f29494`}
        />
      ) : null}

      {/* 미들 섹션 - 수업 영상 */}
      <AgencyMiddleSecondSection agency={agencyType} youtubeUrl={youtubeUrl} />

      {/* 미들 섹션 - 수업 프로그램 */}
      <AgencyMiddleThirdSection
        agency={agencyType}
        mobileFlag={mobileFlag}
        classDataArr={classDataArr}
      />

      {/* 미들 섹션 - 수업 강사 */}
      <AgencyMiddleFourthSection
        router={router}
        teacherDataArr={teacherDataArr}
      />

      {/* 엔드 섹션 */}
      <EndSection
        Title={`For our child's healthy body \n and heart happiness`}
        btnTitle={`예약하기`}
        routePath={agency ? `/reservation` : `/login`}
      />
    </MainContainer>
  );
};

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

export default ComunityPage;
