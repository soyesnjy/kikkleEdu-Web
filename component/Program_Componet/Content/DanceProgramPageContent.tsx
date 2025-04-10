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
  title: '댄스',
  content: '신나는 댄스와 율동프로그램과 기관에서 원하는 형태의 프로그램 제공',
  features: ['댄스작품반', 'kpop 소예 방송댄스'], // default features
  youtubeUrl: '//www.youtube.com/embed/Cb0jnKtZP4o',
};

const DanceProgramPageContent = () => {
  const agency = useRecoilValue(agencyClass);
  const { classDataArr, selectedClass, setSelectedClass, isLoading, error } =
    useProgramClass('dance');

  return (
    <>
      {/* 헤더 섹션 */}
      <ProgramHeaderSection
        programType={`댄스`}
        description={`신나는 음악에 맞춰 자유롭게 표현하는 KPOP댄스 클래스`}
        backImgUrl={`/src/Program_IMG/Dance/Program_Header_Dance_Background_IMG.png`}
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
          '/src/Program_IMG/Dance/Program_ClassDetailSection_Background_IMG.png'
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

export default DanceProgramPageContent;
