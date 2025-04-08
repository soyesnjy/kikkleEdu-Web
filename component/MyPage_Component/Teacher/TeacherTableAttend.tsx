/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from 'react';
import styled from 'styled-components';

import { handleMypageTeacherAttendGet } from '@/fetchAPI/mypageAPI';
import { useQuery } from 'react-query';

import LoadingModal from '@/component/Common_Component/LoadingModal';
import TeacherTableAttendBody from '@/component/MyPage_Component/Teacher/TeacherTableAttendBody';
import Pagination from '@/component/Common_Component/Pagination';

type TeacherAttendType = {
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

const TeacherTableAttend = () => {
  const [page, setPage] = useState(1);

  // 출석 데이터 요청 함수
  const fetchAttendData = async () => {
    const userIdx = localStorage.getItem('userIdx');
    const res = await handleMypageTeacherAttendGet({ userIdx, pageNum: page });
    return res.data;
  };

  // useQuery 적용
  const {
    data: attendData,
    isLoading,
    error,
  } = useQuery(['attendData', page], fetchAttendData, {
    staleTime: 5000, // 5초 동안 신선한 상태 유지
    cacheTime: 10000, // 10초 동안 캐시 유지
    onError: (error) => {
      console.error(error);
    },
  });

  // 테이블 데이터와 마지막 페이지 번호 업데이트
  const tableData: TeacherAttendType[] | undefined = useMemo(
    () => attendData?.data,
    [attendData]
  );
  const lastPageNum: number | undefined = useMemo(
    () => attendData?.lastPageNum,
    [attendData]
  );

  if (isLoading) return <LoadingModal isOpen={isLoading} />;
  if (error) return <div>Error...</div>;

  return (
    <TabContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>{`수업명`}</TableHeader>
            <TableHeader>{`기관명`}</TableHeader>
            <TableHeader>{`강사`}</TableHeader>
            <TableHeader>{`날짜`}</TableHeader>
            <TableHeader>{`요일`}</TableHeader>
            <TableHeader>{`시간대`}</TableHeader>
            <TableHeader>{`출근 현황`}</TableHeader>
            <TableHeader></TableHeader>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((data, index) => (
            <TeacherTableAttendBody key={index} data={data} page={page} />
          ))}
        </tbody>
      </Table>
      <Pagination page={page} setPage={setPage} lastPageNum={lastPageNum} />
    </TabContainer>
  );
};

// styled-component의 animation 설정 방법 (keyframes 메서드 사용)
const TabContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow-x: auto;

  @media (max-width: 768px) {
  }
`;

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

  font-size: 1rem;
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

export default TeacherTableAttend;
