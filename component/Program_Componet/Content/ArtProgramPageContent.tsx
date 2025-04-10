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
  title: '미술 교육',
  content: '아동의 연령에 맞춘 재미있는 미술프로그램 제공합니다.',
  features: ['원데이클래스'], // default features
  youtubeUrl: '//www.youtube.com/embed/DvS_6HkBpY4',
};

const ArtProgramPageContent = () => {
  const agency = useRecoilValue(agencyClass);
  const { classDataArr, selectedClass, setSelectedClass, isLoading, error } =
    useProgramClass('art');

  return (
    <>
      {/* 헤더 섹션 */}
      <ProgramHeaderSection
        programType={`미술`}
        description={`창의력향상을 위한 즐거운 미술클래스`}
        backImgUrl={`/src/Program_IMG/Art/Program_Header_Art_Background_IMG.png`}
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
          '/src/Program_IMG/Art/Program_ClassDetailSection_Background_IMG.png'
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

export default ArtProgramPageContent;
