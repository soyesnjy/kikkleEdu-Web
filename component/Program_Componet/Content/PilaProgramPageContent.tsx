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
  title: '필라테스',
  content: '연령에 맞춘 매트필라테스 프로그램 제공',
  features: ['성인필라테스'], // default features
  youtubeUrl: '//www.youtube.com/embed/PM87DgX6yD8',
};

const PilaProgramPageContent = () => {
  const agency = useRecoilValue(agencyClass);
  const { classDataArr, selectedClass, setSelectedClass, isLoading, error } =
    useProgramClass('pila');

  return (
    <>
      {/* 헤더 섹션 */}
      <ProgramHeaderSection
        programType={`필라테스`}
        description={`매트에서 할 수 있는 다양한 필라테스 클래스`}
        backImgUrl={`/src/Program_IMG/Pila/Program_Header_Pila_Background_IMG.png`}
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
          '/src/Program_IMG/Pila/Program_ClassDetailSection_Background_IMG.png'
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

export default PilaProgramPageContent;
