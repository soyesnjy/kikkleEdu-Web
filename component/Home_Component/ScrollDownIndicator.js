import styled, { keyframes } from "styled-components";

// 애니메이션 정의
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

// 스크롤 인디케이터 컴포넌트 스타일링
const ScrollDownComponent = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  bottom: 2%;

  animation: ${bounce} 2s infinite;
  font-size: 1rem;
  color: #fff;
`;

// 페이지나 섹션 컴포넌트에 사용
const ScrollDownIndicator = () => {
  return (
    <ScrollDownComponent>
      <img
        width="40px"
        height="40px"
        src="/free-icon-mouse-cursor-7663989.png"
      />
    </ScrollDownComponent>
  );
};

export default ScrollDownIndicator;
