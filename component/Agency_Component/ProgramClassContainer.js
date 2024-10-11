import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { mobile } from '@/store/state';

const ProgramClassContainer = ({ classDataArr }) => {
  const containerRef = useRef(null);
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [mobileFlag, setMobileFlag] = useRecoilState(mobile);

  // 마우스 클릭하여 드래그 시작할 때 실행
  const onDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX); // 마우스 시작 위치 설정
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft); // 현재 스크롤 위치 저장
    }
  };

  // 드래그 중일 때 실행
  const onDragMove = (e) => {
    if (!isDragging) return; // 드래그 상태가 아닐 때는 실행하지 않음
    e.preventDefault(); // 기본 동작 방지 (필수)
    if (containerRef.current) {
      const x = e.pageX - startX; // 마우스 이동 거리 계산
      containerRef.current.scrollLeft = scrollLeft - x; // 스크롤 위치 업데이트
      console.log(containerRef.current.scrollLeft);
    }
  };

  // 드래그 종료 시 실행
  const onDragEnd = () => {
    setIsDragging(false); // 드래그 상태 종료
  };

  // 터치 시작 시 실행
  const onTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setStartX(touch.pageX); // 터치 시작 위치 설정
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft); // 현재 스크롤 위치 저장
    }
  };

  // 터치 중일 때 실행
  const onTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.pageX - startX; // 터치 이동 거리 계산
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - x; // 스크롤 위치 업데이트
    }
  };

  // 터치 종료 시 실행
  const onTouchEnd = () => {
    setIsDragging(false); // 드래그 상태 종료
  };

  return (
    <ProgramContainer
      ref={containerRef}
      onMouseDown={mobileFlag ? onTouchStart : onDragStart} // 마우스 클릭 시 드래그 시작
      onMouseMove={mobileFlag ? onTouchMove : onDragMove} // 마우스 이동 시 스크롤 이동
      onMouseUp={mobileFlag ? onTouchEnd : onDragEnd} // 마우스 버튼을 놓을 때 드래그 종료
      onMouseLeave={mobileFlag ? onTouchEnd : onDragEnd} // 마우스가 영역을 벗어날 때 드래그 종료
    >
      {classDataArr.map((el, index) => {
        const { title, imgPath, routePath } = el;
        return (
          <ProgramContentContainer
            key={index}
            imgPath={imgPath}
            onClick={() => !isDragging && router.push(routePath)} // 드래그 중 클릭 방지
          >
            <ProgramTitle>{title}</ProgramTitle>
          </ProgramContentContainer>
        );
      })}
    </ProgramContainer>
  );
};

export default ProgramClassContainer;

// 스타일 정의
const ProgramContainer = styled.div`
  width: 80vw;
  display: flex;
  overflow-x: hidden;

  cursor: grab;
  gap: 2rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding: 1rem;
  user-select: none;

  &.active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const ProgramContentContainer = styled.div`
  min-width: 280px;
  height: 280px;
  padding: 1rem;

  background: linear-gradient(
      to top,
      rgba(0, 0, 0, 1) 10%,
      rgba(0, 0, 0, 0) 30%
    ),
    url(${(props) => props.imgPath || 'none'});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: normal;
  color: white;

  border-radius: 15px;
  border: ${(props) => (props.selected ? '5px solid #45b26b' : 'none')};

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  gap: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    min-width: 202px;
    height: 202px;
  }
`;

const ProgramTitle = styled.div`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.2rem;
  color: white;
  z-index: 1;
`;
