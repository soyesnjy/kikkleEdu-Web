import React from "react";
import styled, { keyframes } from "styled-components";

// 스크롤 업 애니메이션
const bounceUp = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(30px);
  }
  60% {
    transform: translateY(15px);
  }
`;

const ScrollUpIndicator = () => {
  return (
    <ScrollUpComponent>
      <img
        width="40px"
        height="40px"
        src="/free-icon-mouse-cursor-7664035.png"
      />
    </ScrollUpComponent>
  );
};

// 스크롤 업 인디케이터 스타일
const ScrollUpComponent = styled.div`
  display: flex;
  justify-content: center;

  position: relative;
  top: "2%";

  animation: ${bounceUp} 2s infinite;
  font-size: 1rem;
  color: #fff;
  user-select: none;
`;

export default ScrollUpIndicator;
