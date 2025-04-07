'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { handleMypageTeacherAttendGet } from '@/fetchAPI/mypageAPI';
import { useQuery } from 'react-query';

import AdminTeacherTableAttendBodyRow from './AdminTeacherTableAttendBodyRow';

// React Query - 서버에서 데이터를 가져오는 API 함수
const reactQueryFetchEvent = async ({ queryKey }) => {
  const [, page] = queryKey;
  const response = await handleMypageTeacherAttendGet({
    pageNum: page,
  });
  return response.data;
};

type TableDataType = {
  kk_agency_name: string;
  kk_attend_date: string;
  kk_attend_idx: number;
  kk_attend_status: number;
  kk_class_title: string;
  kk_reservation_time: string;
  kk_teacher_name: string;
  kk_teacher_phoneNum: string;
  total_count: number;
};

const AdminTeacherTableAttendBodyNew = ({
  activeTab,
  page,
  setLastPageNum,
}) => {
  const [tableData, setTableData] = useState<TableDataType[]>([]);

  // React Query 데이터 가져오기
  const { data, isLoading, error } = useQuery(
    ['events', page], // Query Key
    reactQueryFetchEvent, // Query Function
    {
      enabled: activeTab === 'attend', // 유효한 값일 때만 실행
      staleTime: 5000, // 5초 동안 신선한 상태 유지
      cacheTime: 10000, // 10초 동안 캐시 유지
      keepPreviousData: true, // 데이터를 가져오는 동안 기존 데이터 유지
    }
  );

  // 가져온 서버 데이터를 상태에 반영
  useEffect(() => {
    if (data) {
      if (data === undefined) return;
      setTableData([...data.data]);
      setLastPageNum(data.lastPageNum);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>수업 타이틀</TableHeader>
          <TableHeader>기관명</TableHeader>
          <TableHeader>수업 강사</TableHeader>
          <TableHeader>날짜</TableHeader>
          <TableHeader>수업 요일</TableHeader>
          <TableHeader>수업 시간대</TableHeader>
          <TableHeader>출근 현황</TableHeader>
          <TableHeader></TableHeader>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data) => (
          <AdminTeacherTableAttendBodyRow
            key={JSON.stringify(data)}
            data={data}
          />
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #61b15a;
  padding: 1rem;
  color: #61b15a;

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 1rem 0rem;
    padding-left: 0.5rem;
    text-align: center;
  }
`;

export default AdminTeacherTableAttendBodyNew;
