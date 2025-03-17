/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { handleMypageTeacherAttendGet } from '@/fetchAPI/mypageAPI';
import { handleTeacherGet } from '@/fetchAPI/teacherAPI';

import useLoginSessionCheck from '@/hook/useLoginSessionCheck';

import TeacherTab from '@/component/MyPage_Component/Teacher/TeacherTab';
import Directory from '@/component/Music_Component/Directory';
import TeacherTableAttendBody from '@/component/MyPage_Component/Teacher/TeacherTableAttendBody';
import TeacherTablePrivacyBody from '@/component/MyPage_Component/Teacher/TeacherTablePrivacyBody';
import Pagination from '@/component/Common_Component/Pagination';

const attendErrorData = [
  {
    kk_teacher_name: '미승인 회원입니다',
  },
  // 추가 데이터
];

const agencyTypeArr = [
  '유치원',
  '초등학교',
  '문화센터',
  '커뮤니티센터',
  '아동(복지)센터',
];

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('');
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPageNum, setLastPageNum] = useState(1);
  const [teacherData, setTeacherData] = useState(null); // 강사 데이터

  const router = useRouter();
  useLoginSessionCheck(); // 로그인 여부 확인

  // 로그인 세션 Clear 메서드
  const loginSessionClear = () => {
    const loginSession = localStorage.getItem('log');
    if (loginSession) {
      localStorage.setItem(
        'log',
        JSON.stringify({
          expires: 0, // 로그인 세션 24시간 설정
        })
      );
      router.push('/');
    }
  };

  useEffect(() => {
    // 기관 로그인 진입 제한
    const agencyType = localStorage.getItem('agencyType');
    if (agencyTypeArr.includes(agencyType)) {
      router.replace('/mypage');
      return;
    }

    // activeTab 설정
    if (localStorage.getItem('activeTab'))
      setActiveTab(localStorage.getItem('activeTab'));
    else setActiveTab('attend');

    return () => {
      localStorage.removeItem('activeTab');
    };
  }, []);

  // 일반 조회 (탭 || 페이지)
  useEffect(() => {
    if (activeTab === 'attend') {
      handleMypageTeacherAttendGet({
        userIdx: localStorage.getItem('userIdx'),
        pageNum: page,
      })
        .then((res) => {
          if (res.status === 401) {
            loginSessionClear();
            alert(res.data.message);
          }
          return res.data;
        })
        .then((data) => {
          // console.log(data);
          setTableData(data.data);
          setLastPageNum(data.lastPageNum);
        })
        .catch((error) => {
          console.log(error);
          setTableData(attendErrorData);
        });
    } else if (activeTab === 'privacy') {
      handleTeacherGet({ teacherIdx: localStorage.getItem('userIdx') })
        .then((res) => {
          // console.log(res);
          if (res.status === 401) {
            loginSessionClear();
            alert(res.message);
          }
          return res.data;
        })
        .then((data) => {
          // console.log(data);
          setTeacherData(data.data[0]); // 강사 정보 state 갱신
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // 탭 변경 시 페이지 초기화
    if (localStorage.getItem('activeTab') !== activeTab) setPage(1);
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab, page]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <MasterContainer>
      <MyPageContainer>
        <Header>{`마이페이지 - 강사`}</Header>
        <TeacherTab activeTab={activeTab} handleTabClick={handleTabClick} />
        <TabContainer>
          {activeTab === 'attend' && (
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
                {tableData.length > 0
                  ? tableData.map((data, index) => (
                      <TeacherTableAttendBody
                        key={index}
                        data={data}
                        page={page}
                      />
                    ))
                  : null}
              </tbody>
            </Table>
          )}
          {/* 수업 자료 */}
          {activeTab === 'music' && <Directory activeTab={activeTab} />}
          {activeTab === 'video' && <Directory activeTab={activeTab} />}
          {activeTab === 'class' && <Directory activeTab={activeTab} />}
          {/* 회원정보 수정 */}
          {activeTab === 'privacy' && (
            <TeacherTablePrivacyBody data={teacherData} />
          )}
        </TabContainer>
        {activeTab === 'attend' && (
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

  @media (max-width: 768px) {
    width: 100%;
  }
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

const TabContainer = styled.div`
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
