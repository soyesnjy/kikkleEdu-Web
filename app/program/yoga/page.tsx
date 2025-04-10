import { Suspense } from 'react';
import YogaProgramPageContent from '@/component/Program_Componet/Content/YogaProgramPageContent';
import ProgramLoading from '@/app/loading';

export default function Page() {
  return (
    <Suspense fallback={<ProgramLoading />}>
      <YogaProgramPageContent />
    </Suspense>
  );
}
