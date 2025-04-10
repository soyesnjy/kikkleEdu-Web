'use client';
import styled from 'styled-components';

import { useSearchParams } from 'next/navigation';
import { agencyClass } from '@/store/state';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import ProgramHeaderSection from '@/component/Program_Componet/ProgramHeaderSection';
import ProgramMiddleCategorySection from '@/component/Program_Componet/ProgramMiddleCategorySection';
import LessonSection from '@/component/Home_Component/LessonSection';
import EduArtVideoComponent from '@/component/Home_Component/EduArtVideoComponent';
import ProgramClassDetailSection from '@/component/Program_Componet/ProgramClassDetailSection';
import EndSection from '@/component/Home_Component/EndSection';
import LoadingModal from '@/component/Common_Component/LoadingModal';

import { handleClassGet } from '@/fetchAPI/classAPI';

const classDefaultArr: ClassDataType[] = [
  {
    imgPath: '',
    title: '서버 통신 실패',
    content: '',
    info: '',
    detailPath: '',
  },
];
const eduSectionData = {
  title: '요가',
  content: '연령에 맞춘 요가 프로그램 제공',
  features: ['성인요가'], // default features
  youtubeUrl: '//www.youtube.com/embed/ZpzJoTx1fKY',
};

// React Query - 서버에서 데이터를 가져오는 API 함수
const reactQueryFetchClass = async ({ queryKey }) => {
  const [,] = queryKey;
  const response = await handleClassGet({
    classTag: 'yoga',
    classDetail: true,
  });
  return response.data;
};

type ClassDataType = {
  title: string;
  content: string;
  info: string;
  imgPath: string;
  detailPath: string;
};

const YogaProgramPage = () => {
  const [classDataArr, setClassDataArr] = useState<ClassDataType[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassDataType>({
    title: '',
    content: 'Loading...',
    info: 'Loading...',
    imgPath: '',
    detailPath: '',
  });
  const agency = useRecoilValue(agencyClass);

  const searchParams = useSearchParams();
  const cName = searchParams ? searchParams.get('cName') : null;

  // React Query 데이터 가져오기
  const { data, isLoading, error } = useQuery(
    ['YogaProgram'], // Query Key
    reactQueryFetchClass, // Query Function
    {
      cacheTime: 10000, // 10초 동안 캐시 유지
      keepPreviousData: true, // 데이터를 가져오는 동안 기존 데이터 유지
      onSuccess: (data) => {
        if (data) {
          const tuningData = data.data?.map((el) => {
            return {
              title: el.kk_class_title,
              content: el.kk_class_content || '',
              info: el.kk_class_info || '',
              imgPath: el.kk_class_file_path || '',
              detailPath: el.kk_class_detail_path || '',
            };
          });
          setClassDataArr([...tuningData]);
        }
      },
      onError: (error) => {
        console.error(error);
        setClassDataArr(classDefaultArr);
      },
    }
  );

  // selectedClass 설정
  useEffect(() => {
    // cName Query 있는 경우
    if (cName) {
      setSelectedClass({
        ...classDataArr.filter((el) => el.title === cName)[0],
      });
    }
    // cName Query 없는 경우
    else if (classDataArr.length > 0) {
      setSelectedClass({ ...classDataArr[0] });
    }
  }, [classDataArr, cName]);

  return (
    <MainContainer>
      {/* 헤더 섹션 */}
      <ProgramHeaderSection
        programType={`요가`}
        description={`몸과 마음이 편안해지는 힐링요가클래스`}
        backImgUrl={`/src/Program_IMG/Yoga/Program_Header_Yoga_Background_IMG.png`}
      />
      {isLoading ? <LoadingModal isOpen={isLoading} /> : null}
      {error ? <p>Error...</p> : null}
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
          routePath={''}
        />
      </IntroSection>

      {/* 미들 섹션 */}
      <EduArtVideoComponent
        sectionData={{
          ...eduSectionData,
          features: classDataArr?.map((el) => el.title),
        }}
      />
      {/* 수업 Detail 섹션 */}
      <ProgramClassDetailSection
        detailImgPath={selectedClass?.detailPath}
        backImgPath={
          '/src/Program_IMG/Yoga/Program_ClassDetailSection_Background_IMG.png'
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
    padding: 0rem;
  }
`;

export default YogaProgramPage;
