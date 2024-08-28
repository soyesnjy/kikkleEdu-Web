/* eslint-disable no-unreachable */
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { agencyClass } from '../store/state';
import { useRouter } from 'next/router';
import { handleSignupGet } from '@/fetchAPI/signupAPI';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdminTableTeacherBody from '@/component/Admin_Component/AdminTableTeacherBody';
import AdminTableAgencyBody from '@/component/Admin_Component/AdminTableAgencyBody';
import AdminTableReservationBody from '@/component/Admin_Component/AdminTableReservationBody';

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

const Administor = () => {
  const [agencyType, setAgencyType] = useRecoilState(agencyClass);
  const [activeTab, setActiveTab] = useState('');
  const [tableData, setTableData] = useState(dummyTableData);
  const [name, setName] = useState('');
  const router = useRouter();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // if (agencyType !== 'admin') router.push('/');
    if (localStorage.getItem('activeTab'))
      setActiveTab(localStorage.getItem('activeTab'));
    else setActiveTab('teacher');

    return () => {
      localStorage.removeItem('activeTab');
    };
  }, []);

  useEffect(() => {
    if (activeTab === 'teacher') {
      handleSignupGet({ userClass: activeTab, name })
        .then((res) => res.data)
        .then((data) => {
          console.log(data.data);
          setTableData(data.data);
        });
    } else if (activeTab === 'agency') {
      handleSignupGet({ userClass: activeTab })
        .then((res) => res.data)
        .then((data) => {
          console.log(data.data);
          setTableData(data.data);
        });
    } else if (activeTab === 'reservation') {
      console.log(activeTab);
    }
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (activeTab === 'teacher') {
        handleSignupGet({ userClass: activeTab, name })
          .then((res) => res.data)
          .then((data) => {
            console.log(data.data);
            setTableData(data.data);
          });
      } else if (activeTab === 'agency') {
        handleSignupGet({ userClass: activeTab, name })
          .then((res) => res.data)
          .then((data) => {
            console.log(data.data);
            setTableData(data.data);
          });
      } else if (activeTab === 'reservation') {
        console.log(activeTab);
      }
    }, 350);

    return () => {
      clearTimeout(debounce);
    };
  }, [name]);

  // useEffect(() => {
  //   const debounce = setTimeout(() => {
  //     return checkPwd();
  //   }, 350);
  //   return () => {
  //     clearTimeout(debounce);
  //   };
  // }, [name]);

  return (
    <MasterContainer>
      <MyPageContainer>
        <Header>관리자 페이지</Header>
        <Tabs>
          <TabButton
            active={activeTab === 'teacher'}
            onClick={() => handleTabClick('teacher')}
          >
            강사 승인 요청 관리
          </TabButton>
          <TabButton
            active={activeTab === 'agency'}
            onClick={() => {
              // return alert('개발중...');
              handleTabClick('agency');
            }}
          >
            기관 승인 요청 관리
          </TabButton>
          <TabButton
            active={activeTab === 'reservation'}
            onClick={() => {
              return alert('개발중...');
              handleTabClick('reservation');
            }}
          >
            기관 예약 요청 관리
          </TabButton>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </Tabs>
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
                  <TableHeader>경력</TableHeader>
                  <TableHeader>학력</TableHeader>
                  <TableHeader>첨부 자료</TableHeader>
                  <TableHeader>승인 여부</TableHeader>
                </tr>
              </thead>
            )}
            {activeTab === 'agency' && (
              <thead>
                <tr>
                  <TableHeader>기관 번호</TableHeader>
                  <TableHeader>기관 계정정보</TableHeader>
                  <TableHeader>기관명</TableHeader>
                  <TableHeader>강사 주소</TableHeader>
                  <TableHeader>연락처</TableHeader>
                  <TableHeader>기관 유형</TableHeader>
                  <TableHeader>기관 첨부자료</TableHeader>
                  <TableHeader>승인 여부</TableHeader>
                </tr>
              </thead>
            )}
            {activeTab === 'reservation' && (
              <thead>
                <tr>
                  <TableHeader>수업 타이틀</TableHeader>
                  <TableHeader>수업 강사</TableHeader>
                  <TableHeader>날짜</TableHeader>
                  <TableHeader>
                    {agencyType ? '연락처' : '출근 현황'}
                  </TableHeader>
                  <TableHeader>
                    {agencyType
                      ? activeTab === 'reservation'
                        ? '결제 여부'
                        : '진행 여부'
                      : ''}
                  </TableHeader>
                </tr>
              </thead>
            )}
            {/* Table Body */}
            {activeTab === 'teacher' && (
              <tbody>
                {tableData.map((data, index) => (
                  <AdminTableTeacherBody key={index} data={data} />
                ))}
              </tbody>
            )}
            {activeTab === 'agency' && (
              <tbody>
                {tableData.map((data, index) => (
                  <AdminTableAgencyBody key={index} data={data} />
                ))}
              </tbody>
            )}
            {activeTab === 'reservation' && (
              <AdminTableReservationBody data={tableData} />
            )}
          </Table>
        </TableContainer>
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

  font-size: 0.9rem;
  font-family: Pretendard;
  font-weight: 600;
  text-align: left;
`;

export default Administor;
