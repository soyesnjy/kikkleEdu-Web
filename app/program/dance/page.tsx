import { Suspense } from 'react';
import ProgramPageContent from '@/component/Program_Componet/Content/ProgramPageContent';
import ProgramLoading from '@/app/loading';

export default function Page() {
  return (
    <Suspense fallback={<ProgramLoading />}>
      <ProgramPageContent
        id={'dance'}
        headerData={{
          programType: '댄스',
          description: '신나는 음악에 맞춰 자유롭게 표현하는 KPOP댄스 클래스',
          backImgUrl:
            '/src/Program_IMG/Dance/Program_Header_Dance_Background_IMG.png',
        }}
        eduSectionData={{
          title: '댄스',
          content:
            '신나는 댄스와 율동프로그램과 기관에서 원하는 형태의 프로그램 제공',
          features: ['댄스작품반', 'kpop 소예 방송댄스'],
          youtubeUrl: '//www.youtube.com/embed/Cb0jnKtZP4o',
        }}
        backImgPath={
          '/src/Program_IMG/Dance/Program_ClassDetailSection_Background_IMG.png'
        }
      />
    </Suspense>
  );
}
