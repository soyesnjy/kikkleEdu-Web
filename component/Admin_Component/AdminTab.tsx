import React from 'react';
import styled from 'styled-components';

// Props Type
type PropsType = {
  activeTab: string; // 관리자 탭 식별자 state
  handleTabClick: (tab: string) => void; // 관리자 탭 식별자 setState Handler
};

const tabDataArray: { id: string; title: string }[] = [
  {
    id: 'attend',
    title: '수업출석 관리',
  },
  {
    id: 'teacher',
    title: '강사회원 관리',
  },
  {
    id: 'agency',
    title: '기관회원 관리',
  },
  {
    id: 'reservation',
    title: '수업예약 관리',
  },
  {
    id: 'music',
    title: '음원자료 관리',
  },
  {
    id: 'video',
    title: '영상자료 관리',
  },
  {
    id: 'class',
    title: '강의계획서 관리',
  },
  {
    id: 'notice',
    title: '공지사항 관리',
  },
  {
    id: 'schedule',
    title: '강사스케줄 관리',
  },
];

const AdminTab = ({ activeTab, handleTabClick }: PropsType) => {
  return (
    <Tabs>
      {tabDataArray.map((tabData) => {
        const { id, title } = tabData;
        return (
          <TabButton
            key={id + title}
            active={activeTab === id}
            onClick={() => handleTabClick(id)}
          >
            {title}
          </TabButton>
        );
      })}
    </Tabs>
  );
};

type TabButtonType = {
  active?: boolean;
};

const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 1.5rem;

  gap: 0.4rem;

  @media (max-width: 768px) {
    padding: 0.3rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.2rem;
  }
`;

const TabButton = styled.button<TabButtonType>`
  background-color: ${({ active }) => (active ? '#61b15a' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#61b15a')};

  border: 1px solid #61b15a;
  border-radius: 40px;

  padding: 0.7rem 1.2rem;

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
    padding: 0.3rem;
    font-size: 0.9rem;
    height: 3rem;
  }
`;

export default AdminTab;
