/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import styled from 'styled-components';
import AdminTooltip from './AdminTooltip';

const AdminEvents = ({
  eventId,
  eventTitle,
  selectedEventId,
  // eventStart,
  // eventEnd,
  // eventProps,
  // setEvents,
  // setSelectedEventId,
}) => {
  // const [tooltipVecter, setTooltipVecter] = useState('right');

  // // Tooltip 좌우 위치 확정 핸들러
  // const handleTooltipVectorConfirm = (e) => {
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   const clickX = e.clientX; // 클릭한 화면의 X 좌표
  //   const midPoint = rect.left + rect.width / 2; // 컴포넌트의 중앙 좌표

  //   // 클릭 위치에 따라 left/right 설정
  //   const vector = clickX < midPoint ? 'left' : 'right';
  //   setSelectedEventId(eventId); // 툴팁 열기
  //   setTooltipVecter(vector); // 클릭 위치에 따라 방향 설정
  // };
  // // Tooltip 수정 핸들러
  // const handleEventUpdate = (event) => {
  //   console.log('Tooltip Update!');

  //   // 수정된 start 정보만 반영

  //   console.log('updatedEvent: ', event);

  //   // 서버로 업데이트 요청
  //   // updateStartOnServer(updatedEvent);

  //   // 로컬 상태 업데이트 (start만 변경)
  //   setEvents((prevEvents) =>
  //     prevEvents.map((evt) =>
  //       evt.id === Number(event.id) ? { ...evt, ...event } : evt
  //     )
  //   );
  // };

  return (
    <>
      <Event
        // onClick={(e) => {
        //   e.stopPropagation(); // 클릭 이벤트 전파 차단
        //   if (selectedEventId === eventId) {
        //     setSelectedEventId(-1);
        //     return;
        //   }
        //   // handleTooltipVectorConfirm(e);
        // }}
        selected={selectedEventId === eventId}
      >
        <b>{eventTitle}</b>
      </Event>
      {/* {selectedEventId === eventId && (
        <AdminTooltip
          vector={tooltipVecter}
          id={eventId}
          title={eventTitle}
          start={eventStart}
          end={eventEnd}
          event={eventProps}
          onEdit={handleEventUpdate}
        />
      )} */}
    </>
  );
};

const Event = styled.div`
  height: 100%;
  position: relative; /* 툴팁 기준이 되는 부모 컴포넌트 */

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
