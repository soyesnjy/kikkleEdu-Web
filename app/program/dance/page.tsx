import { Suspense } from 'react';
import DanceProgramPageContent from '@/component/Program_Componet/Content/DanceProgramPageContent';
import ProgramLoading from '@/app/loading';

export default function Page() {
  return (
    <Suspense fallback={<ProgramLoading />}>
      <DanceProgramPageContent />
    </Suspense>
  );
}
