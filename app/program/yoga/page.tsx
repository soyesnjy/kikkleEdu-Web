import { Suspense } from 'react';
import YogaProgramPageContent from '@/component/Program_Componet/Content/YogaProgramPageContent';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <YogaProgramPageContent />
    </Suspense>
  );
}
