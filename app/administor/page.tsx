'use client';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

import AdminTab from '@/component/Admin_Component/AdminTab';
import AdminDirectory from '@/component/Admin_Component/AdminDirectory';
import BoardCreate from '@/component/Board_Component/BoardCreate';
import AdminSchedulerBody from '@/component/Admin_Component/AdminSchedulerBody';
import Pagination from '@/component/Common_Component/Pagination';

import AdminTableTeacherBodyNew from '@/component/Admin_Component/AdminTableTeacherBodyNew';
import AdminTableAgencyBodyNew from '@/component/Admin_Component/AdminTableAgencyBodyNew';
import AdminTableReservationBodyNew from '@/component/Admin_Component/AdminTableReservationBodyNew';
import AdminTeacherTableAttendBodyNew from '@/component/Admin_Component/AdminTeacherTableAttendBodyNew';
import useLoginSessionCheck from '@/hook/useLoginSessionCheck';

const Administor = () => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [page, setPage] = useState<number>(-1);
  const [lastPageNum, setLastPageNum] = useState<number>(1);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useLoginSessionCheck({ requireLogin: true, requireAdmin: true });

  useEffect(() => {
    // localStorage 값으로 변경
    setActiveTab(localStorage.getItem('activeTab') || 'attend');
    setPage(Number(localStorage.getItem('page')) || 1);

    return () => {
      localStorage.removeItem('activeTab');
      localStorage.removeItem('page');
    };
  }, []);

  // 일반 조회 (탭 || 페이지)
  useEffect(() => {
    // page 값이 Default가 아닐 경우에만 실행
    if (page !== -1) {
      // 탭 변경 시 페이지 초기화
      if (localStorage.getItem('activeTab') !== activeTab) {
        setPage(1);
        localStorage.setItem('page', '1');
      }
      // 탭 저장
      localStorage.setItem('activeTab', activeTab);
    }
  }, [activeTab, page]);

  return (
    <MasterContainer>
      <MyPageContainer>
        <Header>{`관리자 페이지`}</Header>
        {/* 관리자 탭 */}
        <AdminTab activeTab={activeTab} handleTabClick={handleTabClick} />
        <TableContainer>
          {/* 수업출석 관리 */}
          {activeTab === 'attend' ? (
            <AdminTeacherTableAttendBodyNew
              activeTab={activeTab}
              page={page}
              setLastPageNum={setLastPageNum}
            />
          ) : null}
          {/* 강사회원 관리 */}
          {activeTab === 'teacher' ? (
            <AdminTableTeacherBodyNew
              activeTab={activeTab}
              page={page}
              setLastPageNum={setLastPageNum}
            />
          ) : null}
          {/* 기관회원 관리 */}
          {activeTab === 'agency' ? (
            <AdminTableAgencyBodyNew
              activeTab={activeTab}
              page={page}
              setLastPageNum={setLastPageNum}
            />
          ) : null}
          {/* 수업예약 관리 */}
          {activeTab === 'reservation' ? (
            <AdminTableReservationBodyNew
              activeTab={activeTab}
              page={page}
              setLastPageNum={setLastPageNum}
            />
          ) : null}
          {['music', 'video', 'class'].includes(activeTab) ? (
            <AdminDirectory activeTab={activeTab} />
          ) : null}
          {activeTab === 'notice' ? <BoardCreate /> : null}
          {activeTab === 'schedule' ? <AdminSchedulerBody /> : null}
        </TableContainer>
        {['teacher', 'agency', 'reservation', 'attend'].includes(activeTab) ? (
          <Pagination page={page} setPage={setPage} lastPageNum={lastPageNum} />
        ) : null}
      </MyPageContainer>
    </MasterContainer>
  );
};

// styled-component
const MasterContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: white;
  margin: 0 auto;
  padding-top: 2rem;
`;

const MyPageContainer = styled.div`
  width: 85%;
  margin: 0 auto;
  padding-top: 2rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Header = styled.div`
  background-color: #61b15a;
  color: white;

  padding: 2rem 4rem;
  border-radius: 30px;

  font-size: 2.2rem;
  font-family: Pretendard;
  font-weight: 700;
  text-align: left;
`;

const TableContainer = styled.div`
  margin-top: 2rem;

  display: flex;
  flex-direction: column;

  overflow-x: auto;

  @media (max-width: 768px) {
    justify-content: center;
    align-items: flex-start;
  }
`;

export default Administor;
