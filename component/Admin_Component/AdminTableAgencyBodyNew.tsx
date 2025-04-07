'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { handleSignupGet } from '@/fetchAPI/signupAPI';
import { useQuery } from 'react-query';

import AdminTableAgencyBodyRow from './AdminTableAgencyBodyRow';

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
  kk_agency_address: string;
  kk_agency_approve_status: number;
  kk_agency_created_at: string;
  kk_agency_file_path: string;
  kk_agency_idx: number;
  kk_agency_name: string;
  kk_agency_phoneNum: string;
  kk_agency_pwd: string;
  kk_agency_type: string;
  kk_agency_uid: string;
  kk_agency_updated_at: string;
  total_count: number;
};

const AdminTableAgencyBodyNew = ({ activeTab, page, setLastPageNum }) => {
  const [tableData, setTableData] = useState<TableDataType[]>([]);

  // React Query 데이터 가져오기
  const { data, isLoading, error } = useQuery(
    ['events', activeTab, page], // Query Key
    reactQueryFetchEvent, // Query Function
    {
      enabled: activeTab === 'agency', // 유효한 값일 때만 실행
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
    <Table>
      <thead>
        <tr>
          <TableHeader>기관 번호</TableHeader>
          <TableHeader>기관 계정정보</TableHeader>
          <TableHeader>기관명</TableHeader>
          <TableHeader>기관 주소</TableHeader>
          <TableHeader>연락처</TableHeader>
          <TableHeader>기관 유형</TableHeader>
          <TableHeader>승인 여부</TableHeader>
          <TableHeader>관리자 옵션</TableHeader>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data) => (
          <AdminTableAgencyBodyRow key={JSON.stringify(data)} data={data} />
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

export default AdminTableAgencyBodyNew;
