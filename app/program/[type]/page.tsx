// app/program/[type]/page.tsx
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import ProgramPageContent from '@/component/Program_Componet/Content/ProgramPageContent';
import ProgramLoading from '@/app/loading';
import { programMetaMap } from '@/constants/programMeta';

export default function Page({ params }: { params: { type: string } }) {
  const config = programMetaMap[params.type];

  if (!config) redirect('/program'); // 없는 type이면 index로 리다이렉트

  return (
    <Suspense fallback={<ProgramLoading />}>
      <ProgramPageContent {...config} />
    </Suspense>
  );
}
