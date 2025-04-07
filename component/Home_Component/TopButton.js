'use client';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

export default function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (!window.scrollY) return;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    <TopButtonContainer>
      <TopButtonWrap>
        {showButton && (
          <Button onClick={handleScroll}>
            <span className="material-symbols-outlined">arrow_upward</span>
          </Button>
        )}
      </TopButtonWrap>
    </TopButtonContainer>
  );
}

const TopButtonContainer = styled.div`
  position: fixed; // 화면에 요소 고정
  bottom: 5%;
  right: 2%;

  z-index: 100;
`;

const TopButtonWrap = styled.div`
  margin-left: auto; // 부모가 flex일 경우, 현재 요소를 우측 정렬
  position: sticky; // 화면에 요소 고정
`;

// 스타일링된 버튼 컴포넌트
const Button = styled.button`
  width: 3rem;
  height: 3rem;
  border: none;
  background-color: #45b26b;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.3s;
`;
