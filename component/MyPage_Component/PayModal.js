// components/TestCard.js
import React from 'react';
import styled from 'styled-components';

const PayModal = ({ isOpen, setIsOpen }) => {
  return (
    <PayModalContainer
      isOpen={isOpen}
      onClick={(e) => {
        if (e.currentTarget !== e.target) return;
        setIsOpen(!isOpen);
      }}
    >
      <PayModalContentContainer>
        <PayModalContentHeaderContainer>
          <PayModalHeaderTitle>세금계산서 발금 - 담당자</PayModalHeaderTitle>
          <CloseButton
            onClick={(e) => {
              e.preventDefault();
              // alert('개발중...');
              setIsOpen(!isOpen);
            }}
          >
            <CloseIcon />
          </CloseButton>
        </PayModalContentHeaderContainer>
        <PayModalContentMiddleContainer>
          <PayModalMiddleTitle backColor="#63636366">
            사업자 번호
          </PayModalMiddleTitle>
          <PayModalMiddleSubtitle color="#636363">
            02-303-4420
          </PayModalMiddleSubtitle>
        </PayModalContentMiddleContainer>
        <PayModalContentMiddleContainer>
          <PayModalMiddleTitle backColor="#3870FF66">
            이메일 주소
          </PayModalMiddleTitle>
          <PayModalMiddleSubtitle color="#3870FF">
            soyes2021@gmail.com
          </PayModalMiddleSubtitle>
        </PayModalContentMiddleContainer>
        <PayModalContentMiddleContainer>
          <PayModalMiddleTitle backColor="#378E5666">
            담당자 번호
          </PayModalMiddleTitle>
          <PayModalMiddleSubtitle color="#378E56">
            02-303-4420
          </PayModalMiddleSubtitle>
        </PayModalContentMiddleContainer>

        <PayModalButton>
          <PayModalA href="tel:02-303-4420">담당자 전화 연결하기</PayModalA>
        </PayModalButton>
      </PayModalContentContainer>
    </PayModalContainer>
  );
};

const PayModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #1717174d;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;

  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  gap: 1rem;
`;

const PayModalContentContainer = styled.div`
  width: 602px;
  height: fit-content;
  background-color: white;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 2rem;

  gap: 1rem;
`;

const PayModalContentHeaderContainer = styled.div`
  width: 100%;

  background-color: white;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const PayModalHeaderTitle = styled.span`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.5rem;
  color: black;
`;

const PayModalContentMiddleContainer = styled.div`
  width: 100%;

  background-color: white;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 1rem;
`;

const PayModalMiddleTitle = styled.span`
  background-color: ${(props) => props.backColor || '#afc6ff'};
  padding: 0.7rem 1.5rem;
  border-radius: 12px;

  font-family: Pretendard;
  font-weight: 400;
  font-size: 1rem;
  color: white;
`;

const PayModalMiddleSubtitle = styled.span`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1rem;
  color: ${(props) => (props.color ? props.color : '#3870ff')};
`;

const PayModalButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #378e56;

  border: none;
  border-radius: 12px;
`;

const PayModalA = styled.a`
  text-decoration: none;

  font-family: Pretendard;
  font-weight: 400;
  font-size: 1.2rem;
  color: white;

  cursor: pointer;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
`;

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default PayModal;
