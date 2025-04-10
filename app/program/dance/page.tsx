import { Suspense } from 'react';
import DanceProgramPageContent from '@/component/Program_Componet/Content/DanceProgramPageContent';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DanceProgramPageContent />
    </Suspense>
  );
}
