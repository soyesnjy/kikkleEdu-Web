/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { handleMypageTeacherAttendGet } from '@/fetchAPI/mypageAPI';
import { handleTeacherGet } from '@/fetchAPI/teacherAPI';
import { handleClassGet } from '@/fetchAPI/classAPI';
import { useRouter } from 'next/router';

import Directory from '@/component/Music_Component/Directory';
import { handleDirectoryRead } from '@/fetchAPI/directory';
// import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TeacherTableAttendBody from '@/component/MyPage_Component/Teacher/TeacherTableAttendBody';
import TeacherTablePrivacyBody from '@/component/MyPage_Component/Teacher/TeacherTablePrivacyBody';
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
  '아동(복지)센터',
];

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('attend');
  const [tableData, setTableData] = useState(dummyTableData);
  const [page, setPage] = useState(1);
  const [lastPageNum, setLastPageNum] = useState(1);
  const [data, setData] = useState([]); // [음원,비디오,강의자료] 데이터
  const [teacherData, setTeacherData] = useState(null); // 강사 데이터
  const router = useRouter();

  // 음원 디렉토리 구조 초기화 메서드
  const initMusicDirectory = async (form) => {
    const data = await handleDirectoryRead({ form });
    const formattedData = data.directories.map((dir) => ({
      ...dir,
      url:
        dir.kk_directory_type === 'file'
          ? data.tracks.find(
              (track) => track.kk_directory_idx === dir.kk_directory_idx
            )?.kk_file_path
          : null,
    }));
    setData([...formattedData]);
  };

  useEffect(() => {
    // 비로그인 처리
    const loginSession = localStorage.getItem('log');
    if (!loginSession) {
      router.replace('/login');
      return;
    }
    // 기관 로그인 진입 제한
    const agencyType = localStorage.getItem('agencyType');
    if (!agencyTypeArr.includes(agencyType)) {
      router.replace('/mypage/teacher');
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
        .then((res) => res.data)
        .then((data) => {
          // console.log(data);
          setTableData(data.data);
          setLastPageNum(data.lastPageNum);
        });
    } else if (activeTab === 'privacy') {
      handleTeacherGet({ teacherIdx: localStorage.getItem('userIdx') })
        .then((res) => res.data)
        .then((data) => {
          // console.log(data);
          setTeacherData(data.data[0]); // 강사 정보 state 갱신
        });
    } else initMusicDirectory(activeTab);
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
        <Header>마이페이지 - 강사</Header>
        <Tabs>
          <TabButton
            active={activeTab === 'attend'}
            onClick={() => handleTabClick('attend')}
          >
            출석 확인
          </TabButton>
          <TabButton
            active={activeTab === 'privacy'}
            onClick={() => handleTabClick('privacy')}
          >
            개인정보 관리
          </TabButton>
          <TabButton
            active={activeTab === 'music'}
            onClick={() => handleTabClick('music')}
          >
            음원 자료
          </TabButton>
          <TabButton
            active={activeTab === 'video'}
            onClick={() => handleTabClick('video')}
          >
            영상 자료
          </TabButton>
          <TabButton
            active={activeTab === 'class'}
            onClick={() => handleTabClick('class')}
          >
            강의 계획서
          </TabButton>
        </Tabs>
        <TableContainer>
          <Table>
            {/* Table Header */}
            {activeTab === 'attend' && (
              <thead>
                <tr>
                  <TableHeader>타이틀</TableHeader>
                  <TableHeader>기관명</TableHeader>
                  <TableHeader>강사</TableHeader>
                  <TableHeader>날짜</TableHeader>
                  <TableHeader>요일</TableHeader>
                  <TableHeader>시간대</TableHeader>
                  <TableHeader>출근 현황</TableHeader>
                  <TableHeader></TableHeader>
                </tr>
              </thead>
            )}
            {/* Table Body */}
            {activeTab === 'attend' && (
              <tbody>
                {tableData.map((data, index) => (
                  <TeacherTableAttendBody key={index} data={data} page={page} />
                ))}
              </tbody>
            )}
          </Table>
          {activeTab === 'privacy' && (
            <TeacherTablePrivacyBody data={teacherData} />
          )}
          {activeTab === 'music' && <Directory data={data} form={activeTab} />}
          {activeTab === 'video' && <Directory data={data} form={activeTab} />}
          {activeTab === 'class' && <Directory data={data} form={activeTab} />}
        </TableContainer>
        {activeTab === 'attend' && (
          <Pagination page={page} setPage={setPage} lastPageNum={lastPageNum} />
        )}
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

const Tabs = styled.div`
  display: flex;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 0.3rem;
    justify-content: center;
    align-items: center;
  }
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

  @media (max-width: 768px) {
    padding: 0.7rem;
    border-radius: 20px;
    margin-right: 0;
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
