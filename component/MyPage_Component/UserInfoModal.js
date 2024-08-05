/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { handleCalendarResult } from '@/fetchAPI';
// import { useSession } from "next-auth/react";
import TestCard from './TestCard';
import ResultCard from './ResultCard';
import Loading from '@/component/Common_Component/Loading';

import Image from 'next/image';

const userInfoArr = [
  {
    title: '성격검사',
    type: 'pt_data',
    iconSrc: '/src/MyPage_IMG/Icon/MyPage_PT_Icon_IMG.png',
    playIconSrc: '/src/Content_IMG/Frame_재생버튼.png',
  },
  {
    title: '정서행동검사',
    type: 'ebt_data',
    iconSrc: '/src/MyPage_IMG/Icon/MyPage_EBT_Icon_IMG.png',
    playIconSrc: '/src/Content_IMG/Frame_재생버튼.png',
  },
  {
    title: '심리상담',
    type: 'consult_data',
    iconSrc: '/src/MyPage_IMG/Icon/MyPage_Consult_Icon_IMG.png',
    playIconSrc: '/src/Content_IMG/Frame_재생버튼.png',
  },
  {
    title: '콘텐츠',
    type: 'content_data',
    iconSrc: '/src/MyPage_IMG/Icon/MyPage_Content_Icon_IMG.png',
    playIconSrc: '/src/Content_IMG/Frame_재생버튼.png',
  },
  {
    title: '엘라상담',
    type: 'ella_data',
    iconSrc: '/src/MyPage_IMG/Icon/MyPage_Ella_Icon_IMG.png',
    playIconSrc: '/src/Content_IMG/Frame_재생버튼.png',
  },
  {
    title: '명상',
    type: 'meditation_data',
    iconSrc: '/src/MyPage_IMG/Icon/MyPage_Meditation_Icon_IMG.png',
    playIconSrc: '/src/Content_IMG/Frame_재생버튼.png',
  },
];

const loadingDuration = 1000;

const UserInfoModal = ({ isOpen, onRequestClose, date, userId }) => {
  const [calendarData, setCalendarData] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [content, setContent] = useState('');

  const UserInfoContainerRef = useRef(null);
  const dateArr = date.split('-');

  // 달력 데이터 반환 API 호출 세션
  useEffect(() => {
    if (date) {
      setIsPending(true);
      handleCalendarResult({
        pUid: userId,
        date,
      })
        .then((cData) => {
          // console.log(data);
          if (cData) {
            console.log(cData);
            setCalendarData({ ...cData });
            setTimeout(() => {
              setIsPending(false);
            }, loadingDuration);
          } else {
            console.error('Failed to fetch Calendar Data');
          }
        })
        .catch((error) => {
          console.error('Error fetching Calendar Data:', error);
          setTimeout(() => {
            setIsPending(false);
          }, 500);
        });
    }
  }, [date]);

  useEffect(() => {
    const UserInfoBody = UserInfoContainerRef.current;
  }, [content]);

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User Info Modal"
      ariaHideApp={false}
    >
      {!isPending && (
        <UserInfoHeaderContainer>
          <sapn>
            {Number(dateArr[0])}년 {Number(dateArr[1])}월 {Number(dateArr[2])}일
          </sapn>
          <button onClick={onRequestClose}>
            <Image
              src="/src/MyPage_IMG/Icon/MyPage_Cancel_Icon_IMG.png"
              alt="Icon"
              width={60}
              height={60}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </button>
        </UserInfoHeaderContainer>
      )}
      {isPending ? (
        <Loading duration={loadingDuration} />
      ) : (
        <UserInfoContainer ref={UserInfoContainerRef}>
          <TestCardContainer>
            {userInfoArr.map((el, index) => {
              return (
                <TestCard
                  key={index}
                  title={el.title}
                  count={calendarData[el.type]?.length || 0}
                  iconSrc={el.iconSrc}
                  playIconSrc={el.playIconSrc}
                  setContent={setContent}
                />
              );
            })}
          </TestCardContainer>
          {calendarData.ebt_data?.length > 0 && content === '정서행동검사' && (
            <ResultCard
              content={content}
              description={calendarData.ebt_data[0]?.ebt_analysis}
            />
          )}
          {calendarData.pt_data?.length > 0 && content === '성격검사' && (
            <ResultCard
              content={content}
              description={calendarData.pt_data[0]?.pt_analysis}
            />
          )}
        </UserInfoContainer>
      )}
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  position: absolute;
  top: 55%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);

  /* max-width: 640px; */
  width: 90vw;
  height: auto;
  max-height: 90vh;

  background: #9051ff;
  border-radius: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  outline: none;

  overflow: auto;
  z-index: 1;

  @media (max-width: 768px) {
    top: 55%;
  }
`;

const UserInfoHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  font-family: AppleSDGothicNeoM00;

  button {
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0 0 1rem 1rem;
    button {
      width: 35px;
      height: 35px;
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;
    }
  }
`;

const UserInfoContainer = styled.div`
  width: 100%;
  min-height: 600px;
  padding: 2rem 0;

  z-index: 1;
  background-color: #fffef8;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 2rem;
`;

const TestCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);

  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }
`;

const TestContainer = styled.div`
  width: 100px;
  height: 2000px;
`;

export default UserInfoModal;
