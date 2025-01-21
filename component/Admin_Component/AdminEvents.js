/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const AdminEvents = ({
  eventId,
  eventTitle,
  eventTeacher,
  eventStart,
  eventBackColor,
  scheduleForm, // 스케줄폼 (week || month)
  selectedEventId,
  timeCalulate,
}) => {
  const [fontSize, setFontSize] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        if (width < 45)
          setFontSize('0.55rem'); // 4개 이상
        else if (width < 55)
          setFontSize('0.6rem'); // 3개
        else if (width < 80)
          setFontSize('0.65rem'); // 2개
        else setFontSize('0.7rem'); // 안겹침
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Event
      ref={ref}
      selected={selectedEventId === eventId}
      backColor={eventBackColor}
      fontSize={fontSize}
    >
      <b>
        {`${
          scheduleForm === 'month'
            ? `${timeCalulate(eventStart)} [${eventTitle || '제목없음'}] ${eventTeacher || '강사명없음'}`
            : `[${eventTitle || '제목없음'}]
${eventTeacher || '강사명없음'}`
        }`}
      </b>
    </Event>
  );
};

const Event = styled.div`
  height: 100%;

  background-color: ${(props) => props.backColor || '#fff'};
  color: black;

  padding: ${(props) => (props.selected ? '1px 0' : '3px 0')};
  border: ${(props) => (props.selected ? '2px solid red' : '1px solid #ccc')};
  border-radius: 4px;

  z-index: 1;

  cursor: pointer;

  overflow: hidden;
  /* text-overflow: ellipsis; */

  b {
    font-size: ${(props) => props.fontSize || '0.7rem'};
    font-family: Pretendard;
    font-weight: 600;
    text-align: left;
    /* white-space: pre; */

    text-decoration: ${(props) =>
      props.backColor === '#FFF' ? 'line-through' : 'none'};

    color: ${(props) => (props.backColor === '#FFF' ? 'gray' : 'black')};
  }
`;

export default AdminEvents;
