import { Suspense } from 'react';
import ProgramPageContent from '@/component/Program_Componet/Content/ProgramPageContent';
import ProgramLoading from '@/app/loading';

export default function Page() {
  return (
    <Suspense fallback={<ProgramLoading />}>
      <ProgramPageContent
        id={'art'}
        headerData={{
          programType: '미술',
          description: '창의력향상을 위한 즐거운 미술클래스',
          backImgUrl:
            '/src/Program_IMG/Art/Program_Header_Art_Background_IMG.png',
        }}
        eduSectionData={{
          title: '미술 교육',
          content: '아동의 연령에 맞춘 재미있는 미술프로그램 제공합니다.',
          features: ['원데이클래스'], // default features
          youtubeUrl: '//www.youtube.com/embed/DvS_6HkBpY4',
        }}
        backImgPath={
          '/src/Program_IMG/Art/Program_ClassDetailSection_Background_IMG.png'
        }
      />
    </Suspense>
  );
}
