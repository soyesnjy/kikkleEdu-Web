import { Suspense } from 'react';
import ArtProgramPageContent from '@/component/Program_Componet/Content/ArtProgramPageContent';
import ProgramLoading from '@/app/loading';

export default function Page() {
  return (
    <Suspense fallback={<ProgramLoading />}>
      <ArtProgramPageContent />
    </Suspense>
  );
}
