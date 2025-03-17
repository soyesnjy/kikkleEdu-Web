/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  handleMypageAgencyReservationGet,
  handleMypageTeacherAttendGet,
} from '@/fetchAPI/mypageAPI';
import { useQuery } from 'react-query';

import useLoginSessionCheck from '@/hook/useLoginSessionCheck';

import AgencyTab from '@/component/MyPage_Component/Agency/AgencyTab';
import AgencyTableReservationBody from '@/component/MyPage_Component/Agency/AgencyTableReservationBody';
import AgencyTableAttendBody from '@/component/MyPage_Component/Agency/AgencyTableAttendBody';
import AgencyTablePrivacyBody from '@/component/MyPage_Component/Agency/AgencyTablePrivacyBody';
import Directory from '@/component/Music_Component/Directory';
import Pagination from '@/component/Common_Component/Pagination';

const agencyTypeArr = [
  '유치원',
  '초등학교',
  '문화센터',
  '커뮤니티센터',
  '아동복지센터',
];

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('');
  const [page, setPage] = useState(1);

  const router = useRouter();
  useLoginSessionCheck(); // 로그인 여부 확인

  // Tab Click Handler
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  // Reservation Request Method
  const fetchReservationData = async () => {
    const userIdx = localStorage.getItem('userIdx');
    const res = await handleMypageAgencyReservationGet({
      userIdx,
      pageNum: page,
    });
    return res.data;
  };
  // Teacher Request Method
  const fetchInstructorData = async () => {
    const agencyIdx = localStorage.getItem('userIdx');
    const res = await handleMypageTeacherAttendGet({
      agencyIdx,
      pageNum: page,
    });
    return res.data;
  };

  // useQuery 적용
  const {
    data: reservationData,
    isLoading: isLoadingReservation,
    error: errorReservation,
  } = useQuery({
    queryKey: ['reservationData', page], // 페이지가 변경될 때마다 refetch
    queryFn: fetchReservationData,
    enabled: activeTab === 'reservation', // 해당 탭에서만 호출
  });

  const {
    data: instructorData,
    isLoading: isLoadingInstructor,
    error: errorInstructor,
  } = useQuery({
    queryKey: ['instructorData', page],
    queryFn: fetchInstructorData,
    enabled: activeTab === 'instructor',
  });

  // 테이블 데이터와 마지막 페이지 번호 업데이트
  const tableData =
    activeTab === 'reservation' ? reservationData?.data : instructorData?.data;
  const lastPageNum =
    activeTab === 'reservation'
      ? reservationData?.lastPageNum
      : instructorData?.lastPageNum;

  useEffect(() => {
    // 강사 로그인 시 진입 제한 + 강제 이동
    const agencyType = localStorage.getItem('agencyType');
    if (!agencyTypeArr.includes(agencyType)) {
      router.replace('/mypage/teacher');
      return;
    }
    // activeTab 설정
    if (localStorage.getItem('activeTab'))
      setActiveTab(localStorage.getItem('activeTab'));
    else setActiveTab('reservation');

    return () => {
      localStorage.removeItem('activeTab');
    };
  }, []);

  // 일반 조회 (탭 || 페이지)
  // useEffect(() => {
  //   if (activeTab === 'reservation') {
  //     handleMypageAgencyReservationGet({
  //       userIdx: localStorage.getItem('userIdx'),
  //       pageNum: page,
  //     })
  //       .then((res) => res.data)
  //       .then((data) => {
  //         // console.log(data);
  //         setTableData(data.data);
  //         setLastPageNum(data.lastPageNum);
  //       })
  //       .catch((err) => console.log(err));
  //   } else if (activeTab === 'instructor') {
  //     handleMypageTeacherAttendGet({
  //       agencyIdx: localStorage.getItem('userIdx'),
  //       pageNum: page,
  //     })
  //       .then((res) => res.data)
  //       .then((data) => {
  //         // console.log(data);
  //         setTableData(data.data);
  //         setLastPageNum(data.lastPageNum);
  //       })
  //       .catch((err) => console.log(err));
  //   }

  //   if (localStorage.getItem('activeTab') !== activeTab) setPage(1); // 탭 변경 시 페이지 초기화
  //   localStorage.setItem('activeTab', activeTab);
  // }, [activeTab, page]);

  return (
    <MasterContainer>
      <MyPageContainer>
        <Header>{`마이페이지 - 기관`}</Header>
        <AgencyTab activeTab={activeTab} handleTabClick={handleTabClick} />
        {activeTab === 'reservation' && isLoadingReservation && (
          <p>Loading...</p>
        )}
        {activeTab === 'instructor' && isLoadingInstructor && (
          <p>Loading....</p>
        )}
        {activeTab === 'reservation' && errorReservation && <p>Error!</p>}
        {activeTab === 'instructor' && errorInstructor && <p>Error!!</p>}
        <TableContainer>
          <Table>
            {/* Table Header */}
            {activeTab === 'reservation' && (
              <thead>
                <tr>
                  <TableHeader>{`타이틀`}</TableHeader>
                  <TableHeader>{`강사`}</TableHeader>
                  <TableHeader>{`날짜`}</TableHeader>
                  <TableHeader>{`연락처`}</TableHeader>
                  <TableHeader>{`승인 여부`}</TableHeader>
                  <TableHeader>{`결제 여부`}</TableHeader>
                </tr>
              </thead>
            )}
            {activeTab === 'instructor' && (
              <thead>
                <tr>
                  <TableHeader>{`타이틀`}</TableHeader>
                  <TableHeader>{`강사`}</TableHeader>
                  <TableHeader>{`날짜`}</TableHeader>
                  <TableHeader>{`요일`}</TableHeader>
                  <TableHeader>{`시간대`}</TableHeader>
                  <TableHeader>{`연락처`}</TableHeader>
                  <TableHeader>{`출석 여부`}</TableHeader>
                </tr>
              </thead>
            )}
            {/* Table Body */}
            {activeTab === 'reservation' && (
              <tbody>
                {tableData?.map((data, index) => (
                  <AgencyTableReservationBody key={index} data={data} />
                ))}
              </tbody>
            )}
            {activeTab === 'instructor' && (
              <tbody>
                {tableData?.map((data, index) => (
                  <AgencyTableAttendBody key={index} data={data} />
                ))}
              </tbody>
            )}
          </Table>
          {activeTab === 'privacy' && <AgencyTablePrivacyBody />}
          {activeTab === 'class' && <Directory activeTab={activeTab} />}
        </TableContainer>
        {(activeTab === 'reservation' || activeTab === 'instructor') && (
          <Pagination page={page} setPage={setPage} lastPageNum={lastPageNum} />
        )}
      </MyPageContainer>
    </MasterContainer>
  );
};

// styled-component의 animation 설정 방법 (keyframes 메서드 사용)
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

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const TableContainer = styled.div`
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

export default MyPage;
