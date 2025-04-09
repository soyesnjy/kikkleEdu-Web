/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';

import { useSearchParams } from 'next/navigation';
import { agencyClass } from '@/store/state';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';

import ProgramHeaderSection from '@/component/Program_Componet/ProgramHeaderSection';
import ProgramMiddleCategorySection from '@/component/Program_Componet/ProgramMiddleCategorySection';
import LessonSection from '@/component/Home_Component/LessonSection';
import EduArtVideoComponent from '@/component/Home_Component/EduArtVideoComponent';
import ProgramClassDetailSection from '@/component/Program_Componet/ProgramClassDetailSection';
import EndSection from '@/component/Home_Component/EndSection';

import { handleClassGet } from '@/fetchAPI/classAPI';

const classDefaultArr = [
  {
    imgPath: '',
    title: '서버 통신 실패',
    routePath: '/',
  },
];

const eduSectionData = {
  title: '필라테스',
  content: '연령에 맞춘 매트필라테스 프로그램 제공',
  features: ['성인필라테스'], // default features
  youtubeUrl: '//www.youtube.com/embed/PM87DgX6yD8',
};

const PilaProgramPage = () => {
  const [classDataArr, setClassDataArr] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
  const agency = useRecoilValue(agencyClass);

  const searchParams = useSearchParams();
  const cName = searchParams.get('cName');
  // const router = useRouter();

  // 수업 DB 조회
  useEffect(() => {
    // 로컬에 programClassData 값이 있는 경우
    if (localStorage.getItem('programClassData')) {
      setClassDataArr([
        ...JSON.parse(localStorage.getItem('programClassData')),
      ]);
    } else {
      // Class Read API 호출 메서드
      handleClassGet({ classTag: 'pila', classDetail: true })
        .then((res) => res.data.data)
        .then((data) => {
          const tuningData = data.map((el) => {
            return {
              title: el.kk_class_title,
              content: el.kk_class_content,
              info: el.kk_class_info,
              imgPath: el.kk_class_file_path,
              detailPath: el.kk_class_detail_path,
            };
          });
          localStorage.setItem('programClassData', JSON.stringify(tuningData));
          setClassDataArr([...tuningData]);
        })
        .catch((err) => {
          console.log(err);
          setClassDataArr(classDefaultArr);
        });
    }

    return () => {
      localStorage.removeItem('programClassData');
    };
  }, []);

  // selectedClass 설정
  useEffect(() => {
    // cName Query 있는 경우
    if (cName) {
      setSelectedClass({
        ...classDataArr.filter((el) => el.title === cName)[0],
      });
      return;
    }
    // cName Query 없는 경우
    else if (classDataArr.length > 0) {
      setSelectedClass({ ...classDataArr[0] });
      return;
    }
  }, [classDataArr, cName]);

  useEffect(() => {
    setSelectedClass({
      ...classDataArr.filter((el) => el.title === cName)[0],
    });
  }, [cName]);

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <ProgramHeaderSection
        programType={`필라테스`}
        description={`매트에서 할 수 있는 다양한 필라테스 클래스`}
        backImgUrl={`/src/Program_IMG/Pila/Program_Header_Pila_Background_IMG.png`}
      />

      {/* 수업 카테고리 */}
      <ProgramMiddleCategorySection
        classDataArr={classDataArr}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
      />

      {/* 소개 섹션 */}
      <IntroSection>
        <LessonSection
          title={selectedClass?.title || ''}
          subtitle={selectedClass?.content || ''}
          imgUrl={selectedClass?.imgPath || '/src/soyesKids_Logo.png'}
          type="program"
          info={selectedClass?.info || ''}
        />
      </IntroSection>
      {/* 미들 섹션 - 댄스 */}
      <EduArtVideoComponent
        sectionData={{
          ...eduSectionData,
          features: classDataArr.map((el) => el.title),
        }}
      />
      {/* 수업 Detail 섹션 */}
      <ProgramClassDetailSection
        detailImgPath={selectedClass?.detailPath}
        backImgPath={
          '/src/Program_IMG/Pila/Program_ClassDetailSection_Background_IMG.png'
        }
      />
      {/* 엔드 섹션 */}
      <EndSection
        Title={`For our child's healthy body \n and heart happiness`}
        btnTitle={`예약하기`}
        routePath={agency ? `/reservation` : `/signup`}
      />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 3rem;
`;

const IntroSection = styled.section`
  width: 100vw;
  min-height: 50vh;

  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1080px) {
    height: 100%;
    flex-direction: column;
    padding: 2rem;
  }
`;

export default PilaProgramPage;
