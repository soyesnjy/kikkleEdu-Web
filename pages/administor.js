/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
import styled from 'styled-components';
import { useEffect, useState } from 'react';

// import { useRecoilState } from 'recoil';
// import { agencyClass } from '../store/state';
import { useRouter } from 'next/router';

import { handleSignupGet } from '@/fetchAPI/signupAPI';
import { handleReservationGet } from '@/fetchAPI/reservationAPI';
import { handleDirectoryRead } from '@/fetchAPI/directoryAPI';
import { handleMypageTeacherAttendGet } from '@/fetchAPI/mypageAPI';

// import { useTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Directory from '@/component/Music_Component/Directory';
import AdminTableTeacherBody from '@/component/Admin_Component/AdminTableTeacherBody';
import AdminTableAgencyBody from '@/component/Admin_Component/AdminTableAgencyBody';
import AdminTableReservationBody from '@/component/Admin_Component/AdminTableReservationBody';
import TeacherTableAttendBody from '@/component/MyPage_Component/Teacher/TeacherTableAttendBody';
import BoardCreate from '@/component/Board_Component/BoardCreate';
import AdminSchedulerBody from '@/component/Admin_Component/AdminSchedulerBody';
import Pagination from '@/component/Common_Component/Pagination';

// const dummyTableData = [
//   {
//     title: '○○수업',
//     instructor: '김하나',
//     date: '2024-07-01 ~ 2024-08-01',
//     contact: '010-0000-0000',
//     paymentStatus: '결제 완료',
//   },
//   {
//     title: '○○수업',
//     instructor: '김하나',
//     date: '2024-07-01 ~ 2024-08-01',
//     contact: '010-0000-0000',
//     paymentStatus: '결제 전',
//   },
//   // 추가 데이터
// ];

const Administor = () => {
  // const [agencyType, setAgencyType] = useRecoilState(agencyClass);
  const [activeTab, setActiveTab] = useState('');
  const [tableData, setTableData] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(-1);
  const [lastPageNum, setLastPageNum] = useState(1);
  const [data, setData] = useState([]); // 파일 데이터

  const router = useRouter();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // 음원 디렉토리 구조 초기화 메서드
  const initMusicDirectory = async (form) => {
    const res = await handleDirectoryRead({ form });
    if (res.status !== 200) return alert(res.message);

    const data = res.data;
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

  // // 관리자 권한이 없을 경우 메인페이지로 이동
  // useEffect(() => {
  //   if (localStorage.getItem('agencyType') !== 'admin') router.replace('/');
  // }, [agencyType]);

  useEffect(() => {
    // 관리자 권한이 없을 경우 메인페이지로 이동
    if (
      localStorage.getItem('log') === null ||
      localStorage.getItem('agencyType') === null ||
      localStorage.getItem('agencyType') !== 'admin'
    ) {
      console.log(localStorage.getItem('log'));
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
            setTableData([...data.data]);
            setLastPageNum(data.lastPageNum);
          });
      }
      // 기관 승인 요청 관리
      else if (activeTab === 'agency') {
        handleSignupGet({ userClass: activeTab, pageNum: page })
          .then((res) => res.data)
          .then((data) => {
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
      // 미디어 서비스 관리 (음원, 영상, 강의계획서)
      else initMusicDirectory(activeTab);
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
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (activeTab === 'teacher') {
        handleSignupGet({ userClass: activeTab, name, pageNum: page })
          .then((res) => res.data)
          .then((data) => {
            setTableData(data.data);
          });
      } else if (activeTab === 'agency') {
        handleSignupGet({ userClass: activeTab, name, pageNum: page })
          .then((res) => res.data)
          .then((data) => {
            setTableData(data.data);
          });
      } else if (activeTab === 'reservation') {
        handleReservationGet({
          userClass: activeTab,
          date: name,
          pageNum: page,
        })
          .then((res) => res.data)
          .then((data) => {
            console.log(data);
            setTableData(data.data);
          });
      } else if (activeTab === 'attend') {
        handleMypageTeacherAttendGet({
          // userIdx: localStorage.getItem('userIdx'),
          name,
          pageNum: page,
        })
          .then((res) => res.data)
          .then((data) => {
            console.log(data);
            setTableData(data.data);
            setLastPageNum(data.lastPageNum);
          });
      }
    }, 350);

    return () => {
      clearTimeout(debounce);
    };
  }, [name]);

  return (
    <MasterContainer>
      <MyPageContainer>
        <Header>관리자 페이지</Header>
        <Tabs>
          <div>
            <TabButton
              active={activeTab === 'attend'}
              onClick={() => handleTabClick('attend')}
            >
              강사 출석 현황
            </TabButton>
            <TabButton
              active={activeTab === 'teacher'}
              onClick={() => handleTabClick('teacher')}
            >
              강사 승인 요청 관리
            </TabButton>
            <TabButton
              active={activeTab === 'agency'}
              onClick={() => handleTabClick('agency')}
            >
              기관 승인 요청 관리
            </TabButton>
            <TabButton
              active={activeTab === 'reservation'}
              onClick={() => handleTabClick('reservation')}
            >
              기관 예약 요청 관리
            </TabButton>
            <TabButton
              active={activeTab === 'music'}
              onClick={() => handleTabClick('music')}
            >
              강사 음원 자료 관리
            </TabButton>
            <TabButton
              active={activeTab === 'video'}
              onClick={() => handleTabClick('video')}
            >
              강사 영상 자료 관리
            </TabButton>
            <TabButton
              active={activeTab === 'class'}
              onClick={() => handleTabClick('class')}
            >
              강의계획서 관리
            </TabButton>
            <TabButton
              active={activeTab === 'notice'}
              onClick={() => handleTabClick('notice')}
            >
              공지사항 관리
            </TabButton>
            <TabButton
              active={activeTab === 'schedule'}
              onClick={() => handleTabClick('schedule')}
            >
              강사 스케줄 관리
            </TabButton>
          </div>
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
                  <TableHeader>결제여부</TableHeader>
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
              <tbody>
                {tableData.map((data) => (
                  <AdminTableTeacherBody
                    key={JSON.stringify(data)}
                    data={data}
                  />
                ))}
              </tbody>
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
                  />
                ))}
              </tbody>
            )}
          </Table>
          {activeTab === 'music' && <Directory data={data} form={activeTab} />}
          {activeTab === 'video' && <Directory data={data} form={activeTab} />}
          {activeTab === 'class' && <Directory data={data} form={activeTab} />}
          {activeTab === 'notice' && <BoardCreate />}
          {activeTab === 'schedule' && <AdminSchedulerBody />}
        </TableContainer>
        {(activeTab === 'teacher' ||
          activeTab === 'agency' ||
          activeTab === 'reservation' ||
          activeTab === 'attend') && (
          <Pagination page={page} setPage={setPage} lastPageNum={lastPageNum} />
        )}
      </MyPageContainer>
    </MasterContainer>
  );
};

// Translation 파일 적용
// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common', 'nav'])), // 파일 다중 적용 가능
//     },
//   };
// }

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
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
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
