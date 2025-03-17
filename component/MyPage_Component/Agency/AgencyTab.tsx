import React from 'react';
import styled from 'styled-components';

// Props Type
type PropsType = {
  activeTab: string; // 관리자 탭 식별자 state
  handleTabClick: (tab: string) => void; // 관리자 탭 식별자 setState Handler
};

const tabDataArray: { id: string; title: string }[] = [
  {
    id: 'reservation',
    title: '예약 현황',
  },
  {
    id: 'instructor',
    title: '수업 및 강사 현황',
  },
  {
    id: 'class',
    title: '강의 계획서',
  },
  {
    id: 'privacy',
    title: '개인정보 관리',
  },
];

const AgencyTab = ({ activeTab, handleTabClick }: PropsType) => {
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

export default AgencyTab;
