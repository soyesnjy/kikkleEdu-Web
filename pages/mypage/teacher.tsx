/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import useLoginSessionCheck from '@/hook/useLoginSessionCheck';

import TeacherTab from '@/component/MyPage_Component/Teacher/TeacherTab';
import TeacherTableAttendTable from '@/component/MyPage_Component/Teacher/TeacherTableAttendTable';
import TeacherTablePrivacyBody from '@/component/MyPage_Component/Teacher/TeacherTablePrivacyBody';
import Directory from '@/component/Music_Component/Directory';

const agencyTypeArr = [
  '유치원',
  '초등학교',
  '문화센터',
  '커뮤니티센터',
  '아동(복지)센터',
];

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('');

  const router = useRouter();
  useLoginSessionCheck(); // 로그인 여부 확인

  const handleTabClick = (tab: string) => setActiveTab(tab);

  useEffect(() => {
    // 기관 로그인 진입 제한
    const agencyType = localStorage.getItem('agencyType');
    if (agencyTypeArr.includes(agencyType)) {
      alert('페이지 진입 권한이 없습니다');
      router.replace('/');
      return;
    }
    // activeTab 설정
    setActiveTab(localStorage.getItem('activeTab') || 'attend');

    return () => {
      localStorage.removeItem('activeTab');
    };
  }, []);

  // 탭 변경 시 localStorage 저장
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    <TeacherMyPageContainer>
      <TeacherHeader>{`마이페이지 - 강사`}</TeacherHeader>
      <TeacherTab activeTab={activeTab} handleTabClick={handleTabClick} />
      <BodyContainer>
        {/* 수업 출석 관리 */}
        {activeTab === 'attend' && <TeacherTableAttendTable />}
        {/* 수업 자료 공유 */}
        {['music', 'video', 'class'].includes(activeTab) && (
          <Directory activeTab={activeTab} />
        )}
        {/* 회원 정보 수정 */}
        {activeTab === 'privacy' && <TeacherTablePrivacyBody />}
      </BodyContainer>
    </TeacherMyPageContainer>
  );
};

// styled-component의 animation 설정 방법 (keyframes 메서드 사용)

const TeacherMyPageContainer = styled.div`
  width: 85vw;
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 4rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TeacherHeader = styled.div`
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

const BodyContainer = styled.div`
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

export default MyPage;
