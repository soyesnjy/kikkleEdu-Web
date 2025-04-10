import { Suspense } from 'react';
import BalletProgramPageContent from '@/component/Program_Componet/Content/BalletProgramPageContent';
import ProgramLoading from '@/app/loading';

export default function Page() {
  return (
    <Suspense fallback={<ProgramLoading />}>
      <BalletProgramPageContent />
    </Suspense>
  );
}
