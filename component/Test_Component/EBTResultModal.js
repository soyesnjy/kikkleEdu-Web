/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Image from 'next/image';
import BarChart from './BarChart';

const EBTResultModal = ({ isOpen, onRequestClose, ebtClassData }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="EBT Result Modal"
      ariaHideApp={false}
    >
      <UserInfoHeaderContainer>
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
      <UserInfoContainer>
        {ebtClassData.content ? (
          <TestContainer>
            <TestCardContainer>
              {ebtClassData.result === '양호' ? (
                <Image
                  src="/src/EBT_Result_IMG/Result_Icon/EBT_Result_Icon_Green_IMG.png.png"
                  alt="Icon"
                  width={466}
                  height={187}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              ) : ebtClassData.result === '주의' ? (
                <Image
                  src="/src/EBT_Result_IMG/Result_Icon/EBT_Result_Icon_Yellow_IMG.png"
                  alt="Icon"
                  width={466}
                  height={187}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              ) : (
                <Image
                  src="/src/EBT_Result_IMG/Result_Icon/EBT_Result_Icon_Red_IMG.png.png"
                  alt="Icon"
                  width={466}
                  height={187}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              )}
            </TestCardContainer>
            <TestCardContainer>
              <span>안녕하세요!? 소예키즈 AI상담사입니다.</span>
              상담 내용에 대한 AI분석 결과를 안내드립니다.
            </TestCardContainer>
            <TestContentContainer>{ebtClassData.content}</TestContentContainer>
          </TestContainer>
        ) : (
          <ChartContainer>
            <BarChart ebtClassData={ebtClassData} />
            <ChartTextContainer>
              * T점수 65점 이상은 ‘주의’로 해당 영역에서 다소 어려움이 있을
              가능성을, 70점 이상은 ‘경고’로 많은 어려움이 있을 가능성을
              의미합니다.
            </ChartTextContainer>
          </ChartContainer>
        )}
      </UserInfoContainer>
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
  height: 90vh;

  background: #9051ff;
  border-radius: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  outline: none;

  overflow: auto;
  z-index: 10;

  @media (max-width: 768px) {
  }
`;

const UserInfoHeaderContainer = styled.div`
  display: flex;
  justify-content: right;
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
      width: 25px;
      height: 25px;
      padding: 0;
      background: none;
      border: none;
      cursor: pointer;
    }
  }
`;

const UserInfoContainer = styled.div`
  width: 100%;
  height: 100%;

  min-height: 600px;
  padding: 2rem 0;

  z-index: 1;
  background-color: #fffef8;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 100%;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TestContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 2rem;

  @media (max-width: 1200px) {
    gap: 0;
  }

  @media (max-width: 768px) {
    gap: 0;
  }
`;

const TestCardContainer = styled.div`
  width: 80%;
  max-width: 40rem;
  font-size: 25px;
  font-family: AppleSDGothicNeoM00;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1200px) {
    width: 70%;
    padding: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 15px;
  }
`;

const TestContentContainer = styled.div`
  width: 80%;
  max-width: 40rem;

  font-size: 25px;
  font-family: AppleSDGothicNeoM00;

  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #ecccfa;
  border-radius: 10px;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1rem;
  }
`;

const ChartTextContainer = styled.div`
  width: 80%;
  max-width: 40rem;
  font-size: 16px;
  font-family: AppleSDGothicNeoM00;
  font-weight: bold;
  color: #6a7ec8;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 3rem;

  @media (max-width: 1200px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
export default EBTResultModal;
