import { Suspense } from 'react';
import ProgramPageContent from '@/component/Program_Componet/Content/ProgramPageContent';
import ProgramLoading from '@/app/loading';

export default function Page() {
  return (
    <Suspense fallback={<ProgramLoading />}>
      <ProgramPageContent
        id={'ballet'}
        headerData={{
          programType: '발레',
          description: '소예키즈만의 특화된 다양한 발레클래스',
          backImgUrl:
            '/src/Program_IMG/Ballet/Program_Header_Ballet_Background_IMG.png',
        }}
        eduSectionData={{
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
        }}
        backImgPath={
          '/src/Program_IMG/Ballet/Program_ClassDetailSection_Background_IMG.png'
        }
      />
    </Suspense>
  );
}
