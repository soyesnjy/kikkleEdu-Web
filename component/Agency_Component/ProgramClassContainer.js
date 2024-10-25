import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const ProgramClassContainer = ({ classDataArr }) => {
  const containerRef = useRef(null);
  const classContainerRef = useRef(null);

  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0); // 드래그 거리 추적

  const MIN_DRAG_DISTANCE = 5; // 드래그와 클릭을 구분할 최소 거리

  // useEffect(() => {
  //   console.log(containerRef?.current?.scrollWidth);
  //   console.log(classContainerRef?.current?.offsetWidth * classDataArr.length);
  // }, [containerRef?.current?.scrollLeft]);

  // 마우스 클릭하여 드래그 시작할 때 실행
  const onDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragDistance(0); // 드래그 거리 초기화
    setStartX(e.pageX);
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    const x = (e.pageX - startX) * 1.5;
    setDragDistance(Math.abs(x)); // 드래그 거리 업데이트
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - x;
    }
  };

  const onDragEnd = () => {
    if (dragDistance < MIN_DRAG_DISTANCE) {
      setIsDragging(false); // 짧은 드래그는 클릭으로 처리
    }
    setIsDragging(false);
  };

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragDistance(0);
    setStartX(touch.pageX);
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const x = (touch.pageX - startX) * 1.5;
    setDragDistance(Math.abs(x));
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - x;
    }
  };

  const onTouchEnd = () => {
    if (dragDistance < MIN_DRAG_DISTANCE) {
      setIsDragging(false); // 짧은 터치는 클릭으로 처리
    }
    setIsDragging(false);
  };

  return (
    <Container>
      <ProgramContainer
        dataLength={classDataArr.length}
        ref={containerRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {classDataArr.map((el) => {
          const { title, imgPath, routePath, idx } = el;
          return (
            <ProgramContentContainer
              ref={classContainerRef}
              key={idx}
              imgPath={imgPath}
              onClick={() => {
                if (dragDistance < MIN_DRAG_DISTANCE) {
                  router.push(routePath); // 드래그가 짧으면 클릭으로 처리
                }
              }}
            >
              <ProgramTitle>{title}</ProgramTitle>
            </ProgramContentContainer>
          );
        })}
      </ProgramContainer>
      {/* <DotContainer>
        {classDataArr.map((el, index) => {
          return (
            <Dot
              key={index}
              active={
                (containerRef?.current?.scrollWidth / 5) * index <=
                containerRef?.current?.scrollLeft
              }
            />
          );
        })}
      </DotContainer> */}
    </Container>
  );
};

export default ProgramClassContainer;

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
  }
`;

const ProgramContainer = styled.div`
  width: 80vw;
  display: flex;
  justify-content: ${(props) =>
    props.dataLength >= 4 ? 'flex-start' : 'center'};
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
    justify-content: flex-start;
  }
`;

const ProgramContentContainer = styled.div`
  min-width: 380px;
  height: 380px;
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
    min-width: 300px;
    height: 280px;
  }
`;

const ProgramTitle = styled.div`
  font-family: Pretendard;
  font-weight: 700;
  font-size: 1.2rem;
  color: white;
  z-index: 1;
`;

const DotContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    width: 90vw;
    justify-content: center;
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#4cb0b2' : '#ddd')};
  margin: 0 5px;
  transition: background-color 0.3s;
  cursor: pointer;
`;
