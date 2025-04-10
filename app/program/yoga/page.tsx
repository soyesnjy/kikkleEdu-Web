import { Suspense } from 'react';
import ProgramPageContent from '@/component/Program_Componet/Content/ProgramPageContent';
import ProgramLoading from '@/app/loading';

export default function Page() {
  return (
    <Suspense fallback={<ProgramLoading />}>
      <ProgramPageContent
        id={'yoga'}
        headerData={{
          programType: '요가',
          description: '몸과 마음이 편안해지는 힐링요가클래스',
          backImgUrl:
            '/src/Program_IMG/Yoga/Program_Header_Yoga_Background_IMG.png',
        }}
        eduSectionData={{
          title: '요가',
          content: '연령에 맞춘 요가 프로그램 제공',
          features: ['성인요가'],
          youtubeUrl: '//www.youtube.com/embed/ZpzJoTx1fKY',
        }}
        backImgPath={
          '/src/Program_IMG/Yoga/Program_ClassDetailSection_Background_IMG.png'
        }
      />
    </Suspense>
  );
}
