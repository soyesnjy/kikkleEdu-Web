/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
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
  return (
    <Event selected={selectedEventId === eventId} backColor={eventBackColor}>
      <b>
        {`${scheduleForm === 'month' ? timeCalulate(eventStart) : ''} [${eventTitle || '제목없음'}] ${eventTeacher || '강사명없음'}`}
      </b>
    </Event>
  );
};

const Event = styled.div`
  height: 100%;
  position: relative; /* 툴팁 기준이 되는 부모 컴포넌트 */

  background-color: ${(props) => props.backColor || '#fff'};
  color: black;
  border: ${(props) => (props.selected ? '2px solid red' : '1px solid #ccc')};
  border-radius: 4px;
  padding: 3px;

  z-index: 1;

  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;

  b {
    width: 160px;

    font-size: 0.7rem;
    font-family: Pretendard;
    font-weight: 600;
    text-align: left;

    text-decoration: ${(props) =>
      props.backColor === '#FFF' ? 'line-through' : 'none'};

    color: ${(props) => (props.backColor === '#FFF' ? 'gray' : 'black')};
  }
`;

export default AdminEvents;
