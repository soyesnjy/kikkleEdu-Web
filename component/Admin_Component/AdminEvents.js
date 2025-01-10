/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminTooltip from './AdminTooltip';

const AdminEvents = ({
  eventId,
  eventTitle,
  eventStart,
  eventProps,
  setEvents,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipVecter, setTooltipVecter] = useState('right');

  // Tooltip 좌우 위치 확정 핸들러
  const handleTooltipVectorConfirm = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX; // 클릭한 화면의 X 좌표
    const midPoint = rect.left + rect.width / 2; // 컴포넌트의 중앙 좌표

    // 클릭 위치에 따라 left/right 설정
    const vector = clickX < midPoint ? 'left' : 'right';
    // toggleTooltip(eventId, vector);
    setIsOpen(!isOpen);
    setTooltipVecter(vector); // 클릭 위치에 따라 방향 설정
  };
  // Tooltip 수정 핸들러
  const handleEventUpdate = (event) => {
    console.log('Tooltip Update!');

    // 수정된 start 정보만 반영

    console.log('updatedEvent: ', event);

    // 서버로 업데이트 요청
    // updateStartOnServer(updatedEvent);

    // 로컬 상태 업데이트 (start만 변경)
    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === Number(event.id) ? { ...evt, ...event } : evt
      )
    );
  };

  // 이벤트 삭제
  const deleteEvent = async (eventId) => {
    console.log('Deleting event with ID:', eventId);

    // 서버 삭제 요청
    // await deleteEventFromServer(eventId);

    // 로컬 상태 업데이트
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== Number(eventId))
    );

    setIsOpen(false); // 툴팁 닫기
  };

  // Delete 삭제 기능
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isOpen && e.key === 'Delete') {
        e.stopPropagation(); // 이벤트 전파 차단
        deleteEvent(eventId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, eventId]);

  return (
    <>
      <StyledEvent
        onClick={(e) => {
          e.stopPropagation(); // 클릭 이벤트 전파 차단
          handleTooltipVectorConfirm(e);
        }}
        selected={isOpen}
      >
        <b>{eventTitle}</b>
      </StyledEvent>
      {isOpen && (
        <AdminTooltip
          vector={tooltipVecter}
          id={eventId}
          title={eventTitle}
          start={eventStart}
          event={eventProps}
          onEdit={handleEventUpdate}
        />
      )}
    </>
  );
};

const StyledEvent = styled.div`
  width: 100%;
  height: 100%;
  position: relative; /* 툴팁 기준이 되는 부모 컴포넌트 */

  border: ${(props) => (props.selected ? '2px solid red' : '1px solid #ccc')};
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 5px;
  font-size: 12px;

  z-index: 1;

  cursor: pointer;

  b {
    font-size: 14px;
  }
`;

export default AdminEvents;
