import React, { useEffect, useState } from 'react';
import { css } from 'styled-components';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// EBTClassSelector 컴포넌트
const EBTClassSelector = ({ isProceeding, EBTArr, ebtType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  // EBT Class 변경 핸들러
  const ebtChangeHandler = (e) => {
    // 검사 도중 변경 불가능
    if (isProceeding) {
      alert('검사 진행 중엔 바꿀 수 없어!');
      return;
    }
    // 로컬 스토리지에 EBTClass값 저장 후 리로드
    localStorage.setItem('EBTClass', e.target.value);
    router.reload();
  };

  return (
    <EBTSelectorContainer>
      <NavBtn onClick={toggleMenu}>EBT</NavBtn>
      <ButtonsContainer>
        {Object.values(EBTArr).map((ebt, index) => (
          <NavBtn
            key={ebt.name}
            value={ebt.type}
            selected={ebtType === ebt.type}
            hidden={!isOpen}
            transitionDelay={`${isOpen ? index * 100 : (3 - index) * 100}ms`}
            onClick={ebtChangeHandler}
          >
            {ebt.name}
          </NavBtn>
        ))}
      </ButtonsContainer>
    </EBTSelectorContainer>
  );
};

const EBTSelectorContainer = styled.div`
  position: absolute;
  top: 1%;
  right: 5%;

  @media (max-width: 768px) {
    width: fit-content;
    left: 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 1;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavBtn = styled.button`
  background-color: ${(props) =>
    props.selected ? 'rgba(0, 42, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: white;
  border: none;
  border-radius: 15px;
  margin: 2px 2px;
  padding: 13px 23px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  transition-delay: ${(props) => props.transitionDelay};

  &:hover {
    background-color: rgba(0, 42, 255, 0.5);
    transition-delay: 0ms;
  }

  ${(props) =>
    props.hidden &&
    css`
      visibility: hidden;
      opacity: 0;
      transform: translateY(-20px);
      transition:
        visibility 0s 0.5s,
        opacity 0.5s ease,
        transform 0.5s ease;
    `}
`;

export default EBTClassSelector;
