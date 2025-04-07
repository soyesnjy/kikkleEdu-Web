'use client';
import React, { useEffect, useState } from 'react';
import { handleSignupGet } from '@/fetchAPI/signupAPI';
import { useQuery } from 'react-query';

import AdminTableTeacherBodyRow from './AdminTableTeacherBodyRow';

// React Query - 서버에서 데이터를 가져오는 API 함수
const reactQueryFetchEvent = async ({ queryKey }) => {
  const [, activeTab, page] = queryKey;
  const response = await handleSignupGet({
    userClass: activeTab,
    pageNum: page,
  });
  return response.data;
};
type TableDataType = {
  kk_teacher_approve_status: number;
  kk_teacher_created_at: string;
  kk_teacher_dayofweek: string;
  kk_teacher_education: string;
  kk_teacher_file_path: string;
  kk_teacher_history: string;
  kk_teacher_name: string;
  kk_teacher_updated_at: string;
};

const AdminTableTeacherBodyNew = ({ activeTab, page, setLastPageNum }) => {
  const [tableData, setTableData] = useState<TableDataType[]>([]);

  // React Query 데이터 가져오기
  const { data, isLoading, error } = useQuery(
    ['events', activeTab, page], // Query Key
    reactQueryFetchEvent, // Query Function
    {
      enabled: activeTab === 'teacher', // 유효한 값일 때만 실행
      staleTime: 5000, // 5초 동안 신선한 상태 유지
      cacheTime: 10000, // 10초 동안 캐시 유지
      keepPreviousData: true, // 데이터를 가져오는 동안 기존 데이터 유지
    }
  );

  // 가져온 서버 데이터를 상태에 반영
  useEffect(() => {
    if (data) {
      setTableData([...data.data]);
      setLastPageNum(data.lastPageNum);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <tbody>
      {tableData.map((data) => (
        <AdminTableTeacherBodyRow key={JSON.stringify(data)} data={data} />
      ))}
    </tbody>
  );
};

export default AdminTableTeacherBodyNew;
