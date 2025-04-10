import { Suspense } from 'react';
import PilaProgramPageContent from '@/component/Program_Componet/Content/PilaProgramPageContent';
import ProgramLoading from '@/app/loading';

export default function Page() {
  return (
    <Suspense fallback={<ProgramLoading />}>
      <PilaProgramPageContent />
    </Suspense>
  );
}
