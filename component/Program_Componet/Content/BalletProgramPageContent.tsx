'use client';
import { agencyClass } from '@/store/state';
import { useRecoilValue } from 'recoil';
import { useProgramClass } from '@/hook/useProgramClass';

import ProgramHeaderSection from '@/component/Program_Componet/ProgramHeaderSection';
import ProgramMiddleCategorySection from '@/component/Program_Componet/ProgramMiddleCategorySection';
import LessonSection from '@/component/Home_Component/LessonSection';
import EduArtVideoComponent from '@/component/Home_Component/EduArtVideoComponent';
import ProgramClassDetailSection from '@/component/Program_Componet/ProgramClassDetailSection';
import EndSection from '@/component/Home_Component/EndSection';
import LoadingModal from '@/component/Common_Component/LoadingModal';

const eduSectionData = {
  title: '발레 교육',
  content:
    '소예키즈만의 특화된 발레프로그램과 기관이 원하는 형태의 프로그램 제공',
  features: [
    '스토리발레 (창의발레)',
    '작품반 발레',
    '체험형 원데이',
    '세계의 춤',
  ], // default features
  youtubeUrl: '//www.youtube.com/embed/-n3X-_FmRk8',
};

const BalletProgramPageContent = () => {
  const agency = useRecoilValue(agencyClass);
  const { classDataArr, selectedClass, setSelectedClass, isLoading, error } =
    useProgramClass('ballet');

  return (
    <>
      {/* 헤더 섹션 */}
      <ProgramHeaderSection
        programType={`발레`}
        description={`소예키즈만의 특화된 다양한 발레클래스`}
        backImgUrl={`/src/Program_IMG/Ballet/Program_Header_Ballet_Background_IMG.png`}
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
      <LessonSection
        title={selectedClass?.title || ''}
        subtitle={selectedClass?.content || ''}
        imgUrl={selectedClass?.imgPath || '/src/soyesKids_Logo.png'}
        type="program"
        info={selectedClass?.info || ''}
        routePath={''}
      />

      {/* 미들 섹션 - 영상 */}
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
          '/src/Program_IMG/Ballet/Program_ClassDetailSection_Background_IMG.png'
        }
      />

      {/* 엔드 섹션 */}
      <EndSection
        Title={`For our child's healthy body \n and heart happiness`}
        btnTitle={`예약하기`}
        routePath={agency ? `/reservation` : `/signup`}
      />
    </>
  );
};

export default BalletProgramPageContent;
