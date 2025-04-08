/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import TeacherProfileCard from '@/component/Agency_Component/TeacherProfileCard';
import useDisableSideMenu from '@/hook/useDisableSideMenu';

type TeacherListDataType = {
  id: number;
  name: string;
  introduce: string;
  profileImg: string;
};

const ProgramTeacherCarousel = ({ mobileFlag }) => {
  const [teacherDataArr] = useState<TeacherListDataType[]>(
    localStorage.getItem('teacherDataArr')
      ? [...JSON.parse(localStorage.getItem('teacherDataArr') || '[]')]
      : []
  );
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0); // 드래그 거리 추적

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useDisableSideMenu(carouselRef); // 사이드 메뉴 예외 처리

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
    <TeacherListSection>
      <MiddleSubtitleSmall>{`강사 리스트`}</MiddleSubtitleSmall>
      <Container ref={carouselRef}>
        <ProgramContainer
          length={teacherDataArr.length}
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
          {teacherDataArr.map((el) => {
            const { name, introduce, profileImg, id } = el;
            return (
              <ProgramContentContainer key={`${name}-${id}`}>
                <TeacherProfileCard
                  name={name}
                  introduce={introduce}
                  imgUrl={profileImg}
                  onClick={() => {
                    if (dragDistance < MIN_DRAG_DISTANCE) {
                      router.push(`/teacher/${id}`);
                    }
                  }}
                />
              </ProgramContentContainer>
            );
          })}
          {!mobileFlag && (
            <Button onClick={scrollRightHandler} dir={'next'}>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Button>
          )}
        </ProgramContainer>
      </Container>
    </TeacherListSection>
  );
};

const TeacherListSection = styled.div`
  width: 80vw;
  padding: 0 4rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  @media (max-width: 768px) {
    width: 100vw;
    padding: 2rem;
    flex-direction: column;
    justify-content: center;
    gap: 0;
  }
`;

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
  }
`;
const MiddleSubtitleSmall = styled.h2`
  font-size: 1.5rem;
  font-family: Pretendard;
  font-weight: 700;

  align-self: flex-start;
`;

type ProgramContainerType = {
  length: number;
};
const ProgramContainer = styled.div<ProgramContainerType>`
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
    margin: 0;
    /* overflow-x: auto; */
  }
`;

const ProgramContentContainer = styled.div`
  min-width: 300px;
  height: 350px;
  padding: 1rem;

  color: white;

  border-radius: 15px;
  border: none;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    min-width: 160px;
    height: 200px;
  }
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

export default ProgramTeacherCarousel;
