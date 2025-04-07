'use client';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { handleSignupGet } from '@/fetchAPI/signupAPI';
import { handleReservationGet } from '@/fetchAPI/reservationAPI';
import { handleMypageTeacherAttendGet } from '@/fetchAPI/mypageAPI';

import AdminTab from '@/component/Admin_Component/AdminTab';
import AdminTableTeacherBody from '@/component/Admin_Component/AdminTableTeacherBody';
import AdminTableAgencyBody from '@/component/Admin_Component/AdminTableAgencyBody';
import AdminTableReservationBody from '@/component/Admin_Component/AdminTableReservationBody';
import TeacherTableAttendBody from '@/component/MyPage_Component/Teacher/TeacherTableAttendBody';
import AdminDirectory from '@/component/Admin_Component/AdminDirectory';
import BoardCreate from '@/component/Board_Component/BoardCreate';
import AdminSchedulerBody from '@/component/Admin_Component/AdminSchedulerBody';
import Pagination from '@/component/Common_Component/Pagination';
import AdminTableTeacherBodyNew from '@/component/Admin_Component/AdminTableTeacherBodyNew';

const Administor = () => {
  const [activeTab, setActiveTab] = useState('');
  const [tableData, setTableData] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(-1);
  const [lastPageNum, setLastPageNum] = useState(1);

  const router = useRouter();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // 관리자 권한이 없을 경우 메인페이지로 이동
    if (
      localStorage.getItem('log') === null ||
      localStorage.getItem('agencyType') === null ||
      localStorage.getItem('agencyType') !== 'admin'
    ) {
      // console.log(localStorage.getItem('log'));
      router.replace('/');
      return;
    }

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
      // 강사 승인 요청 관리
      if (activeTab === 'teacher') {
        handleSignupGet({ userClass: activeTab, name, pageNum: page })
          .then((res) => res.data)
          .then((data) => {
            if (data === undefined) return;
            setTableData([...data.data]);
            setLastPageNum(data.lastPageNum);
          });
      }
      // 기관 승인 요청 관리
      else if (activeTab === 'agency') {
        handleSignupGet({ userClass: activeTab, pageNum: page })
          .then((res) => res.data)
          .then((data) => {
            if (data === undefined) return;
            setTableData([...data.data]);
            setLastPageNum(data.lastPageNum);
          });
      }
      // 기관 예약 요청 관리
      else if (activeTab === 'reservation') {
        handleReservationGet({
          userClass: activeTab,
          date: name,
          pageNum: page,
        })
          .then((res) => res.data)
          .then((data) => {
            if (data === undefined) return;
            setTableData([...data.data]);
            setLastPageNum(data.lastPageNum);
          });
      }
      // 강사 출석 현황
      else if (activeTab === 'attend') {
        handleMypageTeacherAttendGet({
          // adminIdx: localStorage.getItem('userIdx'),
          name,
          pageNum: page,
        })
          .then((res) => res.data)
          .then((data) => {
            setTableData([...data.data]);
            setLastPageNum(data.lastPageNum);
          });
      }
      // 스케줄러 예외처리
      else if (activeTab === 'schedule') {
        // console.log(`activeTab === 'schedule'`);
      }
      // 탭 변경 시 페이지 초기화
      if (localStorage.getItem('activeTab') !== activeTab) {
        setPage(1);
        localStorage.setItem('page', 1);
      }
      // 탭 저장
      localStorage.setItem('activeTab', activeTab);
    }
  }, [activeTab, page]);

  // 검색 조회 (디바운싱 적용)
  // useEffect(() => {
  //   const debounce = setTimeout(() => {
  //     if (activeTab === 'teacher') {
  //       handleSignupGet({ userClass: activeTab, name, pageNum: page })
  //         .then((res) => res.data)
  //         .then((data) => {
  //           setTableData(data.data);
  //         });
  //     } else if (activeTab === 'agency') {
  //       handleSignupGet({ userClass: activeTab, name, pageNum: page })
  //         .then((res) => res.data)
  //         .then((data) => {
  //           setTableData(data.data);
  //         });
  //     } else if (activeTab === 'reservation') {
  //       handleReservationGet({
  //         userClass: activeTab,
  //         date: name,
  //         pageNum: page,
  //       })
  //         .then((res) => res.data)
  //         .then((data) => {
  //           console.log(data);
  //           setTableData(data.data);
  //         });
  //     } else if (activeTab === 'attend') {
  //       handleMypageTeacherAttendGet({
  //         // userIdx: localStorage.getItem('userIdx'),
  //         name,
  //         pageNum: page,
  //       })
  //         .then((res) => res.data)
  //         .then((data) => {
  //           console.log(data);
  //           setTableData(data.data);
  //           setLastPageNum(data.lastPageNum);
  //         });
  //     }
  //   }, 350);

  //   return () => {
  //     clearTimeout(debounce);
  //   };
  // }, [name]);

  return (
    <MasterContainer>
      <MyPageContainer>
        <Header>{`관리자 페이지`}</Header>
        {/* 관리자 탭 */}
        <AdminTab activeTab={activeTab} handleTabClick={handleTabClick} />
        {/* <input value={name} onChange={(e) => setName(e.target.value)} /> */}
        <TableContainer>
          <Table>
            {/* Table Header */}
            {activeTab === 'teacher' && (
              <thead>
                <tr>
                  <TableHeader>강사번호</TableHeader>
                  <TableHeader>강사 계정정보</TableHeader>
                  <TableHeader>강사명</TableHeader>
                  <TableHeader>강사 소개</TableHeader>
                  <TableHeader>연락처</TableHeader>
                  <TableHeader>프로필 사진</TableHeader>
                  <TableHeader>희망 지역</TableHeader>
                  <TableHeader>희망 요일</TableHeader>
                  <TableHeader>희망 시간대</TableHeader>
                  <TableHeader>경력</TableHeader>
                  <TableHeader>학력</TableHeader>
                  <TableHeader>첨부 자료</TableHeader>
                  <TableHeader>승인 여부</TableHeader>
                  <TableHeader>관리자 옵션</TableHeader>
                </tr>
              </thead>
            )}
            {activeTab === 'agency' && (
              <thead>
                <tr>
                  <TableHeader>기관 번호</TableHeader>
                  <TableHeader>기관 계정정보</TableHeader>
                  <TableHeader>기관명</TableHeader>
                  <TableHeader>기관 주소</TableHeader>
                  <TableHeader>연락처</TableHeader>
                  <TableHeader>기관 유형</TableHeader>
                  {/* <TableHeader>기관 첨부자료</TableHeader> */}
                  <TableHeader>승인 여부</TableHeader>
                  <TableHeader>관리자 옵션</TableHeader>
                </tr>
              </thead>
            )}
            {activeTab === 'reservation' && (
              <thead>
                <tr>
                  <TableHeader>예약번호</TableHeader>
                  <TableHeader>기관명</TableHeader>
                  <TableHeader>기관 연락처</TableHeader>
                  <TableHeader>수업명</TableHeader>
                  <TableHeader>날짜</TableHeader>
                  <TableHeader>수업 강사</TableHeader>
                  <TableHeader>수업 요일</TableHeader>
                  <TableHeader>수업 시간대</TableHeader>
                  {/* <TableHeader>결제여부</TableHeader> */}
                  <TableHeader>승인 여부</TableHeader>
                  <TableHeader>관리자 옵션</TableHeader>
                </tr>
              </thead>
            )}
            {activeTab === 'attend' && (
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
            )}
            {/* Table Body */}
            {activeTab === 'teacher' && (
              <AdminTableTeacherBodyNew
                activeTab={activeTab}
                page={page}
                setLastPageNum={setLastPageNum}
              />
            )}
            {activeTab === 'agency' && (
              <tbody>
                {tableData.map((data) => (
                  <AdminTableAgencyBody
                    key={JSON.stringify(data)}
                    data={data}
                  />
                ))}
              </tbody>
            )}
            {activeTab === 'reservation' && (
              <tbody>
                {tableData.map((data) => (
                  <AdminTableReservationBody
                    key={JSON.stringify(data)}
                    data={data}
                  />
                ))}
              </tbody>
            )}
            {activeTab === 'attend' && (
              <tbody>
                {tableData.map((data) => (
                  <TeacherTableAttendBody
                    key={JSON.stringify(data)}
                    data={data}
                    page={undefined}
                  />
                ))}
              </tbody>
            )}
          </Table>
          {['music', 'video', 'class'].includes(activeTab) && (
            <AdminDirectory activeTab={activeTab} />
          )}
          {activeTab === 'notice' && <BoardCreate />}
          {activeTab === 'schedule' && <AdminSchedulerBody />}
        </TableContainer>
        {['teacher', 'agency', 'reservation', 'attend'].includes(activeTab) && (
          <Pagination page={page} setPage={setPage} lastPageNum={lastPageNum} />
        )}
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

export default Administor;
