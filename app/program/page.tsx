import { Suspense } from 'react';
import BalletProgramPageContent from '@/component/Program_Componet/Content/BalletProgramPageContent';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BalletProgramPageContent />
    </Suspense>
  );
}
