/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const ProgramClassContainer = ({ classDataArr, mobileFlag }) => {
  const containerRef = useRef(null);

  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0); // 드래그 거리 추적

  const MIN_DRAG_DISTANCE = 5; // 드래그와 클릭을 구분할 최소 거리

  const scrollLeftHandler = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRightHandler = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const dotActiveHandler = (index, length) => {
    const scrollWidth = containerRef.current.scrollWidth;
    const scrollLeft = containerRef.current.scrollLeft;

    return (
      (scrollWidth / length) * index <= scrollLeft * 1.2 &&
      scrollLeft * 1.2 <=
        (index === length - 1
          ? scrollWidth + 150
          : (scrollWidth / length) * (index + 1))
    );
  };

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
        length={classDataArr.length}
        ref={containerRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {!mobileFlag && (
          <Button onClick={scrollLeftHandler} dir={'pre'}>
            <span className="material-symbols-outlined">arrow_back</span>
          </Button>
        )}
        {classDataArr.map((el) => {
          const { title, imgPath, routePath, idx } = el;
          return (
            <ProgramContentContainer
              key={`${title}-${idx}`}
              imgpath={imgPath}
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
        {!mobileFlag && (
          <Button onClick={scrollRightHandler} dir={'next'}>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        )}
      </ProgramContainer>
      {mobileFlag && (
        <DotContainer>
          {classDataArr.map((el, index) => {
            const { routePath, idx } = el;
            return (
              <Dot
                key={`${routePath}-${idx}`}
                active={dotActiveHandler(index, classDataArr.length)}
              />
            );
          })}
        </DotContainer>
      )}
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
  justify-content: ${(props) => (props.length >= 4 ? 'flex-start' : 'center')};
  align-items: center;
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
    /* overflow-x: auto; */
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
    url(${(props) => props.imgpath || 'none'});
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
  display: none;

  @media (max-width: 768px) {
    width: 90vw;
    display: flex;
    justify-content: center;
    align-items: center;
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

const Button = styled.button`
  width: 36px;
  height: 36px;

  background-color: #beb6f2;
  border: none;
  border-radius: 100%;
  color: white;

  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 2.2rem;
  }

  cursor: pointer;
  z-index: 10;

  &:hover {
    opacity: 0.8;
  }

  position: absolute;
  left: ${(props) => (props.dir === 'pre' ? '5%' : '')};
  right: ${(props) => (props.dir === 'pre' ? '' : '5%')};

  transition: 0.3s;

  @media (max-width: 768px) {
    display: none;
  }
`;
