/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  handleMypageAgencyReservationGet,
  handleMypageTeacherAttendGet,
} from '@/fetchAPI/mypageAPI';

// import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AgencyTableReservationBody from '@/component/MyPage_Component/Agency/AgencyTableReservationBody';
import AgencyTableAttendBody from '@/component/MyPage_Component/Agency/AgencyTableAttendBody';
import Pagination from '@/component/Common_Component/Pagination';

const dummyTableData = [
  {
    title: '○○수업',
    instructor: '김하나',
    date: '2024-07-01 ~ 2024-08-01',
    contact: '010-0000-0000',
    paymentStatus: '결제 완료',
  },
  {
    title: '○○수업',
    instructor: '김하나',
    date: '2024-07-01 ~ 2024-08-01',
    contact: '010-0000-0000',
    paymentStatus: '결제 전',
  },
  // 추가 데이터
];

const agencyTypeArr = [
  '유치원',
  '초등학교',
  '문화센터',
  '커뮤니티센터',
  '아동복지센터',
];

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('attend');
  const [tableData, setTableData] = useState(dummyTableData);
  const [page, setPage] = useState(1);
  const [lastPageNum, setLastPageNum] = useState(1);

  const router = useRouter();

  useEffect(() => {
    // 비로그인 처리
    const loginSession = localStorage.getItem('log');
    if (!loginSession) {
      router.replace('/login');
      return;
    }
    // 강사 로그인 시 진입 제한
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
  useEffect(() => {
    if (activeTab === 'reservation') {
      handleMypageAgencyReservationGet({
        userIdx: localStorage.getItem('userIdx'),
        pageNum: page,
      })
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          setTableData(data.data);
          setLastPageNum(data.lastPageNum);
        });
    } else if (activeTab === 'instructor') {
      handleMypageTeacherAttendGet({
        agencyIdx: localStorage.getItem('userIdx'),
        pageNum: page,
      })
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          setTableData(data.data);
          setLastPageNum(data.lastPageNum);
        });
    }
    if (localStorage.getItem('activeTab') !== activeTab) setPage(1); // 탭 변경 시 페이지 초기화
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab, page]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <MasterContainer>
      <MyPageContainer>
        <Header>마이페이지 - 기관</Header>
        <Tabs>
          <TabButton
            active={activeTab === 'reservation'}
            onClick={() => handleTabClick('reservation')}
          >
            예약 현황
          </TabButton>
          <TabButton
            active={activeTab === 'instructor'}
            onClick={() => handleTabClick('instructor')}
          >
            수업 및 강사 현황
          </TabButton>
        </Tabs>
        <TableContainer>
          <Table>
            {activeTab === 'reservation' && (
              <thead>
                <tr>
                  <TableHeader>수업 타이틀</TableHeader>
                  <TableHeader>수업 강사</TableHeader>
                  <TableHeader>날짜</TableHeader>
                  <TableHeader>연락처</TableHeader>
                  <TableHeader>승인 여부</TableHeader>
                  <TableHeader>결제 여부</TableHeader>
                </tr>
              </thead>
            )}
            {activeTab === 'instructor' && (
              <thead>
                <tr>
                  <TableHeader>수업 타이틀</TableHeader>
                  <TableHeader>수업 강사</TableHeader>
                  <TableHeader>날짜</TableHeader>
                  <TableHeader>수업 요일</TableHeader>
                  <TableHeader>수업 시간대</TableHeader>
                  <TableHeader>연락처</TableHeader>
                  <TableHeader>출석 여부</TableHeader>
                </tr>
              </thead>
            )}
            {activeTab === 'reservation' && (
              <tbody>
                {tableData.map((data, index) => (
                  <AgencyTableReservationBody key={index} data={data} />
                ))}
              </tbody>
            )}
            {activeTab === 'instructor' && (
              <tbody>
                {tableData.map((data, index) => (
                  <AgencyTableAttendBody key={index} data={data} />
                ))}
              </tbody>
            )}
          </Table>
        </TableContainer>

        <Pagination page={page} setPage={setPage} lastPageNum={lastPageNum} />
      </MyPageContainer>
    </MasterContainer>
  );
};

// Translation 파일 적용
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'nav'])), // 파일 다중 적용 가능
    },
  };
}

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

const Tabs = styled.div`
  display: flex;
  margin-top: 1.5rem;
`;

const TabButton = styled.button`
  background-color: ${({ active }) => (active ? '#61b15a' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#61b15a')};

  border: 1px solid #61b15a;
  border-radius: 40px;

  padding: 0.7rem 1.2rem;
  margin-right: 0.5rem;
  cursor: pointer;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: ${({ active }) => (active ? '700' : '500')};
  transition: 0.2s;

  &:hover {
    background-color: #61b15a;
    color: white;
  }
`;

const TableContainer = styled.div`
  margin-top: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
`;

const TableHeader = styled.th`
  border-bottom: 2px solid #61b15a;
  padding: 1rem;
  color: #61b15a;

  font-size: 1rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;
`;

// const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #f9f9f9;
//   }
// `;

// const TableCell = styled.td`
//   padding: 1rem;
//   border-bottom: 1px solid #ddd;
// `;

// const PaymentStatus = styled.span`
//   color: ${({ status }) => (status === '결제 완료' ? '#61b15a' : 'red')};
//   font-weight: bold;
// `;

export default MyPage;
