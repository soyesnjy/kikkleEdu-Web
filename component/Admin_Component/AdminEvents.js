/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styled from 'styled-components';

const timeCalulate = (date) => {
  const dateObj = new Date(date);
  const hour = ('0' + dateObj.getHours()).slice(-2);
  const min = ('0' + dateObj.getMinutes()).slice(-2);

  return `${hour}:${min}`;
};

const AdminEvents = ({
  eventId,
  eventTitle,
  eventStart,
  eventBackColor,
  scheduleForm, // 스케줄폼 (week || month)
  selectedEventId,
}) => {
  return (
    <Event selected={selectedEventId === eventId} backColor={eventBackColor}>
      <b>
        {scheduleForm === 'month'
          ? `${timeCalulate(eventStart)} ${eventTitle}`
          : eventTitle}
      </b>
    </Event>
  );
};

const Event = styled.div`
  height: 100%;
  position: relative; /* 툴팁 기준이 되는 부모 컴포넌트 */

  background-color: ${(props) => props.backColor || '#fff'};
  color: white;
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
  }
`;

export default AdminEvents;
