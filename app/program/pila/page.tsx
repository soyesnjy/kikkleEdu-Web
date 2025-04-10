import { Suspense } from 'react';
import ProgramPageContent from '@/component/Program_Componet/Content/ProgramPageContent';
import ProgramLoading from '@/app/loading';

export default function Page() {
  return (
    <Suspense fallback={<ProgramLoading />}>
      <ProgramPageContent
        id={'pila'}
        headerData={{
          programType: '필라테스',
          description: '매트에서 할 수 있는 다양한 필라테스 클래스',
          backImgUrl:
            '/src/Program_IMG/Pila/Program_Header_Pila_Background_IMG.png',
        }}
        eduSectionData={{
          title: '필라테스',
          content: '연령에 맞춘 매트필라테스 프로그램 제공',
          features: ['성인필라테스'],
          youtubeUrl: '//www.youtube.com/embed/PM87DgX6yD8',
        }}
        backImgPath={
          '/src/Program_IMG/Pila/Program_ClassDetailSection_Background_IMG.png'
        }
      />
    </Suspense>
  );
}
