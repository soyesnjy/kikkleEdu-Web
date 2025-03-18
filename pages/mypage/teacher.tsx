/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { handleMypageTeacherAttendGet } from '@/fetchAPI/mypageAPI';
import { useQuery } from 'react-query';

import useLoginSessionCheck from '@/hook/useLoginSessionCheck';

import TeacherTab from '@/component/MyPage_Component/Teacher/TeacherTab';
import TeacherTableAttendBody from '@/component/MyPage_Component/Teacher/TeacherTableAttendBody';
import TeacherTablePrivacyBody from '@/component/MyPage_Component/Teacher/TeacherTablePrivacyBody';
import Directory from '@/component/Music_Component/Directory';
import Pagination from '@/component/Common_Component/Pagination';

const agencyTypeArr = [
  '유치원',
  '초등학교',
  '문화센터',
  '커뮤니티센터',
  '아동(복지)센터',
];

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('');
  const [page, setPage] = useState(1);

  const router = useRouter();
  useLoginSessionCheck(); // 로그인 여부 확인

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
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
  } = useQuery({
    queryKey: ['attendData', page],
    queryFn: fetchAttendData,
    staleTime: 5000, // 5초 동안 신선한 상태 유지
    cacheTime: 10000, // 10초 동안 캐시 유지
    onError: (error) => {
      console.error(error);
    },
  });

  // 테이블 데이터와 마지막 페이지 번호 업데이트
  const tableData = activeTab === 'attend' ? attendData?.data : [];
  const lastPageNum = activeTab === 'attend' ? attendData?.lastPageNum : 1;

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
    // 탭 변경 시 페이지 초기화
    if (localStorage.getItem('activeTab') !== activeTab) setPage(1);
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab, page]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <MyPageContainer>
      <Header>{`마이페이지 - 강사`}</Header>
      <TeacherTab activeTab={activeTab} handleTabClick={handleTabClick} />
      <TabContainer>
        {/* 수업 출석 */}
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
              {tableData?.map((data, index) => (
                <TeacherTableAttendBody key={index} data={data} page={page} />
              ))}
            </tbody>
          </Table>
        )}
        {/* 수업 자료 공유 */}
        {['music', 'video', 'class'].includes(activeTab) && (
          <Directory activeTab={activeTab} />
        )}
        {/* 회원정보 수정 */}
        {activeTab === 'privacy' && <TeacherTablePrivacyBody />}
      </TabContainer>
      {activeTab === 'attend' && (
        <Pagination page={page} setPage={setPage} lastPageNum={lastPageNum} />
      )}
    </MyPageContainer>
  );
};

// styled-component의 animation 설정 방법 (keyframes 메서드 사용)

const MyPageContainer = styled.div`
  width: 85vw;
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 4rem;

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
