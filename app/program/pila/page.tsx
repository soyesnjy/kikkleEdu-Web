import { Suspense } from 'react';
import PilaProgramPageContent from '@/component/Program_Componet/Content/PilaProgramPageContent';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PilaProgramPageContent />
    </Suspense>
  );
}
