import { Suspense } from 'react';
import ArtProgramPageContent from '@/component/Program_Componet/Content/ArtProgramPageContent';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArtProgramPageContent />
    </Suspense>
  );
}
